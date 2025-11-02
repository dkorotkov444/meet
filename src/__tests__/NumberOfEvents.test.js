/*
 * src/__tests__/NumberOfEvents.test.js
 * Unit tests for the NumberOfEvents component (Feature 3: Specify Number of Events).
 */

/* eslint-env jest */

import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

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
