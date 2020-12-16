import * as mongoose from 'mongoose';
import {Document, Schema} from 'mongoose';
import {UserRole} from './userRole';

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    isDeleted: boolean;
}

const UserSchema: Schema = new Schema({
    name: {type: Schema.Types.String, required: true},
    email: {type: Schema.Types.String, required: true},
    password: {type: Schema.Types.String, required: true},
    role: {
        type: Schema.Types.ObjectId,
        ref: 'UserRole'
    },
    isDeleted: {type: Schema.Types.Boolean}
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

export const UserModel = mongoose.model<User>('User', UserSchema);
