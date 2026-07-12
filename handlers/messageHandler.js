const { getRepositories,getProfile,getCommits } = require("../services/github/githubService");
const { formatRepositories,formatProfile,formatCommits } = require("../utils/githubFormatter");
const { formatSlackMessage } = require("../utils/formatter");
const handleCommand = require("./commandHandler");
const { routeRequest } = require("../services/ai/router");
const { executeMCP } = require("../services/mcp/router");
const { askAI } = require("../services/ai/provider");
const { handleGitHubCommand } = require("./githubHandler");


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

        switch (request.type) {

            case "github":

                const handled = await handleGitHubCommand(text.toLowerCase(), say);

                if (!handled) {

                    await say("🐙 GitHub command not recognized.");

                }

                break;
            

            case "jira":

                await say("🎫 Jira integration coming soon.");

                break;

            default:

                const reply = await askAI(request.prompt);

                await say(reply);

        }
    } catch (err) {

    console.error("========== ERROR ==========");
    console.error(err);
    console.error(err.stack);

    await say("❌ Sorry, I couldn't contact the AI service.");

    }
    }

module.exports = {
    handleMessage
};