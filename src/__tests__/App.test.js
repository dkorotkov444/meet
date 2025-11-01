/* eslint-env jest */

import { render } from '@testing-library/react';
import React from 'react';
import App from './../App';

describe('<App /> component', () => {

    // Test case for rendering the event list
    test('renders list of events', () => {
        const AppDOM = render(<App />).container.firstChild;
        expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
      });

});