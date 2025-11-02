/*
 * src/components/Event.jsx
 * Single event list item (placeholder component).
 */

// --- External libraries ---
import React from 'react';

// Renders a single event as a list item (expand with props as needed)
const Event = ({ event }) => {
    // Render the event title so tests can assert on the summary text.
    // Additional details/controls will be added in further patches.
    return (
        <li className="event">
            <h2 className="event-summary">{event && event.summary}</h2>
            {/* Minimal rendering of start time so the test can find the raw value */}
            <p className="event-start">{event && (event.start && event.start.dateTime ? event.start.dateTime : event.start)}</p>
            {/* Minimal rendering of location so the test can assert on it */}
            <p className="event-location">{event && event.location}</p>
            {/* Show details control (button) - minimal text to satisfy test */}
            <button className="details-toggle">show details</button>
        </li>
    );
};

export default Event;