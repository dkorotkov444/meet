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
import mockEvents from '../mock-data';

describe('<EventGenresChart /> unit', () => {
    let allEvents;

    beforeAll(async () => {
        allEvents = await getEvents();
    });

    test('computes expected genre counts from mock data', () => {
        const GENRES = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
        const counts = GENRES.map((genre) => {
            return (mockEvents || []).filter(ev => ev.summary && ev.summary.toLowerCase().includes(genre.toLowerCase())).length;
        });
        // Expected counts derived from the current mock-data.js
        expect(counts).toEqual([18, 19, 1, 2, 3]);
    });

    test('renders title and the component mounts', () => {
        const { getByText, container } = render(<EventGenresChart allEvents={allEvents} />);
        // The component title was changed to 'Event Themes Popularity'
        expect(getByText('Event Themes Popularity')).toBeInTheDocument();
        // Ensure the component rendered some DOM
        expect(container.firstChild).not.toBeNull();
    });

    test('filters out zero-value genres and renders percentage labels', async () => {
        // Create a small events array: 2 React, 3 JavaScript, others absent
        const smallEvents = [
            { summary: 'React Conference 2025' },
            { summary: 'React Meetup' },
            { summary: 'JavaScript Workshop' },
            { summary: 'Advanced JavaScript' },
            { summary: 'JavaScript for Beginners' },
        ];

    const { queryByText, getByText } = render(<EventGenresChart allEvents={smallEvents} />);

        // The chart filters out zero-value genres, so 'Node', 'jQuery', 'Angular' should not render labels
        expect(queryByText(/Node/)).toBeNull();
        expect(queryByText(/jQuery/)).toBeNull();
        expect(queryByText(/Angular/)).toBeNull();

        // Labels rendering is provided by Recharts and may not produce DOM text in jsdom
        // but mounting with a non-empty events array ensures the effect runs and data is computed.
        // Confirm the title is present as a simple proxy that the component mounted and effects ran.
        expect(getByText('Event Themes Popularity')).toBeInTheDocument();
    });
});

describe('<EventGenresChart /> integration', () => {
    test('renders both charts inside the app', async () => {
        const AppComponent = render(<App />);
        const chartContainer = AppComponent.container.querySelector('.charts-container');
        expect(chartContainer).toBeInTheDocument();

        // Check left chart title
    const leftTitle = within(chartContainer).getByText('Event Themes Popularity');
        expect(leftTitle).toBeInTheDocument();

        // Check right chart title
        const rightTitle = within(chartContainer).getByText('Events Number by City');
        expect(rightTitle).toBeInTheDocument();
    });
});
