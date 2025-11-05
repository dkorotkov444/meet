/* eslint-env jest,node */
import puppeteer from 'puppeteer';


describe('show/hide an event details', () => {

    let browser;
    let page;

    // Set up Puppeteer before running tests
    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('http://localhost:5173/');
        await page.waitForSelector('.event');
    });

    // Close Puppeteer after tests are done
    afterAll(async () => {
      await browser.close();
    });

    test('An event element is collapsed by default', async () => {
        // Verify that the event details are not visible
        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeNull();
      });

    test('User can expand an event to see its details', async () => {
        // Click the details toggle button
        await page.click('.event .details-toggle');
        // Verify that the event details are now visible
        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide details', async () => {
        await page.click('.event .details-toggle');
        const eventDetails = await page.$('.event .event-details');
        expect(eventDetails).toBeNull();
    });
});
