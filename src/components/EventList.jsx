/*
 * src/components/EventList.jsx
 * Renders a list of Event items.
 */

// --- External libraries ---
import React from 'react';

// --- Local components ---
import Event from './Event';

// Presentational component: lists events or renders nothing when none exist
const EventList = ({ events }) => {
    return (
        <ul id="event-list">
            {events ? events.map(event => <Event key={event.id} event={event} />) : null}
        </ul>
    );
};

export default EventList; 