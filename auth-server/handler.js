/* eslint-disable no-undef */
/* eslint-env node */
'use strict';

const {google} = require('googleapis');
const calendar = google.calendar('v3');
const SCOPES = ['https://www.googleapis.com/auth/calendar.events.public.readonly'];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;
const redirect_uris = ['https://meet-xi-blush.vercel.app/'];

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID, 
    CLIENT_SECRET, 
    redirect_uris[0]
);

const DEFAULT_CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
};

function buildResponse(statusCode, bodyObj, headers = {}) {
    return {
        statusCode,
        headers: Object.assign({}, DEFAULT_CORS_HEADERS, headers),
        body: JSON.stringify(bodyObj),
    };
}

module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

    return buildResponse(200, { authUrl });
};

module.exports.getAccessToken = async (event) => {
    // Decode authorization code extracted from the URL query
    const code = decodeURIComponent(`${event.pathParameters.code}`);
      
    return new Promise((resolve, reject) => {
        // Exchange authorization code for access token with a “callback” after the exchange,
        // The callback in this case is an arrow function with the results as parameters: “error” and “response”
        oAuth2Client.getToken(code, (error, response) => {
            if (error) {
                return reject(error);
            }
            return resolve(response);
        });
    })
    .then((results) => {
        // Respond with OAuth token
        return buildResponse(200, results);
    })
    .catch((error) => {
        // Handle error
        console.error('getAccessToken error', error);
        return buildResponse(500, { error: error && error.message ? error.message : String(error) });
    });
};

module.exports.getCalendarEvents = async (event) => {
    // Decode authorization code extracted from the URL query
    const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
    oAuth2Client.setCredentials({ access_token });

    return new Promise((resolve, reject) => {
        // Retrieve calendar events with a “callback” after the retrieval,
        // The callback in this case is an arrow function with the results as parameters: “error” and “response”
        calendar.events.list({
            calendarId: CALENDAR_ID,
            auth: oAuth2Client,
            timeMin: (new Date()).toISOString(),
            // maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        }, (error, response) => {
            if (error) {
                return reject(error);
            }
            return resolve(response);
        });
    })
    .then((results) => {
        // Respond with calendar events
        return buildResponse(200, { events: results.data.items });
    })
    .catch((error) => {
        // Handle error
        console.error('getCalendarEvents error', error);
        return buildResponse(500, { error: error && error.message ? error.message : String(error) });
    });
};