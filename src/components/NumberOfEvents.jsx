/*
 * src/components/NumberOfEvents.jsx
 * Small controlled component that allows the user to specify how many events to show.
 */

import React, { useState } from 'react';

const NumberOfEvents = () => {
    // Controlled input value; default is '32' per requirements/tests
    const [value, setValue] = useState('32');

    const handleChange = (e) => setValue(e.target.value);

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
