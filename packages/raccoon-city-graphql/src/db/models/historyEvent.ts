import * as mongoose from 'mongoose';
import {Document, Schema} from 'mongoose';
import {User} from './user';

export enum HistoryEventType {
    CHANGE_FLAT_STATUS = 'CHANGE_FLAT_STATUS'
}
export interface HistoryEvent extends Document {
    user: User;
    eventType: HistoryEventType;
    payload: string;
    date: string;
    developer: string;
}

const HistoryEvent: Schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        developer: {
            type: Schema.Types.ObjectId,
            ref: 'Developer'
        },
        eventType: {type: Schema.Types.String},
        payload: {type: Schema.Types.String},
        date: {type: Schema.Types.String}
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);

export const HistoryEventModel = mongoose.model<HistoryEvent>('HistoryEvent', HistoryEvent);
