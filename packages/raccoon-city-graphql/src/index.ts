const express = require('express');
const {ApolloServer, gql, AuthenticationError} = require('apollo-server-express');
import {config} from 'dotenv';
import cors from 'cors';
import Redis from 'ioredis';
import {logger} from './aws/logger';
import {PUBLIC_QUERIES, WHITELISTED_QUERIES} from './constants/whitelistedQuery';
import connect from './db/mongoose.client';
import {prisma} from './generated/prisma-client';
import resolvers from './resolvers';
import {default as typeDefs} from './schemas';
config();

async function tradeTokenForUser(token: string) {
    const userObj = JSON.parse(await redis.get(token));
    return userObj ? userObj : null;
}

export const redis = new Redis({host: process.env.REDIS_HOST});
export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(require('./routes/spreadsheets'));
app.use(require('./routes/amoContacts'));
const server = new ApolloServer({
    typeDefs: gql`
        ${typeDefs}
    `,
    resolvers,
    context: async ({req}) => {
        if (WHITELISTED_QUERIES.includes(req.body.operationName)) {
            return {
                ...req,
                prisma,
                redis
            };
        }

        let authToken = null;
        let currentUser = null;
        try {
            authToken = req.headers.authorization || '';
            currentUser = await tradeTokenForUser(authToken);
        } catch (e) {
            logger.warn(`Unable to authenticate using auth token: ${authToken}`);
        }

        if (!currentUser && req.headers.apitoken) {
            const token = req.headers.apitoken || '';
            // @ts-ignore
            const app = await tradeTokenForUser(token);

            if (app && PUBLIC_QUERIES.includes(req.body.operationName)) {
                return {
                    ...req,
                    prisma,
                    redis
                };
            }
        }

        if (!currentUser) {
            throw new AuthenticationError('you must be logged in');
        }

        return {
            ...req,
            prisma,
            authToken,
            currentUser,
            redis
        };
    },
    formatError: (error) => {
        logger.error(error);
        return error;
    }
});
const path = '/graphql';
server.applyMiddleware({app, path});
const db = process.env.MONGODB_URI;
connect({db});

app.listen({port: process.env.PORT || 4000}, () => {
    logger.info(`🚀  Server ready`);
});

