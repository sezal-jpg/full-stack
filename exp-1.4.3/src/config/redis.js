import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    keepAlive: 10000,
    reconnectStrategy: (retries) => Math.min(retries * 50, 2000),
  }
});

redisClient.on('error', (err) => {
  if (err.code === 'ECONNRESET') {
    console.warn('⚠️ Redis disconnected, reconnecting...');
  } else {
    console.error('Redis Error:', err);
  }
});

const connectRedis = async () => {
  await redisClient.connect();
  console.log('✅ Redis Connected');
};

export { redisClient, connectRedis };