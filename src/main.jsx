/*
 * src/main.jsx
 * Application entry: mounts the React app to the DOM
 */

// --- External libraries ---
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as atatus from 'atatus-spa';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// --- Styles ---
import './index.css';

// --- Local application ---
import App from './App.jsx';

// Initialize Atatus error monitoring
atatus.config('9646af923dda48519cbf4076df8e8323').install();

// Mount the root React component into the DOM
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);

// --- Conflicting with Vite: service worker registration ---
// serviceWorkerRegistration.register();

// Register the PWA service worker produced by vite-plugin-pwa manually and
// with robust error handling. We disabled automatic injection in
// vite.config.js (injectRegister: false) so the project does not load a
// generated /registerSW.js that could result in unhandled promise
// rejections being reported to Atatus.
import('virtual:pwa-register')
    .then(({ registerSW }) => {
        try {
            // immediate: true attempts to register right away; adjust as needed
            registerSW({ immediate: true });
        } catch (err) {
            // Catch sync errors (unlikely) and log them so they don't become
            // unhandled promise rejections.
            console.error('Service worker registration failed (sync):', err);
        }
    })
    .catch((err) => {
        // Catch dynamic import failures or other async errors.
        console.error('Service worker registration failed (dynamic import):', err);
    });
