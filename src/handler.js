import {
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core';

import typeDefs from '../src/graphql/typeDefs';
import resolvers from '../src/graphql/resolvers'

const serverConfig = {
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ],
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
    tracing: true,
    path: '/',
    // context: ({ event, context }) => {
    //     return { event, ...context }
    // },
    formatResponse: (response) => response,
    formatError: (error) => {
        return {
            message: error.message || 'INTERNAL SERVER ERROR',
            statusCode: error?.extensions?.exception?.statusCode || 500
        }
    }
}


export default serverConfig;