/*
 * src/components/Event.jsx
 * Single event list item (placeholder component).
 */

// --- External libraries ---
import React, { useState } from 'react';

// Renders a single event as a list item (expand with props as needed)
const Event = ({ event }) => {
    // Local UI state: whether details are visible
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => setShowDetails((s) => !s);

    // Build IDs used for aria-controls / aria-labelledby when event has an id
    const detailsId = event && event.id ? `event-details-${event.id}` : undefined;

    // Render the event title and minimal fields. Details are hidden by default
    // and are toggled by the button. Button text matches test expectations.
    return (
        <li className="event" aria-labelledby={event && event.id ? `event-title-${event.id}` : undefined}>
            <h2 id={event && event.id ? `event-title-${event.id}` : undefined} className="event-summary">{event && event.summary}</h2>
            {/* Minimal rendering of start time so the test can find the raw value */}
            <p className="event-start">
                {event && (event.start && event.start.dateTime ? event.start.dateTime : event.start)}
                {event && event.start && (event.start.timeZone || event.start.timezone) ? (
                    <span className="event-timezone">{` ${event.start.timeZone || event.start.timezone}`}</span>
                ) : null}
            </p>
            {/* Minimal rendering of location so the test can assert on it */}
            <p className="event-location">{event && event.location}</p>

            <button
                className="details-toggle"
                onClick={toggleDetails}
                aria-expanded={showDetails}
                aria-controls={detailsId}
            >
                {showDetails ? 'hide details' : 'show details'}
            </button>

            {/* Conditionally render details section (description) */}
            {showDetails && event && event.description ? (
                <div id={detailsId} className="event-details" role="region" aria-labelledby={event && event.id ? `event-title-${event.id}` : undefined}>
                    <h3 className="about-title">About event:</h3>
                    {/* Link to Google Calendar event */}
                    {event.htmlLink ? (
                        <p><a className="event-link" href={event.htmlLink} target="_blank" rel="noopener noreferrer">See details on Google Calendar</a></p>
                    ) : null}
                    <p className="event-description">{event.description}</p>
                </div>
            ) : null}
        </li>
    );
};

export default Event;