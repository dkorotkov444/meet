/*
 * src/__tests__/EventList.test.js
 * Unit tests for EventList component.
 */

/* eslint-env jest */

// --- External libraries ---
import React from 'react';
import { render, waitFor, within } from '@testing-library/react';

// --- Local modules ---
import App from '../App';
import EventList from '../components/EventList';
import { getEvents } from '../api';

// Unit test suite for EventList component
describe('<EventList /> component', () => {

    let EventListComponent;
    let allEvents;
    // Fetch events once for the suite to avoid repeated network calls
    beforeAll(async () => {
        allEvents = await getEvents();
    });
    beforeEach(() => {
        EventListComponent = render(<EventList />);
    });

    // Test case for rendering the event list
    test('has an element with "list" role', () => {
        expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
    });

    // Test case for rendering correct number of events
    test('renders correct number of events', async() => {
        EventListComponent.rerender(<EventList events={ allEvents } />);
        expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
    });
});

// Integration test suite for <EventList /> component
describe('<EventList /> integration', () => {

    // Test case for rendering 32 events on app mount
    test('renders a list of 32 events when the app is mounted and rendered', async () => {
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector('#event-list');
        await waitFor(() => {
          const EventListItems = within(EventListDOM).queryAllByRole('listitem');
          expect(EventListItems.length).toBe(32);
        });
      });

});