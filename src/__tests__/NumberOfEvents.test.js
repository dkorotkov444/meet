/*
 * src/__tests__/NumberOfEvents.test.js
 * Unit tests for the NumberOfEvents component (Feature 3: Specify Number of Events).
 */

/* eslint-env jest */

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';

// Unit test suite for <NumberOfEvents /> component
describe('<NumberOfEvents /> component', () => {
    let input;
    let renderResult;
    let defaultValue;

    // Global setup for the suite: define the expected default value.
    beforeAll(() => {
        defaultValue = '32';
    });

    // Render a fresh component before each test and expose helpers
    beforeEach(() => {
        renderResult = render(<NumberOfEvents />);
        input = renderResult.getByRole('textbox');
    });

    // Test case: component contains a textbox input
    test('contains a textbox input', () => {
        expect(input).toBeInTheDocument();
    });

    // Test case: default value is 32
    test('has default value of 32', () => {
        expect(input.value).toBe(defaultValue);
    });

    // Test case: input has correct id for App-level querying
    test('has an id of number-of-events for App-level querying', () => {
        expect(input.id).toBe('number-of-events');
    });

    // Test case: updates value when user types
    test('updates value when user types', async () => {
        // Simulate clearing the default '32' and typing '10'
        await userEvent.type(input, '{backspace}{backspace}10');
        expect(input.value).toBe('10');
    });
});

// Integration test suite for <NumberOfEvents /> component
describe('<NumberOfEvents /> integration', () => {

    // Integration test: App + NumberOfEvents + EventList
    // Test case: changing number of events updates input value and rendered events
    test('when the user changes the number of events in the input, the number of rendered events changes accordingly', async () => {
        // Render the full App so components are wired together
        const { container } = render(<App />);

        // Wait for events to be loaded and rendered
        await waitFor(() => expect(container.querySelectorAll('.event').length).toBeGreaterThan(0));

        // Find the NumberOfEvents input (has id 'number-of-events' and default value '32')
        const numberInput = container.querySelector('#number-of-events');
        expect(numberInput).toBeInTheDocument();

        // Clear default '32' and type '6' (backspace twice to remove '3' and '2')
        await userEvent.type(numberInput, '{backspace}{backspace}6');

        // Assert that the number of rendered events changes to 6
        await waitFor(() => expect(container.querySelectorAll('.event').length).toBe(6));
    });
});