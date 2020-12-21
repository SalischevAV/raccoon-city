import mongoose from 'mongoose';
import ApartmentComplexModel from '../../db/models/apartmentComplex';
import HouseModel from '../../db/models/house';

export const apartmentComplex = {
    getAllApartmentComplexes: async (_, {developerUuid}) => {
        return ApartmentComplexModel.find({
            isDeleted: false,
            developer: mongoose.Types.ObjectId(developerUuid)
        });
    },
    getApartmentComplex: async (parent, {uuid}) => {
        const apartmentComplexData = await ApartmentComplexModel.findOne({_id: uuid, isDeleted: false})
            .lean()
            .exec();
        return {
            ...apartmentComplexData,
            houses: async () => {
                if (apartmentComplexData) {
                    const data = await ApartmentComplexModel.findOne(apartmentComplexData).populate('houses');
                    if (data) {
                        return data.houses || [];
                    } else {
                        return [];
                    }
                } else {
                    return [];
                }
            }
        };
    },
    getApartmentComplexName: async (_, {uuid}) => {
        const {apartmentComplex} = await HouseModel.findById(uuid);

        const {name} = await ApartmentComplexModel.findById(apartmentComplex);

        return {name};
    }
};
