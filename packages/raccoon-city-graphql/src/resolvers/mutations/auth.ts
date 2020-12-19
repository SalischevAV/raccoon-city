import {ApolloError} from 'apollo-server';
import * as bcrypt from 'bcryptjs';
import {UserModel} from '../../db/models/user';
import {authAppTokenGenerate, authTokenGenerate} from '../../utils';

export const auth = {
    async createUser(parent, {userData}) {
        try {
            userData.password = bcrypt.hashSync(userData.password);
            return UserModel.create(userData);
        } catch (e) {
            return null;
        }
    },
    async deleteUser(parent, {id}) {
        try {
            await UserModel.findOneAndUpdate({_id: id}, {$set: {isDeleted: true}});
            return true;
        } catch (e) {
            return false;
        }
    },
    async login(parent, {email, password}, {redis}) {
        const user = await UserModel.findOne({email}).populate('role');
        if (!user) {
            throw new ApolloError(`No such user found for email: ${email}`, '404');
        }
        const valid = await bcrypt.compareSync(password, user.password);
        if (!valid) {
            throw new ApolloError('Unauthorized', '401');
        }
        const token = authTokenGenerate(user);
        await redis.set(
            token,
            JSON.stringify({id: user._id, features: user?.role?.features || [], role: user?.role}),
            'ex',
            process.env.REDIS_KEY_TTL
        );
        return {token};
    },
    async authApp(_, {apiKey}, {redis}) {
        const token = authAppTokenGenerate(apiKey);
        await redis.set(token, JSON.stringify({apiKey}));
        return {token};
    },
    async logout(parent, {key}, {redis}) {
        try {
            await redis.del(key);
            return true;
        } catch (e) {
            return false;
        }
    }
};
