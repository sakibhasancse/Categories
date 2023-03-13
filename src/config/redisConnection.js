import { createClient } from 'redis';

const redisClient = async () => {
  try {
    const RedisClient = createClient({
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: process.env.REDIS_PORT || 6379
    });
    RedisClient.on('error', err => console.log('Redis Client connection', err));
    await RedisClient.connect();
    return RedisClient
  } catch (error) {
    console.log('Error happened in redis connection', error.message)
  }
}

export default redisClient
