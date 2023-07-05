const AUTH_KEY = process.env.ONESIGNAL_USER;
const APP_ID = process.env.ONESIGNAL_APP_ID;
const API_KEY = process.env.ONESIGNAL_API_KEY;

const sdk = require("api")("@onesignal/v9.0#9qqu7a46lli0f9a45");

sdk
  .createNotification(
    {
      included_segments: ["Subscribed Users"],
      contents: {
        en: "English or Any Language Message",
      },
      name: "INTERNAL_CAMPAIGN_NAME",
    },
    {
      authorization: `Basic ${API_KEY}`,
    }
  )
  .then(({ data }) => console.log(data))
  .catch((err) => console.error(err));
