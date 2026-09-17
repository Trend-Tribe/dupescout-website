import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Mandatory for GitHub Pages subpath asset resolution
  plugins: [react()],
});
