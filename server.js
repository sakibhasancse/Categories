import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import bodyParser from 'body-parser'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import dotenv from 'dotenv'
import express from 'express';

import dbConnection from './src/config/dbConnection';
import serverConfig from './src/handler';
import redisClient from './src/config/redisConnection';
dotenv.config();

(async function startServer() {
    const app = express();
    const httpServer = createServer(app);

    // Redis client connection
    const RedisClient = await redisClient()

    app.use(cookieParser());
    app.use(cors({
        origin: "*",
        credentials: true
    }))

    // Apollo server connection
    const server = new ApolloServer(serverConfig)
    await server.start();

    app.use(
        cors(),
        bodyParser.json(),
        expressMiddleware(server, {
            context: ({ event, context }) => {
                return { event, ...context, redis: RedisClient }
            }
        }),
    );

    // Database connection
    dbConnection()

    const PORT = process.env.PORT || 4000
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}`)
})();