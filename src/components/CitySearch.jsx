/*
 * src/components/CitySearch.jsx
 * City search input / selector (UI placeholder).
 */

// --- External libraries ---
import React from 'react';

// Simple presentational placeholder for city search UI
const CitySearch = () => {
    return (
        <div id="city-search">
            <input type="text" className="city" placeholder="Search for a city" />
        </div>
    );
};

export default CitySearch;