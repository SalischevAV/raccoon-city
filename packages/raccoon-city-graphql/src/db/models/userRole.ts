import * as mongoose from 'mongoose';
import {Document, Schema} from 'mongoose';

export interface UserRole extends Document {
    key: string;
    displayName: string;
    features: string[];
}

const UserRoleSchema = new Schema(
    {
        key: {type: Schema.Types.String, required: true},
        displayName: {type: Schema.Types.String, required: true},
        features: [
            {
                type: Schema.Types.String,
                required: true,
                default: () => {
                    return [];
                }
            }
        ]
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
);

UserRoleSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'role'
});

export const UserRoleModel = mongoose.model<UserRole>('UserRole', UserRoleSchema);
