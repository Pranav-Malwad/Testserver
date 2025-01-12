const { google } = require("googleapis");

// Load service account key file
const key = require("../backend/test-server-447503-72bd59363a20.json");

// Initialize JWT client
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ["https://www.googleapis.com/auth/analytics.readonly"]
);

// Set up Google Analytics API
const analytics = google.analytics("v3"); // For Universal Analytics (GA4 uses analyticsdata)

exports.handler = async (event, context) => {
  try {
    // Authorize the client
    await jwtClient.authorize();

    // Replace with your Analytics view ID
    const viewId = "472513290";

    // Fetch data from Google Analytics
    const response = await analytics.data.ga.get({
      auth: jwtClient,
      ids: `ga:${viewId}`,
      "start-date": "7daysAgo",
      "end-date": "today",
      metrics: "ga:sessions,ga:pageviews",
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return {
      statusCode: 500,
      body: "Error fetching analytics data",
    };
  }
};
