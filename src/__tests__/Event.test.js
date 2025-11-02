/*
 * src/__tests__/Event.test.js
 * Tests for the Event component: verifies that title, start time, location,
 * and the "Show details" control are rendered for a given event.
 */

/* eslint-env jest */

import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

		// Test case: details are hidden by default
		test("event details are hidden by default", () => {
			// description should not be present before user interaction
			expect(queryByText(event.description)).not.toBeInTheDocument();
		});

		// Test case for rendering event details button
		test('renders event details button with the title (show details)', () => {
			expect(queryByText('show details')).toBeInTheDocument();
		});

		// Test: clicking "show details" reveals the event description and toggles the button
		test('shows event details when user clicks "show details"', async () => {
			const button = queryByText('show details');
			await userEvent.click(button);
			// description should be visible
			expect(queryByText(event.description)).toBeInTheDocument();
			// button should toggle to "hide details"
			expect(queryByText('hide details')).toBeInTheDocument();
		});

		// Test: clicking "hide details" hides the description and toggles the button back
		test('hides event details when user clicks "hide details"', async () => {
			// open first
			const openButton = queryByText('show details');
			await userEvent.click(openButton);
			const hideButton = queryByText('hide details');
			await userEvent.click(hideButton);
			// description should be hidden
			expect(queryByText(event.description)).not.toBeInTheDocument();
			// button should revert to "show details"
			expect(queryByText('show details')).toBeInTheDocument();
		});
});
