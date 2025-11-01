// src/__tests__/EventList.test.js
import React from 'react';
import { render } from '@testing-library/react';
import EventList from '../components/EventList';


describe('<EventList /> component', () => {
    // Test case for rendering the event list
    test('has an element with "list" role', () => {
        const EventListComponent = render(<EventList />);
        expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
    });
    // Test case for rendering correct number of events
    test('renders correct number of events', () => {
        const EventListComponent = render(<EventList events={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />);
        expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
    });
});