import 'dotenv/config';
import app from './src/app.js';
import { connectRedis } from './src/config/redis.js';

const PORT = process.env.PORT ||8080;

try {
  await connectRedis();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
} catch (err) {
  console.error('❌ Startup error:', err.message);
  process.exit(1);
}

export default app;