/*
 * src/__tests__/App.test.js
 * Basic smoke tests for the App component.
 */

/* eslint-env jest */

// --- Testing utilities ---
import React from 'react';
import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// --- Local modules ---
import App from './../App';
import { getEvents } from '../api';

// Unit test suite for the main <App /> component
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

    // Test case for rendering the NumberOfEvents component
    test('render NumberOfEvents', () => {
        expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
    });

});

// Integration test suite for the main <App /> component
describe('<App /> integration', () => {
    let berlinEvents;

    // Fetch events once for the integration suite
    beforeAll(async () => {
        const allEvents = await getEvents();
        berlinEvents = allEvents.filter(event => event.location === 'Berlin, Germany');
    });

    // Test case for filtering events by selected city (Berlin)
    test('renders a list of events matching the city selected by the user', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

        await user.type(CitySearchInput, "Berlin");
        const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
        await user.click(berlinSuggestionItem);

        const EventListDOM = AppDOM.querySelector('#event-list');
        // Wait for the app to update after selecting a city (async fetch)
        const allRenderedEventItems = await within(EventListDOM).findAllByRole('listitem');

        expect(allRenderedEventItems.length).toBe(berlinEvents.length);
        allRenderedEventItems.forEach(event => {
            expect(event.textContent).toContain("Berlin, Germany");
        });
    });
});