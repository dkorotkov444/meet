/*
 * src/App.jsx
 * Root application component.
 */

// --- External libraries ---
import React from 'react';

// --- Local components ---
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import EventList from './components/EventList';

// App component composes the page from smaller components
const App = () => {
    return (
        <div className='App'>
            <CitySearch />
            <NumberOfEvents />
            <EventList />
        </div>
    );
};

export default App;
