/*
 * src/components/NumberOfEvents.jsx
 * Small controlled component that allows the user to specify how many events to show.
 */

import React, { useState, useEffect } from 'react';

// The component keeps a local input state so it can be rendered standalone in
// unit tests, but it also notifies the parent App of changes via
// `setCurrentNOE` when provided.
const NumberOfEvents = ({ currentNOE = 32, setCurrentNOE = () => {}, setErrorAlert = () => {} }) => {
    const [value, setValue] = useState(String(currentNOE));

    // Keep local input in sync when parent updates the current number
    useEffect(() => {
        setValue(String(currentNOE));
    }, [currentNOE]);

    const handleChange = (e) => {
        const next = e.target.value;
        setValue(next);

        // Trim whitespace and parse to number once for validation
        const trimmed = next.trim();
        const num = trimmed === '' ? NaN : Number(trimmed);

        // Only notify parent when the input contains only digits.
        // This prevents transient values like '' or '1a' from triggering updates.
        if (/^\d+$/.test(trimmed)) {
            if (typeof setCurrentNOE === 'function') {
                setCurrentNOE(Number(trimmed));
            }
        }

        // Validate: empty, non-numeric, below 1 or above 250 -> error
        let errorText;
        if (trimmed === '' || Number.isNaN(num) || num < 1 || num > 250) {
            errorText = `Please enter a number between 1 and 250`;
        } else {
            errorText = "";
        }
        // Only call setErrorAlert if parent provided it as a function (defensive).
        if (typeof setErrorAlert === 'function') {
            setErrorAlert(errorText);
        }
    };

    return (
        <div>
            {/* Label above the input (normal text) */}
            <label htmlFor="number-of-events" className="noe-label">Number of events</label>
            {/* The input has id 'number-of-events' so App-level tests can query it */}
            <input
                id="number-of-events"
                role="spinbutton"
                type="number"
                min="1"
                max="250"
                value={value}
                onChange={handleChange}
                aria-label="Number of events to show"
            />
        </div>
    );
};

export default NumberOfEvents;
