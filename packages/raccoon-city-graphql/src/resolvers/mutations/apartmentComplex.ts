import mongoose from 'mongoose';
import {S3ImageUploader} from '../../aws/s3ImageUploader';
import {apartmentComplexTypes} from '../../constants/apartmentComplexTypes';
import {cities} from '../../constants/cities';
import {complexClasses} from '../../constants/complexClasses';
import ApartmentComplexModel, {ApartmentComplex} from '../../db/models/apartmentComplex';
import {FileHistoryDbService} from '../../db/services/fileHistory.service';
import {FlatService} from '../../db/services/flat.service';
import {ApartmentComplexImageServiceFactory} from '../../services/image/apartmentComplexImageServiceFactory';
import {ApartmentComplexSpreadsheetService} from '../../services/spreadsheets/apartmentComplexSpreadsheetService';
import {ApartmentComplexInputArgs, AssignFlatInputArgs} from '../../types/apartment_complex';
import {Context} from '../../utils';
import {UploadedFile} from '../../services/image/imageService';
import {FileService} from '../../services/image/fileService';

export const apartmentComplex = {
    async createApartmentComplex(parent, args, ctx: Context): Promise<ApartmentComplex> {
        const apartmentComplexArg: ApartmentComplexInputArgs = args.apartmentComplex;
        const result = {...apartmentComplexArg} as any;

        const {key, displayName, districts, undergroundStations} = cities.find(
            (type) => type.key === apartmentComplexArg.city
        );
        const district = districts.find((type) => String(type.key) === apartmentComplexArg.district);
        const undergroundStation = undergroundStations.find(
            (type) => String(type.key) === apartmentComplexArg.undergroundStation
        );

        result.city = {key, displayName};
        result.district = district;
        result.undergroundStation = undergroundStation;
        result.developer = mongoose.Types.ObjectId(args.developerUuid);
        result.type = apartmentComplexTypes.find((type) => type.key === apartmentComplexArg.type);
        result.class = complexClasses.find((type) => type.key === apartmentComplexArg.class);
        return await ApartmentComplexModel.create(result);
    },
    async updateApartmentComplex(parent, args, ctx: Context): Promise<ApartmentComplex> {
        const apartmentComplexArg: ApartmentComplexInputArgs = args.apartmentComplex;
        const uuid = args.uuid;
        const result = {...apartmentComplexArg} as any;

        const {key, displayName, districts, undergroundStations} = cities.find(
            (type) => type.key === apartmentComplexArg.city
        );
        const district = districts.find((type) => String(type.key) === apartmentComplexArg.district);
        const undergroundStation = undergroundStations.find(
            (type) => String(type.key) === apartmentComplexArg.undergroundStation
        );

        result.city = {key, displayName};
        result.district = district;
        result.undergroundStation = undergroundStation;
        result.type = apartmentComplexTypes.find((type) => type.key === apartmentComplexArg.type);
        result.class = complexClasses.find((type) => type.key === apartmentComplexArg.class);
        return await ApartmentComplexModel.findOneAndUpdate(
            {
                _id: uuid,
                isDeleted: false
            },
            {
                $set: {
                    ...result
                }
            }
        ).exec();
    },
    async deleteApartmentComplex(parent, {uuid}, ctx: Context) {
        await ApartmentComplexModel.findOneAndUpdate(
            {_id: uuid, isDeleted: false},
            {
                $set: {
                    isDeleted: true
                }
            }
        ).exec();
        return true;
    },
    async addImage(parent, args, ctx: Context) {
        return new ApartmentComplexImageServiceFactory(args.mode)
            .getImageService(args.uuid, args.name)
            .addImage(await args.file);
    },
    async deleteImage(parent, args, ctx: Context) {
        await new ApartmentComplexImageServiceFactory(args.mode).getImageService(args.uuid).removeImage(args.imageId);
        return 'Success';
    },
    async uploadApartmentComplexFile(parent, args, ctx: Context) {
        const file: UploadedFile = await args.file;
        await new FileService(
            new S3ImageUploader('spreadsheet'),
            new FileHistoryDbService(args.uuid, file.filename)
        ).addImage(file);
        return new ApartmentComplexSpreadsheetService(file).parse();
    },
    async assignFlats(parent, args, ctx: Context) {
        const data: AssignFlatInputArgs[] = args.data;
        await Promise.all(
            data.map(async (house) => {
                return await new FlatService(house.houseId).assignFlatsToHouse(house.flats);
            })
        );
        return 'Success';
    }
};
