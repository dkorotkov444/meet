/*
 * src/__tests__/Event.test.js
 * Tests for the Event component: verifies that title, start time, location,
 * and the "Show details" control are rendered for a given event.
 */

/* eslint-env jest */

import React from 'react';
import { render } from '@testing-library/react';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
		let event;
		let queryByText;

		// Fetch a sample event once before tests
		beforeAll(async () => {
			const allEvents = await getEvents();
			event = allEvents[0];
		});

		// Render a fresh component before each test and expose query helper
		beforeEach(() => {
			const renderResult = render(<Event event={event} />);
			queryByText = renderResult.queryByText;
		});

		// Test case for rendering event title
		test('renders event title (summary)', () => {
			expect(queryByText(event.summary)).toBeInTheDocument();
		});

		// Test case for rendering event start time
		test('renders event start time', () => {
			const startText = event.start && event.start.dateTime ? event.start.dateTime : event.start;
			expect(queryByText(startText)).toBeInTheDocument();
		});

		// Test case for rendering event location
		test('renders event location', () => {
			expect(queryByText(event.location)).toBeInTheDocument();
		});

		// Test case for rendering event details button
		test('renders event details button with the title (show details)', () => {
			expect(queryByText('show details')).toBeInTheDocument();
		});
});
