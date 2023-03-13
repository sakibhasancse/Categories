import { ApolloServer } from 'apollo-server-express';
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
    serverConfig.context = ({ event, context }) => {
        return { event, ...context, redis: RedisClient }
    }
    const server = new ApolloServer(serverConfig)
    await server.start();

    server.applyMiddleware({
        app,
        path: '/',
        cors: true
    });

    // Database  connection
    dbConnection()
    const PORT = process.env.PORT || 4000
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server?.graphqlPath}`)
    })
})();