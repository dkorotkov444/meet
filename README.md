# Meet

Meet is a serverless, progressive web application (PWA) that helps users discover upcoming events across multiple cities. Built with React and Vite, the app integrates with Google Calendar API to fetch real-time event data and was developed using test-driven development (TDD) principles.

## Summary

Meet allows users to search and filter events by city, adjust the number of results displayed, view detailed event information with Google Calendar links, and analyze event distribution across cities through interactive charts. The app is fully functional offline using cached data and can be installed to a device home screen for quick access.

## Table of Contents

- [Quick Start](#quick-start)
- [Key Features](#key-features)
- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Authentication (Google OAuth)](#authentication-google-oauth)
- [UX Details](#ux-details)
- [Testing & Coverage](#testing--coverage)
- [Scenarios](#scenarios)
- [User Stories](#user-stories)

## Quick Start

Install dependencies and run locally:

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### Useful Commands

```bash
npm run build   # Build for production
npm run preview # Preview the production build locally
npm run lint    # Run ESLint to check code quality
npm test        # Run tests with Jest
npm test -- --coverage  # Run tests with coverage report
```

## Key Features

1. **Filter Events by City** — Search for events in specific cities or view all upcoming events. The app provides autocomplete suggestions as you type.

2. **Show/Hide Event Details** — Expand or collapse event cards to quickly scan the list or view full details including event descriptions and links to Google Calendar.

3. **Specify Number of Events** — Control how many events are displayed at once. Default is 32 events; adjust to your preference to reduce scrolling and improve performance.

4. **Use the App When Offline** — The app caches event data using Workbox. When offline, you can still view previously loaded events (though you cannot fetch new data without a connection).

5. **Add an App Shortcut to the Home Screen** — Install the app on your device's home screen for quick access, just like a native app. Works on mobile browsers and desktop.

6. **Display Charts Visualizing Event Details** — View interactive charts that show event distribution across cities and event genre breakdowns. Powered by Recharts, these visualizations provide quick insights into event patterns.

## Prerequisites

- **Node.js** (v14 or later recommended) and **npm** (v6 or later)
- **Google Calendar API credentials** — You'll need to set up OAuth credentials in the Google Cloud Console and configure them in the `auth-server/` configuration
- A modern browser that supports PWA features (Chrome, Edge, Firefox, Safari on iOS 16+)

## Tech Stack

- **Frontend:** React 19, Vite 7 (for fast builds and HMR)
- **Styling:** CSS (custom styles in `src/App.css`)
- **PWA & Offline:** Workbox (caching, service workers), vite-plugin-pwa
- **Charts:** Recharts (interactive data visualization)
- **State Management:** React Hooks (useState, useEffect)
- **API Integration:** Google Calendar API
- **Testing:** Jest, React Testing Library (jsdom), jest-cucumber for BDD
- **Code Quality:** ESLint
- **Monitoring:** Atatus (error tracking)

## Project Structure

```
meet/
├── src/
│   ├── components/           # React components (Alert, CitySearch, EventList, etc.)
│   ├── features/             # BDD feature files and tests (Cucumber-style)
│   ├── __tests__/            # Jest unit and integration tests
│   ├── api.js                # Google Calendar API integration
│   ├── App.jsx               # Root component
│   ├── App.css               # Styles
│   ├── service-worker.js     # Service worker for offline support
│   └── main.jsx              # Entry point
├── auth-server/              # Serverless functions for OAuth flow
│   ├── handler.js            # Lambda handler with getAuthURL, getAccessToken, getCalendarEvents
│   ├── config.json           # Configuration (API keys, endpoints)
│   └── serverless.yml        # Serverless Framework config
├── docs/                     # Documentation
│   ├── user-stories.md       # Detailed user stories
│   └── scenarios.md          # BDD scenarios
├── public/                   # Static assets (manifest.json for PWA)
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
└── jest.config.cjs           # Jest configuration
```

## Authentication (Google OAuth)

The serverless handlers in `auth-server/` implement three OAuth helpers:

- **`getAuthURL`** — Returns the Google OAuth consent screen URL. Initiates the sign-in flow and generates an authorization code.
- **`getAccessToken`** — Exchanges the authorization code for a short-lived access token. Secrets are kept server-side.
- **`getCalendarEvents`** — Calls Google Calendar API with the access token and returns the user's upcoming events.

This architecture keeps sensitive credentials (client secret, API keys) on the server while the frontend securely communicates via HTTPS. The OAuth flow ensures users grant consent before the app accesses their calendar.

## UX Details

### Event Element Behavior

- **Collapsed State:** Each event item displays the event title, start time (and timezone if available), and location.
- **Expanded State:** Clicking "show details" reveals:
  - A brief "About event:" section
  - A link to "See details on Google Calendar" (the event's Google Calendar URL)
  - The full event description
- **Design:** The details panel is intentionally compact to keep the list scannable and avoid excessive scrolling.

## Testing & Coverage

Tests are written with **Jest** and **React Testing Library** (using jsdom environment).

### Key Testing Approaches

- Run all tests: `npm test`
- Generate coverage report: `npm test -- --coverage`
- Tests cover component rendering, state changes, user interactions, and API integration
- **jsdom Limitations:** jsdom doesn't implement actual browser navigation, so tests mock `window.location.href` assignments and use mocked fetch responses for OAuth and API calls
- **BDD Features:** Located in `src/features/`, these tests use jest-cucumber syntax to validate user stories and scenarios

## Scenarios

### Feature 1. Filter Events By City

#### Scenario 1. When user has not searched for a city, show upcoming events from all cities.

*Given* the user is on the main event list page

*When* the user has not searched or filtered by city

*Then* the system displays upcoming events from all available cities

#### Scenario 2. User should see a list of suggestions when they search for a city.

*Given* the user is typing a city name in the search field

*When* the search field contains at least one character

*Then* the system displays a list of suggested cities that match the input

#### Scenario 3. User can select a city from the suggested list.

*Given* the user is viewing a list of suggested cities

*When* the user selects a city from the suggestion list

*Then* the event list is updated to show only events in the selected city

### Feature 2. Show/Hide Event Details

#### Scenario 1. An event element is collapsed by default.

*Given* the user views the list of events

*When* the list is initially loaded

*Then* all event elements are collapsed and only basic information is visible

#### Scenario 2. User can expand an event to see details.

*Given* an event element is collapsed

*When* the user clicks the expand control for that event

*Then* the event details (Google Calendar link, description) are shown

#### Scenario 3. User can collapse an event to hide details.

*Given* an event element is expanded and showing details

*When* the user clicks the collapse control for that event

*Then* the event details are hidden and the element returns to its collapsed state

### Feature 3. Specify Number of Events

#### Scenario 1. When user has not specified a number, 32 events are shown by default.

*Given* the user is on the main event list page

*When* the user has not changed the number of events setting

*Then* the system displays exactly 32 events by default

#### Scenario 2. User can change the number of events displayed.

*Given* the user has access to the number of events setting

*When* the user sets the number of events to a new value (e.g., 10)

*Then* the system displays only the specified number of events

### Feature 4. Use the App When Offline

#### Scenario 1. Show cached data when there is no internet connection.

*Given* the user has previously loaded event data while online

*And* the device loses its internet connection

*When* the user opens the app

*Then* the system displays the most recently cached event data

#### Scenario 2. Show error when user changes search settings (city, number of events).

*Given* the user is offline and viewing cached data

*When* the user attempts to change the search criteria (e.g., filter by city or change the number of events)

*Then* the system displays an error message indicating a connection is required to fetch new data

### Feature 5. Add an App Shortcut to the Home Screen

#### Scenario 1. User can install the meet app as a shortcut on their device home screen.

*Given* the user is viewing the app in a mobile browser (or an install prompt is visible)

*When* the user confirms the installation prompt

*Then* a shortcut icon for the event app is successfully created on the device's home screen

### Feature 6. Display Charts Visualizing Event Details

#### Scenario 1. Show a chart with the number of upcoming events in each city.

*Given* the event data contains upcoming events across multiple cities

*When* the user views the dashboard or analytics section

*Then* the system displays a chart (e.g., a bar chart) visualizing the count of upcoming events for each city.

## User Stories

### Feature 1. Filter Events by City

User story: As a user, I should be able to filter events by city, so that I can see a list of events taking place in that city.

### Feature 2. Show/Hide Event Details

User story: As a user, I should be able to show or hide event details (Google Calendar link, description), so that I can quickly scan the list or view full information.

### Feature 3. Specify Number of Events

User story: As a user, I should be able to set the maximum number of events displayed, so that I can control the list length and reduce scrolling.

### Feature 4. Use the App When Offline

User story: As a user, I should be able to view previously loaded event data while offline, so that I can access information without an internet connection.

### Feature 5. Add an App Shortcut to the Home Screen

User story: As a mobile user, I should be able to add an app shortcut to my home screen, so that I can launch the application immediately.

### Feature 6. Display Charts Visualizing Event Details

User story: As a user or organizer, I should be able to view charts visualizing event statistics, so that I can gain high-level insights into performance at a glance.
