/*
 * src/App.jsx
 * Root application component.
 */

// --- External libraries ---
import React, { useEffect, useState } from 'react';

// --- Local components ---
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import EventList from './components/EventList';
import { getEvents, extractLocations } from './api';

// --- Styles ---
import './App.css';

// App component composes the page from smaller components
const App = () => {
    // --- Application state ---
    const [events, setEvents] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(32);
    const [allLocations, setAllLocations] = useState([]);
    const [currentCity, setCurrentCity] = useState("See all cities");
    
    // Fetch events on component mount
    useEffect(() => {
        fetchData();
    }, [currentCity]);

    // Function to fetch events and update state
    const fetchData = async () => {
        const allEvents = await getEvents();
        const filteredEvents = currentCity === "See all cities" ?
            allEvents :
            allEvents.filter(event => event.location === currentCity)
        setEvents(filteredEvents.slice(0, currentNOE));
        setAllLocations(extractLocations(allEvents));
    };

    return (
        <div className='App'>
            <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
            <NumberOfEvents />
            <EventList events={events}/>
        </div>
    );
};

export default App;
