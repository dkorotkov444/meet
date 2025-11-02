/*
 * src/__tests__/App.test.js
 * Basic smoke tests for the App component.
 */

/* eslint-env jest */

// --- Testing utilities ---
import { render } from '@testing-library/react';
import React from 'react';

// --- Local modules ---
import App from './../App';

describe('<App /> component', () => {
    
    let AppDOM;
    beforeEach(() => {
        // Setup code to run before each test
        AppDOM = render(<App />).container.firstChild;
    });

    // Test case for rendering the event list
    test('renders list of events', () => {
        expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
      });

    // Test case for rendering the city search
    test('render CitySearch', () => {
        expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
        });

});