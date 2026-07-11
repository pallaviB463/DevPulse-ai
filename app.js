require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN
});

app.message("hello", async ({ message, say }) => {
    await say(
        `👋 Hello <@${message.user}>!\n\nWelcome to *DevPulse AI* 🚀`
    );
});

(async () => {
    await app.start(process.env.PORT || 3000);

    console.log("================================");
    console.log("🚀 DevPulse AI Started");
    console.log("================================");
})();