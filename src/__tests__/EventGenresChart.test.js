/*
 * src/__tests__/EventGenresChart.test.js
 * Unit and integration tests for EventGenresChart component
 */

/* eslint-env jest */

import React from 'react';
import { render, within } from '@testing-library/react';
import EventGenresChart from '../components/EventGenresChart';
import App from '../App';
import { getEvents } from '../api';

describe('<EventGenresChart /> unit', () => {
    let allEvents;

    beforeAll(async () => {
        allEvents = await getEvents();
    });

    test('renders title and the component mounts', () => {
        const { getByText, container } = render(<EventGenresChart allEvents={allEvents} />);
        expect(getByText('Event Genres Popularity')).toBeInTheDocument();
        // Ensure the component rendered some DOM
        expect(container.firstChild).not.toBeNull();
    });
});

describe('<EventGenresChart /> integration', () => {
    test('renders both charts inside the app', async () => {
        const AppComponent = render(<App />);
        const chartContainer = AppComponent.container.querySelector('.chart-container');
        expect(chartContainer).toBeInTheDocument();

        // Check left chart title
        const leftTitle = within(chartContainer).getByText('Event Genres Popularity');
        expect(leftTitle).toBeInTheDocument();

        // Check right chart title
        const rightTitle = within(chartContainer).getByText('Events Number by City');
        expect(rightTitle).toBeInTheDocument();
    });
});
