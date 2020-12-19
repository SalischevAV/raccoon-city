import {UserModel} from '../../db/models/user';
import {AuthError} from '../../utils';

export const user = {
    async getUsers() {
        const res = UserModel.find({})
            .populate({
                path: 'role'
            })
            .exec();

        return res;
    },
    async getUserInfo(parent, args, context) {
        try {
            return await UserModel.findById(context.currentUser.id)
                .populate({
                    path: 'role'
                })
                .exec();
        } catch (e) {
            throw new AuthError();
        }
    }
};
