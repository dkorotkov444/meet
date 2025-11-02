/*
 * src/main.jsx
 * Application entry: mounts the React app to the DOM
 */

// --- External libraries ---
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// --- Styles ---
import './index.css';

// --- Local application ---
import App from './App.jsx';

// Mount the root React component into the DOM
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);

