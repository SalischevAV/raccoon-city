import {flatStatuses} from 'src/constants/flatStatuses';
import {Flat, FlatModel} from '../../db/models/flat';
import {LevelModel} from '../../db/models/level';
import {SectionModel} from '../../db/models/section';
import {IdFlat} from '../../types/flat/flat';
import {Context} from '../../utils';

async function handleSection(newFlat: IdFlat, previousFlat: Flat | null, houseId: string): Promise<Flat> {
    const prevFlat = previousFlat ? previousFlat.toObject() : {};
    let section = await SectionModel.findOne({house: houseId, sectionName: newFlat.section, isDeleted: false});
    let level;
    if (!section) {
        section = await SectionModel.create({
            house: houseId,
            sectionName: newFlat.section
        });

        level = await LevelModel.create({
            section: section.id,
            levelNumber: newFlat.level
        });
    } else {
        level = await LevelModel.findOne({
            section: section.id,
            isDeleted: false,
            levelNumber: newFlat.level
        });

        if (!level) {
            level = await handleLevelAbscense(section.id, newFlat.level);
        }
    }

    return {
        ...prevFlat,
        ...newFlat,
        section: section.id,
        level: level.id,
        house: houseId
    };
}

async function handleLevelMismatch(newFlat: IdFlat, previousFlat: Flat): Promise<Flat> {
    let level = await LevelModel.findOne({
        section: previousFlat.section.id,
        isDeleted: false,
        levelNumber: newFlat.level
    });

    if (!level) {
        level = await handleLevelAbscense(previousFlat.section.id, newFlat.level);
    }

    return {
        ...previousFlat.toObject(),
        ...newFlat,
        section: previousFlat.section,
        level,
        house: previousFlat.house
    };
}

async function handleLevelAbscense(section: string, levelNumber: number) {
    let level = await LevelModel.findOne({
        section,
        isDeleted: false,
        levelNumber
    });

    if (!level) {
        const [maxLevelNumber] = await LevelModel.find({section, isDeleted: false})
            .sort({levelNumber: -1})
            .limit(1)
            .exec();
        if (maxLevelNumber.levelNumber < levelNumber) {
            const emptyLevels = [];
            let i = maxLevelNumber.levelNumber + 1;
            while (i <= levelNumber) {
                emptyLevels.push({
                    section,
                    levelNumber: i
                });
                i++;
            }
            const results = await LevelModel.insertMany(emptyLevels);
            return results[results.length - 1];
        } else {
            level = await LevelModel.create({
                section,
                levelNumber
            });
        }
    }

    return level;
}

export const flatMutation = {
    async updateFlat(parent, args, ctx: Context) {
        const flat: IdFlat = args.flat;

        const previousFlat = await FlatModel.findOne({_id: flat.id, isDeleted: false})
            .populate('section')
            .populate('level')
            .exec();

        if (flat.section !== previousFlat.section.sectionName) {
            const updatedFlat = await handleSection(flat, previousFlat, flat.house);
            return FlatModel.findOneAndUpdate({_id: previousFlat.id, isDeleted: false}, updatedFlat);
        }

        if (flat.level !== previousFlat.level.levelNumber) {
            const updatedFlat = await handleLevelMismatch(flat, previousFlat);
            return FlatModel.findOneAndUpdate({_id: previousFlat.id, isDeleted: false}, updatedFlat);
        }

        const result = {
            ...previousFlat.toObject(),
            ...flat,
            squarePriceSale: flat.squarePriceSale,
            section: previousFlat.section.id,
            level: previousFlat.level.id,
            house: previousFlat.house
        };
        return FlatModel.findOneAndUpdate({_id: previousFlat.id, isDeleted: false}, result);
    },
    updateFlatStatus: async (parent, {flatId, flatStatus}) => {
        await FlatModel.findOneAndUpdate({
            _id: flatId,
            isDeleted: false
        }, {status: String(flatStatus)});

        return true;
    },
    async createFlat(parent, args, ctx: Context) {
        let flat = args.flat;

        if (!flatStatuses.includes(flat.status)) {
            flat = {
                ...flat,
                status: "UNAVAILABLE"
            };
        }

        const newFlat = await handleSection(flat, null, args.houseGuid);
        return FlatModel.create(newFlat);
    },
    async deleteFlat(parent, {uuid}, ctx: Context) {
        await FlatModel.findOneAndUpdate(
            {_id: uuid},
            {
                $set: {
                    isDeleted: true
                }
            }
        ).exec();
        return true;
    }
};
