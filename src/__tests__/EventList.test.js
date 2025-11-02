/*
 * src/__tests__/EventList.test.js
 * Unit tests for EventList component.
 */

// --- External libraries ---
import React from 'react';
import { render } from '@testing-library/react';

// --- Local modules ---
import EventList from '../components/EventList';

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
    test('renders correct number of events', () => {
        EventListComponent.rerender(<EventList events={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />);
        expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
    });
});