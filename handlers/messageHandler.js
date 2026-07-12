const { formatSlackMessage } = require("../utils/formatter");
const handleCommand = require("./commandHandler");
const { routeRequest } = require("../services/ai/router");
const { executeMCP } = require("../services/mcp/router");

async function handleMessage({ message, say }) {

    // Ignore bot messages
    if (message.subtype === "bot_message" || message.bot_id) {
        return;
    }

    const text = message.text.trim();

    // Check if it's a built-in DevPulse command
    const commandResponse = await handleCommand(text.toLowerCase());

    if (commandResponse) {
        await say(commandResponse);
        return;
    }

    // Otherwise send to AI
    await say("🤖 Thinking...");

    try {
        const request = await routeRequest(text);

        if (request.type === "ai") {

            const reply = await askAI(request.prompt);

            await say(reply);

            return;

        }

        const result = await executeMCP(request);

        await say(result);
    } catch (err) {
        console.error(err);
        await say("❌ Sorry, I couldn't contact the AI service.");
    }
}

module.exports = {
    handleMessage
};