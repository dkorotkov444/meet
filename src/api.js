/*
 * src/api.js
 * API interaction functions.
 */

// --- External libraries ---
import NProgress from 'nprogress';
// --- Local modules ---
import mockEvents from './mock-data.js';

// Remove query parameters from the URL & clean up the history
export const removeQuery = () => {
    let newurl;
    if (window.history.pushState && window.location.pathname) {
        newurl =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname;
        window.history.pushState("", "", newurl);
    } else {
        newurl = window.location.protocol + "//" + window.location.host;
    // test-hook: mark that else-branch ran so tests/coverage can detect execution
    window.__REMOVE_QUERY_ELSE = true;
        window.history.pushState("", "", newurl);
    }
};

// Check if the access token is valid
const checkToken = async (accessToken) => {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    const result = await response.json();
    return result;
};

// Exchange authorization code for an access token
const getToken = async (code) => {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
      'https://znw1gon93l.execute-api.eu-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode
    );
    const { access_token } = await response.json();
    access_token && localStorage.setItem("access_token", access_token);
    return access_token;
};

// Fetch a new access token
export const getAccessToken = async () => {
    const accessToken = localStorage.getItem('access_token');
    const tokenCheck = accessToken && (await checkToken(accessToken));

    if (!accessToken || tokenCheck.error) {
      await localStorage.removeItem("access_token");
      const searchParams = new URLSearchParams(window.location.search);
      const code = await searchParams.get("code");
      if (!code) {
        const response = await fetch(
          "https://znw1gon93l.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
        );
        const result = await response.json();
        const { authUrl } = result;
        window.location.href = authUrl;
        return authUrl;
      }
      return code && getToken(code);
    }
    return accessToken;
};

// @param {*} events:
// The following function should be in the “api.js” file.
// This function takes an events array, then uses map to create a new array with only locations.
// It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
// The Set will remove all duplicates from the array.
export const extractLocations = (events) => {
    const extractedLocations = events.map((event) => event.location);
    const locations = [...new Set(extractedLocations)];
    return locations;
};

// Fetch the list of all events
export const getEvents = async () => {
    NProgress.start(); // Show loading bar
    // If running on localhost, return mock data
    if (window.location.href.startsWith('http://localhost')) {
        NProgress.done();   // Hide loading bar
        return mockEvents;
    }

    // If offline, return cached events
    if (!navigator.onLine) {
        const events = localStorage.getItem("lastEvents");
        NProgress.done();   // Hide loading bar
        return events?JSON.parse(events):[];
    }

    // Fetch or obtain an OAuth access token.
    const token = await getAccessToken();

    if (token) {
        // Remove the query parameters from the URL
        removeQuery();
        const url = "https://znw1gon93l.execute-api.eu-central-1.amazonaws.com/dev/api/calendar-events" + "/" + token;
        const response = await fetch(url);
        const result = await response.json();
        if (result) {
            NProgress.done();   // Hide loading bar
            localStorage.setItem("lastEvents", JSON.stringify(result.events)); // Save events to localStorage
            return result.events;
        } else return null;
    }
};