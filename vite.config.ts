import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // TODO: fix proxy for images
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [tailwindcss(), react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // server: {
    //   proxy: {
    //     '/storage': {
    //       target: env.VITE_STORAGE_API_URL,
    //       changeOrigin: true,
    //       rewrite: (path) => path.replace(/^\/storage/, ''),
    //     },
    //   },
    // },
  };
});
