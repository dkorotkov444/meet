/*
 * src/components/CitySearch.jsx
 * City search input / selector (UI placeholder).
 */

// --- External libraries ---
import React, {useState} from 'react';

// Simple presentational placeholder for city search UI
const CitySearch = ({ allLocations }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // Event handler for input changes
    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        }) : [];
        // Update state with new query and suggestions
        setQuery(value);
        setSuggestions(filteredLocations);
    };

    // Event handler for suggestion item click
    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false); // to hide the list
    };

    return (
        <div id="city-search">
            <input type="text" className="city" placeholder="Search for a city" 
                value={query}
                onFocus={() => setShowSuggestions(true)}
                onChange={handleInputChanged}
            />
            {showSuggestions ? 
                <ul className="suggestions">
                    {suggestions.map((suggestion) => {
                        return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
                    })}
                    <li onClick={handleItemClicked} key='See all cities'>
                        <b>See all cities</b>
                    </li>
                </ul> : null}
        </div>
    );
};

export default CitySearch;