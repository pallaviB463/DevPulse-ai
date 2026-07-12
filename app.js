const app = require("./config/slack");

const { handleMessage } = require("./handlers/messageHandler");

// Listen to all user messages
app.message(async ({ message, say }) => {

    if (message.subtype) return;

    await handleMessage({ message, say });

});

(async () => {

    await app.start();

    console.log("================================");
    console.log("🚀 DevPulse AI Started");
    console.log("================================");

})();