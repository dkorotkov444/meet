/*
 * src/__tests__/CitySearch.test.js
 * Unit tests for CitySearch component.
 */

// --- External libraries ---
import React from 'react';
import { render } from '@testing-library/react';    
// --- Local modules ---
import CitySearch from '../components/CitySearch';

describe('<CitySearch /> component', () => {

    let CitySearchComponent;
    beforeEach(() => {
        CitySearchComponent = render(<CitySearch />);
    });

    // Test case for rendering the city search input
    test('renders text input', () => {
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

});
