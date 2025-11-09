/*
 * vite.config.js
 * Vite configuration for the project.
 */

// --- External libraries / build plugins ---
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
    base: './',
    plugins: [react(), VitePWA({
        manifest: {
        short_name: "Meet",
        name: "Create React App Sample",
        icons: [
            {
            src: "favicon.ico",
            sizes: "48x48",
            type: "image/x-icon",
            purpose: "maskable"
            },
            {
            src: "meet-app-144.png",
            type: "image/png",
            sizes: "144x144",
            purpose: "any"
            },
            {
            src: "meet-app-192.png",
            type: "image/png",
            sizes: "192x192",
            purpose: "maskable"
            },
            {
            src: "meet-app-512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "maskable"
            }
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff"
        },
    srcDir: 'src', // Update if your service-worker.js is elsewhere
    filename: 'service-worker.js', // Ensure it's accessible in production
    // Disable automatic injection of the generated register script (registerSW.js)
    // so we can register the service worker manually and handle errors.
    injectRegister: false,
    registerType: 'autoUpdate',
        workbox: {
            runtimeCaching: [
                {
                urlPattern: /\/.*\.png$/, // Example pattern for caching png images
                handler: 'StaleWhileRevalidate',
                options: {
                    cacheName: 'images',
                    expiration: {
                    maxEntries: 50,
                    },
                },
                },
            ],
        },
    })],
});
