require("dotenv").config();

const { WebClient } = require("@slack/web-api");

const client = new WebClient(process.env.SLACK_BOT_TOKEN);

(async () => {
    try {
        const result = await client.auth.test();
        console.log(result);
    } catch (err) {
        console.error(err.data || err);
    }
})();