import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Lets you write `import { Button } from '@/components/ui/button'`
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    // Lets you open the app on your phone (same Wi-Fi) using the "Network" address
    // printed in the terminal. Also needed for GitHub Codespaces.
    host: true,
    open: true,
  },
});
