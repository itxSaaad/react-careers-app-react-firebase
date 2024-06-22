import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

const env = loadEnv('development', process.cwd());

const API_URL = `${env.VITE_API_URL ?? 'http://localhost:3000'}`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: API_URL || `http://localhost:5000`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
