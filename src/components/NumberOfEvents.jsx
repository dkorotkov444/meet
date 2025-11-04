/*
 * src/components/NumberOfEvents.jsx
 * Small controlled component that allows the user to specify how many events to show.
 */

import React, { useState, useEffect } from 'react';

// The component keeps a local input state so it can be rendered standalone in
// unit tests, but it also notifies the parent App of changes via
// `setCurrentNOE` when provided.
const NumberOfEvents = ({ currentNOE = 32, setCurrentNOE = () => {} }) => {
    const [value, setValue] = useState(String(currentNOE));

    // Keep local input in sync when parent updates the current number
    useEffect(() => {
        setValue(String(currentNOE));
    }, [currentNOE]);

    const handleChange = (e) => {
        const next = e.target.value;
        setValue(next);
        // Only notify parent when the input contains only digits.
        // This prevents transient values like '' (empty string -> Number('') === 0)
        // or values like '1a' from triggering updates.
        if (/^\d+$/.test(next)) {
            setCurrentNOE(Number(next));
        }
    };

    return (
        <div>
            {/* The input has id 'number-of-events' so App-level tests can query it */}
            <input
                id="number-of-events"
                role="textbox"
                type="text"
                value={value}
                onChange={handleChange}
            />
        </div>
    );
};

export default NumberOfEvents;
