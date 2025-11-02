/*
 * src/__tests__/EventList.test.js
 * Unit tests for EventList component.
 */

// --- External libraries ---
import React from 'react';
import { render } from '@testing-library/react';

// --- Local modules ---
import EventList from '../components/EventList';
import { getEvents } from '../api';

describe('<EventList /> component', () => {

    let EventListComponent;
    beforeEach(() => {
        EventListComponent = render(<EventList />);
    });

    // Test case for rendering the event list
    test('has an element with "list" role', () => {
        expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
    });

    // Test case for rendering correct number of events
    test('renders correct number of events', async() => {
        const allEvents = await getEvents(); 
        EventListComponent.rerender(<EventList events={ allEvents } />);
        expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
    });
});