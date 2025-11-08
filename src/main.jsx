/*
 * src/main.jsx
 * Application entry: mounts the React app to the DOM
 */

// --- External libraries ---
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as atatus from 'atatus-spa';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

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
serviceWorkerRegistration.register();
