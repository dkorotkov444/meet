# Gherkin Scenarios

## Feature 1 — Filter Events By City

### Scenario 1 — When user hasn’t searched for a city, show upcoming events from all cities.

*Given* the user is on the main event list page

*When* the user has not searched or filtered by city

*Then* the system displays upcoming events from all available cities

### Scenario 2 — User should see a list of suggestions when they search for a city.

*Given* the user is typing a city name in the search field

*When* the search field contains at least one character

*Then* the system displays a list of suggested cities that match the input

### Scenario 3 — User can select a city from the suggested list.

*Given* the user is viewing a list of suggested cities

*When* the user selects a city from the suggestion list

*Then* the event list is updated to show only events in the selected city

## Feature 2 — Show/Hide Event Details

### Scenario 1 — An event element is collapsed by default.

*Given* the user views the list of events

*When* the list is initially loaded

*Then* all event elements are collapsed and only basic information is visible

### Scenario 2 — User can expand an event to see details.

*Given* an event element is collapsed

*When* the user clicks the expand control for that event

*Then* the event details (date, time, description) are shown

### Scenario 3 — User can collapse an event to hide details.

*Given* an event element is expanded and showing details

*When* the user clicks the collapse control for that event

*Then* the event details are hidden and the element returns to its collapsed state

## Feature 3 — Specify Number of Events

### Scenario 1 — When user hasn’t specified a number, 32 events are shown by default.

*Given* the user is on the main event list page

*When* the user has not changed the number of events setting

*Then* the system displays exactly 32 events by default

### Scenario 2 — User can change the number of events displayed.

*Given* the user has access to the number of events setting

*When* the user sets the number of events to a new value (e.g., 10)

*Then* the system displays only the specified number of events

## Feature 4 — Use the App When Offline

### Scenario 1 — Show cached data when there’s no internet connection.

*Given* the user has previously loaded event data while online

*And* the device loses its internet connection

*When* the user opens the app

*Then* the system displays the most recently cached event data

### Scenario 2 — Show error when user changes search settings (city, number of events).

*Given* the user is offline and viewing cached data

*When* the user attempts to change the search criteria (e.g., filter by city or change the number of events)

*Then* the system displays an error message indicating a connection is required to fetch new data

## Feature 5 — Add an App Shortcut to the Home Screen

### Scenario 1 — User can install the meet app as a shortcut on their device home screen.

*Given* the user is viewing the app in a mobile browser (or an install prompt is visible)

*When* the user confirms the installation prompt

*Then* a shortcut icon for the event app is successfully created on the device's home screen

## Feature 6 — Display Charts Visualizing Event Details

### Scenario 1 — Show a chart with the number of upcoming events in each city.

*Given* the event data contains upcoming events across multiple cities

*When* the user views the dashboard or analytics section

*Then* the system displays a chart (e.g., a bar chart) visualizing the count of upcoming events for each city.
