import * as mongoose from 'mongoose';
import {Document, Schema} from 'mongoose';
import {UserRole} from './userRole';
import {Developer} from './developer';

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    isDeleted: boolean;
    developer: Developer;
}

const UserSchema: Schema = new Schema(
    {
        name: {type: Schema.Types.String, required: true},
        email: {type: Schema.Types.String, required: true},
        password: {type: Schema.Types.String, required: true},
        role: {
            type: Schema.Types.ObjectId,
            ref: 'UserRole'
        },
        isDeleted: {type: Schema.Types.Boolean},
        developer: {
            type: Schema.Types.ObjectId,
            ref: 'Developer'
        }
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);

export const UserModel = mongoose.model<User>('User', UserSchema);
