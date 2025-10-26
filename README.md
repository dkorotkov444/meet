# Meet â€” Event Finder (React + Vite)

Meet is a serverless, progressive web application (PWA) built with React and Vite. It allows users to search events in different locations and was developed using a test-driven development (TDD) approach. The application uses the Google Calendar API to fetch upcoming events.

Summary
-------

Meet helps users discover upcoming events across multiple cities, adjust the number of results, view event details, and access analytics â€” all in a PWA that works offline and can be installed to a device home screen.

Table of contents
-----------------

- [Summary](#summary)
- [Usage (Quick start)](#usage-quick-start)
- [Key Features](#key-features)
- [User Stories](#user-stories)
- [Scenarios](#scenarios)
- [Notes](#notes)
- [Original README (template content)](#react--vite)

Usage (Quick start)
-------------------

Install dependencies and run locally using npm:

```bash
npm install
npm run dev
```

Other useful scripts (from `package.json`):

```bash
npm run build   # build for production
npm run preview # preview production build
npm run lint    # run ESLint
```

Key Features
------------

- Filter Events by City
- Show/Hide Event Details
- Specify Number of Events
- Use the App When Offline
- Add an App Shortcut to the Home Screen
- Display Charts Visualizing Event Details

User Stories
------------

### Feature 1 â€” Filter Events by City

User story: As a user, I should be able to filter events by city, so that I can see a list of events taking place in that city.

### Feature 2 â€” Show/Hide Event Details

User story: As a user, I should be able to show or hide event details (date, time, description), so that I can quickly scan the list or view full information.

### Feature 3 â€” Specify Number of Events

User story: As a user, I should be able to set the maximum number of events displayed, so that I can control the list length and reduce scrolling.

### Feature 4 â€” Use the App When Offline

User story: As a user, I should be able to view previously loaded event data while offline, so that I can access information without an internet connection.

### Feature 5 â€” Add an App Shortcut to the Home Screen

User story: As a mobile user, I should be able to add an app shortcut to my home screen, so that I can launch the application immediately.

### Feature 6 â€” Display Charts Visualizing Event Details

User story: As a user or organizer, I should be able to view charts visualizing event statistics, so that I can gain high-level insights into performance at a glance.

Scenarios
---------

The scenarios below are presented in plain Markdown so the Gherkin keywords render with emphasis.

### Feature 1 â€” Filter Events By City

#### Scenario 1 â€” When user hasnâ€™t searched for a city, show upcoming events from all cities.

*Given* the user is on the main event list page

*When* the user has not searched or filtered by city

*Then* the system displays upcoming events from all available cities

#### Scenario 2 â€” User should see a list of suggestions when they search for a city.

*Given* the user is typing a city name in the search field

*When* the search field contains at least one character

*Then* the system displays a list of suggested cities that match the input

#### Scenario 3 â€” User can select a city from the suggested list.

*Given* the user is viewing a list of suggested cities

*When* the user selects a city from the suggestion list

*Then* the event list is updated to show only events in the selected city

### Feature 2 â€” Show/Hide Event Details

#### Scenario 1 â€” An event element is collapsed by default.

*Given* the user views the list of events

*When* the list is initially loaded

*Then* all event elements are collapsed and only basic information is visible

#### Scenario 2 â€” User can expand an event to see details.

*Given* an event element is collapsed

*When* the user clicks the expand control for that event

*Then* the event details (date, time, description) are shown

#### Scenario 3 â€” User can collapse an event to hide details.

*Given* an event element is expanded and showing details

*When* the user clicks the collapse control for that event

*Then* the event details are hidden and the element returns to its collapsed state

### Feature 3 â€” Specify Number of Events

#### Scenario 1 â€” When user hasnâ€™t specified a number, 32 events are shown by default.

*Given* the user is on the main event list page

*When* the user has not changed the number of events setting

*Then* the system displays exactly 32 events by default

#### Scenario 2 â€” User can change the number of events displayed.

*Given* the user has access to the number of events setting

*When* the user sets the number of events to a new value (e.g., 10)

*Then* the system displays only the specified number of events

### Feature 4 â€” Use the App When Offline

#### Scenario 1 â€” Show cached data when thereâ€™s no internet connection.

*Given* the user has previously loaded event data while online

*And* the device loses its internet connection

*When* the user opens the app

*Then* the system displays the most recently cached event data

#### Scenario 2 â€” Show error when user changes search settings (city, number of events).

*Given* the user is offline and viewing cached data

*When* the user attempts to change the search criteria (e.g., filter by city or change the number of events)

*Then* the system displays an error message indicating a connection is required to fetch new data

### Feature 5 â€” Add an App Shortcut to the Home Screen

#### Scenario 1 â€” User can install the meet app as a shortcut on their device home screen.

*Given* the user is viewing the app in a mobile browser (or an install prompt is visible)

*When* the user confirms the installation prompt

*Then* a shortcut icon for the event app is successfully created on the device's home screen

### Feature 6 â€” Display Charts Visualizing Event Details

#### Scenario 1 â€” Show a chart with the number of upcoming events in each city.

*Given* the event data contains upcoming events across multiple cities

*When* the user views the dashboard or analytics section

*Then* the system displays a chart (e.g., a bar chart) visualizing the count of upcoming events for each city.

Notes
-----

- The project is a React + Vite app. For local development, use the scripts in `package.json` (e.g., `npm install` then `npm run dev`).
- Formatted user stories and scenarios are available in `docs/user-stories.md` and `docs/scenarios.md`.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
