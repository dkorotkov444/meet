/* eslint-env jest */
import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user has not specified a number, 32 events are shown by default.', ({ given, when, then }) => {
        let AppComponent;
        given('the user is on the main event list page', () => {
            AppComponent = render(<App />);
        });

        when('the user has not changed the number of events setting', async () => {
            // app already mounted in given
            await waitFor(() => {});
        });

        then('the system displays exactly 32 events by default', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });

    test('User can change the number of events displayed.', ({ given, when, then }) => {
        let AppComponent;
        given('the user has access to the number of events setting', () => {
            AppComponent = render(<App />);
        });

        when('the user sets the number of events to a new value (e.g., 10)', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const numberInput = AppDOM.querySelector('#number-of-events');
            const user = userEvent.setup();
            // clear '32' and type '10'
            await user.type(numberInput, '{backspace}{backspace}10');
        });

        then('the system displays only the specified number of events', async () => {
            const AppDOM = AppComponent.container.firstChild;
            await waitFor(() => {
                const EventListItems = within(AppDOM.querySelector('#event-list')).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(10);
            });
        });
    });
});
