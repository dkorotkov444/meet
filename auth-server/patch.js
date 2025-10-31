async function getAccessToken(event) {
    const code = JSON.parse(event.body).code;
    try {
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);
      return {
        statusCode: 200,
        body: JSON.stringify({ token: tokens }),
      };
    } catch (err) {
      console.error('Error retrieving access token', err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to retrieve access token' }),
      };
    }
  }
  
  async function getCalendarEvents() {
    const events = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
      auth: oAuth2Client,
    });
    return {
      statusCode: 200,
      body: JSON.stringify(events.data.items),
    };
  }

  

module.exports = {
  getAuthURL,
  getAccessToken,
  getCalendarEvents,
};