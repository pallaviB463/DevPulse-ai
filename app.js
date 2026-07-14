const app = require("./config/slack");

const { handleMessage } = require("./handlers/messageHandler");

app.message(async ({ message, say }) => {
    if (message.subtype) return;

    await handleMessage({ message, say });
});

(async () => {
    await app.start();

    console.info("DevPulse AI Slack app started.");

})();