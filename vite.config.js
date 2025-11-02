/*
 * vite.config.js
 * Vite configuration for the project.
 */

// --- External libraries / build plugins ---
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});
