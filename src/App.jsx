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
import { InfoAlert, WarningAlert, ErrorAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';

// --- Styles ---
import './App.css';

// App component composes the page from smaller components
const App = () => {
    // --- Application state ---
    const [events, setEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [allLocations, setAllLocations] = useState([]);
    const [currentNOE, setCurrentNOE] = useState(32);
    const [currentCity, setCurrentCity] = useState("See all cities");
    const [infoAlert, setInfoAlert] = useState("");
    const [warningAlert, setWarningAlert] = useState("");
    const [errorAlert, setErrorAlert] = useState("");

    // Fetch events once on mount and keep the full dataset in `allEvents`.
    // Displayed `events` are derived from `allEvents` whenever filters change.
    // We intentionally fetch on mount only — disable the exhaustive-deps lint rule for this effect.
    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        let mounted = true;
        const fetchData = async () => {
            const eventsFromApi = await getEvents();    // Fetch events from the API
            const entries = eventsFromApi || [];        // Ensure we have an array
            if (!mounted) return;
            setAllEvents(entries);                       // Update all events state
            setAllLocations(extractLocations(entries));  // Update all locations state
            // Derive initially displayed events based on current filters
            const filtered = currentCity === "See all cities"
                ? entries
                : entries.filter(event => event.location === currentCity);
            setEvents(filtered.slice(0, currentNOE));
        };

        // Check if the user is online or offline (initial check)
        if (navigator.onLine) {
            setWarningAlert("");
        } else {
            setWarningAlert("You are currently offline. Some features may not be available.");
        }

        fetchData();
        return () => { mounted = false; };
    }, []);
    /* eslint-enable react-hooks/exhaustive-deps */

    // Derive the displayed `events` whenever the full dataset or filters change
    useEffect(() => {
        const filtered = currentCity === "See all cities"
            ? allEvents
            : allEvents.filter(event => event.location === currentCity);
        setEvents(filtered.slice(0, currentNOE));
    }, [allEvents, currentCity, currentNOE]);

    // Refresh data when the app regains online connectivity
    useEffect(() => {
        const handleOnline = async () => {
            // clear offline warning
            setWarningAlert("");
            try {
                const eventsFromApi = await getEvents();
                const entries = eventsFromApi || [];
                setAllEvents(entries);
                setAllLocations(extractLocations(entries));
                // displayed events will update via the other effect
            } catch (err) {
                // keep any existing alerts; set an errorAlert if desired
                console.error('Failed to refresh events on reconnect', err);
            }
        };

        window.addEventListener('online', handleOnline);
        return () => window.removeEventListener('online', handleOnline);
    }, []);

    return (
        <div className='App'>
            {/* Skip link for keyboard users */}
            <a className="skip-link" href="#main-content">Skip to content</a>

            <header aria-label="App header">
                <h1 className="app-title">Meet App</h1>

                <div className="alerts-container">
                    {infoAlert.length ? <InfoAlert text={infoAlert}/> : null}
                    {warningAlert.length ? <WarningAlert text={warningAlert}/> : null}
                    {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
                </div>

                <CitySearch 
                    allLocations={allLocations} 
                    setCurrentCity={setCurrentCity} 
                    setInfoAlert={setInfoAlert}/>

                <NumberOfEvents 
                    currentNOE={currentNOE} 
                    setCurrentNOE={setCurrentNOE}
                    setErrorAlert={setErrorAlert} />
            </header>

            <main id="main-content" role="main">

                <div className='chart-container'>
                    <CityEventsChart allLocations={allLocations} allEvents={allEvents} />
                </div>
                
                <EventList events={events}/>
            </main>
        </div>
    );
};

export default App;