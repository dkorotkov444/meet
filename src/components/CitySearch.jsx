/*
 * src/components/CitySearch.jsx
 * City search input / selector (UI placeholder).
 */

// --- External libraries ---
import React, {useState, useEffect} from 'react';

// Simple presentational placeholder for city search UI
const CitySearch = ({ allLocations , setCurrentCity }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // Update suggestions when allLocations prop changes
    useEffect(() => {
        // Ensure suggestions is always an array. If allLocations is undefined (component rendered without prop), 
        // fall back to an empty array to avoid setting suggestions to undefined which causes .map() to throw.
        setSuggestions(allLocations || []);
    }, [JSON.stringify(allLocations)]);

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
        // Use currentTarget to ensure we get the <li> text even when a nested element (e.g. <b>) was clicked.
        const value = event.currentTarget.textContent;
        setQuery(value);
        setShowSuggestions(false); // hide the list
        // If parent passed a setter for current city, notify it with the
        // full suggestion string (e.g. "Berlin, Germany").
        if (typeof setCurrentCity === 'function') {
            setCurrentCity(value);
        }
    };

    return (
        <div id="city-search" className="city-search" role="combobox"
             aria-haspopup="listbox"
             aria-owns={showSuggestions ? 'city-suggestion-list' : undefined}
             aria-expanded={showSuggestions}>
            <label htmlFor="city-input" className="city-label"><strong>Choose your nearest city</strong></label>
            <input id="city-input" type="text" className="city" placeholder="Search for a city"
                value={query}
                onFocus={() => setShowSuggestions(true)}
                onChange={handleInputChanged}
                aria-autocomplete="list"
                aria-controls={showSuggestions ? 'city-suggestion-list' : undefined}
            />
            {showSuggestions ? (
                <ul id="city-suggestion-list" className="suggestions">
                    {suggestions.map((suggestion) => {
                        return (
                            <li
                                onClick={handleItemClicked}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleItemClicked(e); } }}
                                tabIndex={0}
                                key={suggestion}
                            >
                                {suggestion}
                            </li>
                        );
                    })}
                    <li onClick={handleItemClicked} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleItemClicked(e); } }} tabIndex={0} key='See all cities'>
                        <b>See all cities</b>
                    </li>
                </ul>
            ) : null}
        </div>
    );
};

export default CitySearch;