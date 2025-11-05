/* eslint-env jest */
import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default.', ({ given, when, then }) => {
        let AppComponent;
        given('the user views the list of events', () => {
            AppComponent = render(<App />);
        });

        when('the list is initially loaded', async () => {
            // nothing to do; app mounted in given
            await waitFor(() => {});
        });

        then('all event elements are collapsed and only basic information is visible', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(0);
                const firstEvent = EventListItems[0];
                // details title should not be present and button should show 'show details'
                expect(within(firstEvent).queryByText('About event:')).toBeNull();
                const btn = within(firstEvent).getByRole('button');
                expect(btn.textContent).toBe('show details');

                // collapsed view shows title, start time (with timezone) and location
                const sample = mockData[0];
                expect(within(firstEvent).getByText(sample.summary)).toBeTruthy();
                const startText = sample.start.dateTime || sample.start;
                expect(within(firstEvent).getByText(startText)).toBeTruthy();
                if (sample.start.timeZone || sample.start.timezone) {
                    const tz = sample.start.timeZone || sample.start.timezone;
                    const tzSpan = firstEvent.querySelector('.event-timezone');
                    expect(tzSpan).not.toBeNull();
                    expect(tzSpan.textContent).toContain(tz);
                }
                expect(within(firstEvent).getByText(sample.location)).toBeTruthy();
            });
        });
    });

    test('User can expand an event to see details.', ({ given, when, then }) => {
        let AppComponent;
        let firstEvent;

        given('an event element is collapsed', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(0);
                firstEvent = EventListItems[0];
            });
        });

        when('the user clicks the expand control for that event', async () => {
            const user = userEvent.setup();
            const btn = within(firstEvent).getByRole('button');
            await user.click(btn);
        });

    then('the event details (Google Calendar link, description) are shown', async () => {
            // details area should now be visible
            expect(within(firstEvent).getByText('About event:')).toBeTruthy();
            // the link text should read 'See details on Google Calendar'
            const link = within(firstEvent).getByRole('link', { name: /see details on google calendar/i });
            expect(link).toBeTruthy();
            // link href and description should match the event data
            const sample = mockData[0];
            expect(link.getAttribute('href')).toBe(sample.htmlLink);
            expect(within(firstEvent).getByText(sample.description)).toBeTruthy();
            const btn = within(firstEvent).getByRole('button');
            expect(btn.textContent).toBe('hide details');
        });
    });

    test('User can collapse an event to hide details.', ({ given, when, then }) => {
        let AppComponent;
        let firstEvent;

        given('an event element is expanded and showing details', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(0);
                firstEvent = EventListItems[0];
            });
            // expand it
            const user = userEvent.setup();
            const btn = within(firstEvent).getByRole('button');
            await user.click(btn);
            // ensure expanded
            expect(within(firstEvent).getByText('About event:')).toBeTruthy();
        });

        when('the user clicks the collapse control for that event', async () => {
            const user = userEvent.setup();
            const btn = within(firstEvent).getByRole('button');
            await user.click(btn);
        });

        then('the event details are hidden and the element returns to its collapsed state', async () => {
            expect(within(firstEvent).queryByText('About event:')).toBeNull();
            const btn = within(firstEvent).getByRole('button');
            expect(btn.textContent).toBe('show details');
        });
    });
});
