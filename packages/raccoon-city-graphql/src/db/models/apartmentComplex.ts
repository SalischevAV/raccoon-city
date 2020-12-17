import * as mongoose from 'mongoose';
import {Document, Schema} from 'mongoose';
import {KeyDisplayName} from '../../types/shared';
import {Developer} from './developer';
import {House} from './house';
import {ApartmentComplexImages, imagesSchema, KeyDisplayNameSchema} from './shared';

export interface ApartmentComplex extends Document {
    type: KeyDisplayName;
    name: string;
    city: KeyDisplayName;
    address: string;
    district: KeyDisplayName;
    undergroundStation: KeyDisplayName;
    class: KeyDisplayName;
    levels: number;
    sections: number;
    beginDate: string;
    endDate: string;
    houses: House[];
    images: ApartmentComplexImages;
    developer: Developer;
}

const ApartmentComplexSchema: Schema = new Schema({
    type: {type: KeyDisplayNameSchema, required: true},
    name: {type: Schema.Types.String, required: true},
    address: {type: Schema.Types.String},
    city: {type: KeyDisplayNameSchema, required: true},
    district: {type: KeyDisplayNameSchema, required: true},
    undergroundStation:{type: KeyDisplayNameSchema},
    class: {type: KeyDisplayNameSchema, required: true},
    levels: {type: Schema.Types.Number, required: true},
    sections: {type: Schema.Types.Number, required: true},
    beginDate: {type: Schema.Types.String, required: true},
    endDate: {type: Schema.Types.String},
    isDeleted: {type: Schema.Types.Boolean, default: false},
    houses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'House',
            default: () => {
                return [];
            }
        }
    ],
    developer: {
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    },
    images: {
        type: imagesSchema,
        default: () => {
            return {};
        }
    }
});

export const ApartmentComplexModel = mongoose.model<ApartmentComplex>('ApartmentComplex', ApartmentComplexSchema);

export default ApartmentComplexModel;
