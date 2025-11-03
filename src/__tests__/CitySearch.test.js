/*
 * src/__tests__/CitySearch.test.js
 * Unit tests for CitySearch component.
 */

/* eslint-env jest */

// --- External libraries ---
import React from 'react';
import { render, fireEvent, within } from '@testing-library/react';   
import { userEvent } from "@testing-library/user-event"; 
// --- Local modules ---
import App from '../App';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';

// Unit test suite for CitySearch component
describe('<CitySearch /> component', () => {

    let CitySearchComponent;
    let allEvents;
    let allLocations;

    // Fetch shared fixtures once for the suite
    beforeAll(async () => {
        allEvents = await getEvents();
        allLocations = extractLocations(allEvents);
    });

    // Render a fresh component before each test with available locations
    beforeEach(() => {
        // Use the shared allLocations fixture fetched in beforeAll
        CitySearchComponent = render(<CitySearch allLocations={allLocations} />);
    });

    // Test case for rendering the city search input
    test('renders text input', () => {
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    // Test case for suggestions list hidden by default
    test('suggestions list is hidden by default', () => {
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });

    // Test case for displaying suggestions on input focus
    test('renders a list of suggestions when city textbox gains focus', async () => {
        // Setup user event
        const user = userEvent.setup();
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.click(cityTextBox);
        // Check if suggestions list is now in the document
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass('suggestions');
    });

    // Test case for updating suggestions based on user input
    test('updates list of suggestions correctly when user types in city textbox', async () => {
        const user = userEvent.setup();

        // Rerender component with dummy setCurrentCity prop
        CitySearchComponent.rerender(<CitySearch
            allLocations={allLocations}
            setCurrentCity={() => { }}
            />);

        // user types "Berlin" in city textbox
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");

        // filter allLocations to locations matching "Berlin"
        const suggestions = allLocations? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
        }): [];

        // get all <li> elements inside the suggestion list
        const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
        }
    });

    // Test case for rendering the suggestion text in the textbox upon clicking on the suggestion
    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        const user = userEvent.setup();

        // Rerender component with dummy setCurrentCity prop
        CitySearchComponent.rerender(<CitySearch
            allLocations={allLocations}
            setCurrentCity={() => { }}
            />);

        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");
        
        // the suggestion's textContent look like this: "Berlin, Germany"
        const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];
        await user.click(BerlinGermanySuggestion);
        
        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });

    // Test: clicking a suggestion should hide the suggestions list
    test('clicking a suggestion hides the suggestions list', async () => {
        const user = userEvent.setup();
        // Rerender component with dummy setCurrentCity prop
        CitySearchComponent.rerender(<CitySearch
            allLocations={allLocations}
            setCurrentCity={() => { }}
            />);

        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, 'Berlin');

        const firstSuggestion = CitySearchComponent.queryAllByRole('listitem')[0];
        await user.click(firstSuggestion);

        // textbox updated
        expect(cityTextBox).toHaveValue(firstSuggestion.textContent);
        // suggestions hidden after click
        expect(CitySearchComponent.queryByRole('list')).not.toBeInTheDocument();
    });

    // Test: clicking the nested <b> inside the "See all cities" item should behave the same (update textbox and hide suggestions)
    test('clicking the nested <b> inside "See all cities" triggers selection and hides list', async () => {
        const user = userEvent.setup();
        CitySearchComponent.rerender(<CitySearch />);

        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        // Focus to show suggestions (no typing required)
        await user.click(cityTextBox);

        const items = CitySearchComponent.queryAllByRole('listitem');
        const seeAllItem = items[items.length - 1];
        // find the nested <b> inside the list item and click it
        const bold = seeAllItem.querySelector('b');
        // Ensure the nested element exists before clicking
        expect(bold).not.toBeNull();
        await user.click(bold);

        // textbox should contain "See all cities"
        expect(cityTextBox).toHaveValue(seeAllItem.textContent);
        // suggestions should be hidden
        expect(CitySearchComponent.queryByRole('list')).not.toBeInTheDocument();
    });

    // Small deterministic test to ensure the filter predicate is executed and to cover the branch that filters locations based on the input value.
    test('typing into textbox filters allLocations (direct filter predicate coverage)', () => {
        const locations = ['Berlin, Germany', 'London, UK'];
        // Use the component instance rendered in beforeEach to avoid duplicate roots
        // Rerender component with dummy setCurrentCity prop
        CitySearchComponent.rerender(<CitySearch
            allLocations={locations}
            setCurrentCity={() => { }}
            />);

        const input = CitySearchComponent.getByRole('textbox');
        // Focus to show suggestions, then change value so the filter callback runs
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: 'Berlin' } });

        const items = CitySearchComponent.queryAllByRole('listitem');
        // 1 matching suggestion + the 'See all cities' item
        expect(items).toHaveLength(1 + 1);
        expect(items[0].textContent).toBe('Berlin, Germany');
        expect(CitySearchComponent.queryByRole('list')).toBeInTheDocument();
    });

    // Ensure the branch where no allLocations is provided is covered:
    // typing should render only the 'See all cities' item (no matches)
    test('typing with no allLocations shows only "See all cities" item', () => {
        // Rerender component WITHOUT passing allLocations to simulate missing prop
        CitySearchComponent.rerender(<CitySearch setCurrentCity={() => { }} />);

        const input = CitySearchComponent.getByRole('textbox');
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: 'Berlin' } });

        const items = CitySearchComponent.queryAllByRole('listitem');
        // Only the 'See all cities' item should be present
        expect(items).toHaveLength(1);
        expect(items[0].textContent).toBe('See all cities');
    });

});

// Integration test suite for CitySearch component
describe('<CitySearch /> integration', () => {

    // Test case for rendering suggestions list when the app is rendered
    test('renders a suggestions list when the app is rendered', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const cityTextBox = within(CitySearchDOM).queryByRole('textbox');

        await user.click(cityTextBox);

        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
     
        const suggestionListItems = await within(CitySearchDOM).findAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(allLocations.length + 1);
    });

});