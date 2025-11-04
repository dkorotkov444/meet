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

    // Render the event title and minimal fields. Details are hidden by default
    // and are toggled by the button. Button text matches test expectations.
    return (
        <li className="event">
            <h2 className="event-summary">{event && event.summary}</h2>
            {/* Minimal rendering of start time so the test can find the raw value */}
            <p className="event-start">
                {event && (event.start && event.start.dateTime ? event.start.dateTime : event.start)}
                {event && event.start && (event.start.timeZone || event.start.timezone) ? (
                    <span className="event-timezone">{` ${event.start.timeZone || event.start.timezone}`}</span>
                ) : null}
            </p>
            {/* Minimal rendering of location so the test can assert on it */}
            <p className="event-location">{event && event.location}</p>

            {/* Show/hide details control */}
            <button className="details-toggle" onClick={toggleDetails}>
                {showDetails ? 'hide details' : 'show details'}
            </button>

            {/* Conditionally render details section (description) */}
            {showDetails && event && event.description ? (
                <div className="event-details">
                    {/* Preserve whitespace/newlines from the description so tests that
                        match the raw string (including newlines) will find the text.
                        This uses CSS pre-wrap to keep line breaks while still wrapping. */}
                    {/* Small title above the details */}
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