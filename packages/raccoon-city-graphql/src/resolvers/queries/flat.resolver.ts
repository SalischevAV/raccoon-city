import mongoose from 'mongoose';
import groupBy from 'ramda/src/groupBy';
import {Flat, FlatModel} from '../../db/models/flat';
import {LevelFlatLayout, LevelFlatLayoutModel} from '../../db/models/levelFlatLayout';
import {SinglePreviewImage} from '../../types/shared';
import {Section} from '../../db/models/section';
import {Level} from '../../db/models/level';
import {PublishedHouseModel} from '../../db/models/publishedHouse';
import ApartmentComplexModel from '../../db/models/apartmentComplex';
import {countFlatsByStatus} from '../../utils/flatsCounter';
import {flatStatusesWithoutPrice} from '../../constants/flatStatuses';

const groupByLevelLayout = groupBy((levelFlatLayout: LevelFlatLayout) => {
    return levelFlatLayout.levelLayout.id.toString();
});

export interface FlatInfo extends Flat {
    levelLayouts: FlatLevelLayouts[];
}

export interface FlatLevelLayouts {
    id: string;
    image: SinglePreviewImage;
    viewBox: {
        width: number;
        height: number;
    };
    paths: string[];
}

export function shouldHidePriceInFlat(status: string): boolean {
    return flatStatusesWithoutPrice.includes(status);
}

function getUpdatedFlat(flat: Flat, newFlat: any) {
    const updatedFlat = {
        id: flat.id,
        ...flat.toObject(),
        ...newFlat
    };

    return !shouldHidePriceInFlat(flat.status)
        ? updatedFlat
        : {
              ...updatedFlat,
              price: null,
              squarePrice: null,
              squarePriceSale: null
          };
}

