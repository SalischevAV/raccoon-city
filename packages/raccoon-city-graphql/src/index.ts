import {ApolloServer, gql} from 'apollo-server';
import connect from './db/mongoose.client';
import {initFirebase} from './firebase';
import {prisma} from './generated/prisma-client';
import resolvers from './resolvers';
import {default as typeDefs} from './schemas';

try {
    const Firebase: any = initFirebase();
    const server = new ApolloServer({
        typeDefs: gql`
            ${typeDefs}
        `,
        resolvers,
        context: (request) => ({
            ...request,
            prisma,
            Firebase
        })
    });
    const db = process.env.MONGODB_URI;
    connect({db});
    server.listen({port: process.env.PORT || 4000}).then(({url}) => {
        console.log(`🚀  Server ready at ${url}`);
    });
} catch (e) {
    console.log(e);
}
