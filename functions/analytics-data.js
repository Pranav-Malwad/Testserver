const { google } = require("googleapis");

// Load service account key file
// const key = require("./test-server-447503-72bd59363a20.json");

const clientEmail = 'admin-198@test-server-447503.iam.gserviceaccount.com';
const privateKey = `-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCkf0Kr7YgOUQ8G\nnhkVpPdjFNVfPvgwsKI3V964Qc+J1iQkTIvkcOSDcFL2p1RjgEh95bDJScqvjPB1\n96PRJdQX/yu4JQsXOO/jh2Cx359SFLvbIEwNvoaBS0DVLhiDb32My1wWn2mLgsWl\nb3kxJ5rvCMvFNh1ZnrIwqIMWE90Ao3n7k3xTOsAFEtIwwYK6cH6RdLoTbb/GBeG3\na1PVdz/fK5s4gxAqK0MTBrH/I0yRet6WawQZ+UdYA0IXq3y1sFLa1Wxoc6Nqf1sZ\nStGBE54THqtI5CgMeEIm4MlybJ2+fGu7rFd4c8X+8py96voxfZgiYgMxaZfH8liH\ndxxG4v6fAgMBAAECggEAElIGF+XdiFKozMDg5FM6JjPUy8XUmH+joWxM5tKVjbFm\n1xAbaHbWTHk/FC9wq6BG8paZSOHKDCEzSsAo44tGAuIteVXO1WhG911FfKn+MYMT\npQUE02cLzeyWrOd0XXcWUY74k6BvfdUztAglRD839zVQlIdBX5DYIaky6EuQCpj8\no9+m+LYE8jmdRNHEQYXw9ntD95fDRZCKoCjTR9hqTOjCzw2TAK2xVgvYWRE4AO5U\niuY9aWeK0qV8d+rNeSgFug0qIgmgxyiIOK9L6P16arwi1vSXtmqgc90+8ch69Oui\nE2eOcKGkgyag9p+9E9OiVMj9NGnYgtqgm2rWvAf1eQKBgQDW1GR6jCBRB/3oSkRW\ncd+43xdq7p8kQhvT3lnZ85rF1fqWuYKiwd/8VpBnAQo34uLAOxG83PstKfvzFQcq\nTOUaBthboodgP4w75oYEyvEUcgQ15w2FC0yK6cnaeftGMsusuTjH0DbdSYhna03F\n8CsGzFaUZn+kvEyytt+YOcj+VQKBgQDEBYm/OyBEipUxyQ+r56+nn8SDnk94tgpi\nj3f627vsbwHRnHwhAkbJUr6rn2FUTLpeW4ggEuf/hHkwBsVh4MwaWMekda7+7DFU\nHcbZHgshI3OPQ1g1il2YN3QPTppaDpAywAkVhn6YpMAHVS9Ud7s4jQdCaSmuIxI3\n7bjdfh5VIwKBgCdJZiqnD43iCUP+uOqaHpC/c5fhlYba9B3Vzta13vsI+6+usz4y\neFS8O+IqZYT83/zJkJ/aRbDnuaSlls7cixUsZUq0uU8Xr/yQVrfvqRDVHQIChA1t\nmIza3kgvAI3A4lBu+vxHjpD/ToujKvDkz+mJWtf+up8UtG4GVXOQNbqVAoGAUqBm\n/OXGZz3nP7IZ2gNyRn0RD83mf+J0JDGHiIWhBDuSj7GfnSZhgjFPz/YBx9AD6ww4\nKBTwGAPWNYlVIDnqrtxnYwp8NlaHQIbAr/p7BH/2ERh5ETB+3U/aqy0d4QIshEfw\nTFOB/4PKsgyVQ8yobWD9A2BiwlVkM5EQEMU9sfMCgYAHTcTomyA+q/mp3PRWVXYS\nCmPd4ImvUVw0O+O0/Wv5nhTgy/klJsKq1tkKx3kb1iUsFayJnrF+v8sCC5NWMbJO\nkf8x46mrPadWA7fhywhwllh+wIZTnZzgK8EdM+0sFGnb2dMKDSXJ74Tjpn39F5zy\nEzPp6X+7GyYwtp2ndkdz5g==\n-----END PRIVATE KEY-----\n`

// Initialize JWT client
const jwtClient = new google.auth.JWT(
  clientEmail,
  null,
  privateKey,
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
