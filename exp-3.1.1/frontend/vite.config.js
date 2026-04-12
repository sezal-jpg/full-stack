import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// loadEnv lets us read .env variables inside the config file itself
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      // proxy is only active during dev (npm run dev)
      // in production the built files talk directly to VITE_API_BASE_URL
      proxy: {
        '/api': env.VITE_API_BASE_URL || 'http://localhost:3001',
      },
    },
  };
});
