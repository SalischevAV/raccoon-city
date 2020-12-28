import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';
import {imagesSchema, KeyDisplayNameSchema, simpleImageSchema, SinglePreviewImageSchema} from './shared';

const PublishedHouseLayoutSchema = new Schema({
    name: Schema.Types.String,
    image: SinglePreviewImageSchema,
    isDeleted: {type: Schema.Types.Boolean, default: false},
    images: {
        type: simpleImageSchema,
        default: () => {
            return {};
        }
    },
    flats: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Flat',
            default: () => {
                return [];
            }
        }
    ]
});
const PublishedFlatSchema = new Schema({
    flatNumber: {type: Schema.Types.String},
    price: {type: Schema.Types.Number},
    sale: {type: Schema.Types.Number},
    area: {type: Schema.Types.Number},
    status: {type: Schema.Types.String},
    roomAmount: {type: Schema.Types.String},
    squarePrice: {type: Schema.Types.Number},
    squarePriceSale: {type: Schema.Types.Number},
    isDeleted: {type: Schema.Types.Boolean, default: false},
    levelAmount: {type: Schema.Types.Number, default: 1},
    level: {
        type: Schema.Types.ObjectId,
        ref: 'Level'
    },
    section: {
        type: Schema.Types.ObjectId,
        ref: 'Section'
    },
    house: {
        type: Schema.Types.ObjectId,
        ref: 'House'
    }
});
const ViewBoxSchema = new Schema({
    width: {type: Schema.Types.Number},
    height: {type: Schema.Types.Number}
});

const PublishedLevelFlatLayoutSchema = new Schema({
    path: [
        {
            type: Schema.Types.String
        }
    ],
    viewBox: {type: ViewBoxSchema},
    levelLayout: {
        type: Schema.Types.ObjectId,
        ref: 'LevelLayout'
    },
    flatLayout: {
        type: Schema.Types.ObjectId,
        ref: 'HouseLayout'
    },
    isDeleted: {type: Schema.Types.Boolean, default: false}
});

const PublishedLevelLayoutSchema = new Schema({
    name: Schema.Types.String,
    image: SinglePreviewImageSchema,
    house: {
        type: Schema.Types.ObjectId,
        ref: 'House'
    },
    isDeleted: {type: Schema.Types.Boolean, default: false},
    levels: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Level',
            default: () => {
                return [];
            }
        }
    ],
    flatLayouts: [
        {
            type: PublishedLevelFlatLayoutSchema
        }
    ]
});

const PublishedLevelSchema = new Schema({
    levelNumber: {type: Schema.Types.Number},
    isDeleted: {type: Schema.Types.Boolean, default: false},
    flats: [{type: PublishedFlatSchema}],
    section: {
        type: Schema.Types.ObjectId,
        ref: 'Section'
    }
});

const PublishedSectionSchema = new Schema({
    sectionName: {type: Schema.Types.String},
    isDeleted: {type: Schema.Types.Boolean, default: false},
    levels: [
        {
            type: PublishedLevelSchema
        }
    ],
    house: {
        type: Schema.Types.ObjectId,
        ref: 'House'
    }
});

const PublishedHouseSchema: Schema = new Schema(
    {
        name: {type: Schema.Types.String, required: true},
        class: {type: KeyDisplayNameSchema},
        levels: {type: Schema.Types.Number},
        price: {type: Schema.Types.Number, required: true},
        beginDate: {type: Schema.Types.String},
        squarePrice: {type: Schema.Types.Number},
        parking: {type: Schema.Types.Boolean},
        order: {type: Schema.Types.Number, default: 0},
        endDate: {type: Schema.Types.String},
        visibleInCarousel: {type: Schema.Types.Boolean, default: true},
        isDeleted: {type: Schema.Types.Boolean, default: false},
        images: {
            type: imagesSchema,
            default: () => {
                return {};
            }
        },
        sections: [
            {
                type: PublishedSectionSchema
            }
        ],
        layouts: [
            {
                type: PublishedHouseLayoutSchema
            }
        ],
        levelLayouts: [{type: PublishedLevelLayoutSchema}],
        house: {
            type: Schema.Types.ObjectId,
            ref: 'House'
        },
        apartmentComplex: {
            type: Schema.Types.ObjectId,
            ref: 'ApartmentComplex'
        },
        publishedDate: {type: Schema.Types.String}
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);

export const PublishedHouseModel = mongoose.model<any>('PublishedHouse', PublishedHouseSchema);