export const flatQuery = {
    getFlatSidebarInfo: async (parent, {flatId}) => {
        const flat = await FlatModel.findOne({_id: flatId, isDeleted: false})
            .populate({
                path: 'layout',
                match: {isDeleted: false}
            })
            .populate({
                path: 'section',
                match: {isDeleted: false}
            })
            .populate({
                path: 'level',
                match: {isDeleted: false}
            })
            .populate({
                path: 'house',
                match: {isDeleted: false},
                populate: {
                    path: 'apartmentComplex',
                    match: {isDeleted: false},
                    populate: {
                        path: 'developer',
                        match: {isDeleted: false}
                    }
                }
            })
            .exec();

        if (!flat) {
            return null;
        }
        const flatObj = flat.toObject();
        flatObj.section = flatObj.section.sectionName as any;
        flatObj.level = flatObj.level.levelNumber as any;
        flatObj.apartmentComplex = flat.house.apartmentComplex;
        flatObj.developer = flatObj.apartmentComplex.developer;
        const layout = flat.layout;

        if (!layout) {
            return flatObj;
        }

        const levelFlatLayouts = await LevelFlatLayoutModel.find({
            isDeleted: false,
            flatLayout: mongoose.Types.ObjectId(layout.id)
        })
            .populate({
                path: 'levelLayout',
                match: {isDeleted: false}
            })
            .exec();

        if (levelFlatLayouts && levelFlatLayouts.length > 0) {
            const newFlat: FlatInfo = flatObj as FlatInfo;
            const result = groupByLevelLayout(levelFlatLayouts);

            newFlat.levelLayouts = Object.keys(result).map((key) => {
                const item = result[key];
                const levelLayout = item[0].levelLayout;
                const viewBox = item[0].viewBox;
                const paths = item.map((flatLayout) => {
                    return String(flatLayout.path);
                });
                return {
                    id: levelLayout.id,
                    image: levelLayout.image,
                    viewBox,
                    paths
                };
            });
            return newFlat;
        }

        return flatObj;
    },
    getPublicFlatSidebarInfo: async (parent, {flatId}) => {
        const [house] = await PublishedHouseModel.aggregate([
            {
                $unwind: '$sections'
            },
            {
                $unwind: '$sections.levels'
            },
            {
                $unwind: '$sections.levels.flats'
            },
            {$match: {'sections.levels.flats._id': mongoose.Types.ObjectId(flatId)}}
        ]).exec();

        if (!house) {
            return null;
        }

        const apartmentComplex = await ApartmentComplexModel.findOne({
            _id: house.apartmentComplex
        })
            .populate({
                path: 'developer'
            })
            .exec();

        let flat = house.sections.levels.flats;

        const {squarePrice} = flat as {squarePrice: string};
        if (isNaN(Number(squarePrice)) && squarePrice) {
            flat.squarePrice = squarePrice.replace(',', '.');
        }
        if (!squarePrice) {
            flat.squarePrice = '0';
        }

        flat.id = flatId;
        flat.section = house.sections.sectionName as any;
        flat.level = house.sections.levels.levelNumber as any;
        flat.apartmentComplex = apartmentComplex;
        flat.developer = apartmentComplex.developer;
        flat.house = house;
        flat.house.id = house.house;

        flat.layout = house.layouts.find((layout) => {
            return !!layout.flats.find((item) => {
                return item.equals(flat?._id);
            });
        });
        flat.levelLayouts = house.levelLayouts
            .filter((levelLayout) => {
                if (!flat.layout) {
                    return false;
                }

                return levelLayout.flatLayouts.some((flatLevelLayout) => {
                    return flatLevelLayout.flatLayout?._id.equals(flat.layout?._id);
                });
            })
            .map((levelLayout) => {
                const flatLayout: any[] = levelLayout.flatLayouts.filter((flatLevelLayout) => {
                    return flatLevelLayout.flatLayout?._id.equals(flat.layout?._id);
                });

                return {
                    id: String(levelLayout._id),
                    image: levelLayout.image,
                    paths: flatLayout.reduce((acc: any[], layout) => {
                        return acc.concat(layout.path);
                    }, []),
                    viewBox: flatLayout[0].viewBox
                };
            });

        if (shouldHidePriceInFlat(flat.status)) {
            flat.squarePrice = '0';
            flat.squarePriceSale = '0';
            flat.price = '0';
        }

        return flat;
    },
    getPublicGroupedFlatsBySection: async (parent, {uuid}) => {
        const houses = await PublishedHouseModel.find({
            house: {
                $in: uuid.map((item) => mongoose.Types.ObjectId(item))
            }
        }).exec();

        const [result] = await PublishedHouseModel.aggregate([
            {$match: {house: {$in: uuid.map((item) => mongoose.Types.ObjectId(item))}, isDeleted: false}},
            {
                $unwind: '$sections'
            },
            {
                $unwind: '$sections.levels'
            },
            {
                $unwind: '$sections.levels.flats'
            },
            {
                $group: {
                    _id: null,
                    maxPrice: {$max: '$sections.levels.flats.squarePrice'},
                    minPrice: {$min: '$sections.levels.flats.squarePrice'},
                    maxArea: {$max: '$sections.levels.flats.area'},
                    minArea: {$min: '$sections.levels.flats.area'}
                }
            }
        ]).exec();
        let maxPrice = 0;
        let minPrice = 0;
        let maxArea = 0;
        let minArea = 0;

        if (!!result) {
            maxPrice = Number(String(result.maxPrice).replace(',', '.'));
            minPrice = Number(String(result.minPrice).replace(',', '.'));
            maxArea = result.maxArea;
            minArea = result.minArea;
        }

        const res = {
            maxPrice,
            minPrice,
            maxArea,
            minArea,
            houseFlats: []
        };

        houses.forEach((data) => {
            if (data.sections) {
                res.houseFlats.push({
                    id: data.id,
                    name: data.name,
                    groupedFlats: data.sections.map((section: Section) => {
                        return {
                            id: section.id,
                            section: section.sectionName,
                            levels: section.levels
                                .sort((level1, level2) => {
                                    return level2.levelNumber - level1.levelNumber;
                                })
                                .map((level: Level) => {
                                    const newFlat = {
                                        level: level.levelNumber,
                                        section: section.sectionName
                                    };
                                    const flats = level.flats.map((flat) => {
                                        return getUpdatedFlat(flat, newFlat);
                                    });
                                    return {
                                        id: level.id,
                                        level: level.levelNumber,
                                        flats
                                    };
                                })
                        };
                    })
                });
            }
        });

        return res;
    },
    getPublicFlatsList: async (parent, {uuid}) => {
        const houses = await PublishedHouseModel.find({
            house: {
                $in: uuid.map((item) => mongoose.Types.ObjectId(item))
            }
        }).exec();

        const flatsList = [];

        houses.forEach((data) => {
            if (data.sections) {
                data.sections.forEach((section: Section) => {
                    section.levels.map((level: Level) => {
                        const newFlat = {
                            level: level.levelNumber,
                            section: section.sectionName
                        };

                        const flats = level.flats.map((flat) => {
                            return getUpdatedFlat(flat, newFlat);
                        });

                        flats.forEach((flat) => {
                            flatsList.push(flat);
                        });
                    });
                });
            }
        });

        return flatsList;
    },
    countPublicFlats: async (parent, {uuid}) => {
        const house = await PublishedHouseModel.find({
            house: uuid
        }).exec();

        const flatsStatuses = [];

        house.forEach((data) => {
            if (data.sections) {
                data.sections.forEach((section: Section) => {
                    section.levels.map(({flats}: Level) => {
                        flats.forEach(({status}) => flatsStatuses.push({status}));
                    });
                });
            }
        });

        return countFlatsByStatus(flatsStatuses);
    }
};
