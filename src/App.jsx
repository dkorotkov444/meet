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
    const [currentNOE, setCurrentNOE] = useState(32);
    const [allLocations, setAllLocations] = useState([]);
    const [currentCity, setCurrentCity] = useState("See all cities");
    const [infoAlert, setInfoAlert] = useState("");
    const [warningAlert, setWarningAlert] = useState("");
    const [errorAlert, setErrorAlert] = useState("");

    // Fetch events when either the selected city or the desired number of events changes
    useEffect(() => {
        const fetchData = async () => {
            const allEvents = await getEvents();
            const filteredEvents = currentCity === "See all cities" ?
                allEvents :
                allEvents.filter(event => event.location === currentCity)
            setEvents(filteredEvents.slice(0, currentNOE));
            setAllLocations(extractLocations(allEvents));
        };
        // Check if the user is online or offline
        if (navigator.onLine) {
            setWarningAlert("");
          } else {
            setWarningAlert("You are currently offline. Some features may not be available.");
          }
        fetchData();
    }, [currentCity, currentNOE]);

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
                <CityEventsChart allLocations={allLocations} events={events} />
                <EventList events={events}/>
            </main>
        </div>
    );
};

export default App;