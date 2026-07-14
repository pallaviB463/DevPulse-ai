const handleCommand = require("./commandHandler");
const { routeRequest } = require("../services/ai/router");
const { askAI } = require("../services/ai/provider");

const { handleGitHubCommand } = require("./githubHandler");
const { handleJiraCommand } = require("./jiraHandler");
const { handleStandup } = require("./standupHandler");
const { handleHealth } = require("./healthHandler");

const { classifyIntent } = require("../services/ai/intentClassifier");

/**
 * Routes incoming Slack messages to built-in commands, AI replies, or service handlers.
 */
async function handleMessage({ message, say }) {
    if (message.subtype === "bot_message" || message.bot_id) {
        return;
    }

    let text = message.text.trim();

    const commandResponse = await handleCommand(text.toLowerCase());

    if (commandResponse) {
        await say(commandResponse);
        return;
    }

    await say("🤖 Thinking...");

    const intent = classifyIntent(text);

    if (intent) {
        const words = text.split(/\s+/);

        if (words.length > 1) {
            text = `${intent.type} ${intent.command} ${words.slice(1).join(" ")}`;
        } else {
            text = `${intent.type} ${intent.command}`;
        }
    }

    try {
        if (
            text.toLowerCase().startsWith("project health") ||
            text.toLowerCase().startsWith("github dashboard")
        ) {

            const repo = text.split(/\s+/).pop();

            await handleHealth(repo, say);

            return;
        }

        const request = await routeRequest(text);

        if (request.type === "ai") {
            const reply = await askAI(request.prompt);

            await say(reply);

            return;
        }

        switch (request.type) {

            case "github": {
                const handled = await handleGitHubCommand(text.toLowerCase(), say);

                if (!handled) {
                    await say("🐙 GitHub command not recognized.");
                }

                break;
            }

            case "jira": {
                const handled = await handleJiraCommand(text.toLowerCase(), say);

                if (!handled) {
                    await say("📋 Jira command not recognized.");
                }

                break;
            }

            case "standup": {
                await handleStandup(say);

                break;
            }

            default: {
                const reply = await askAI(request.prompt);

                await say(reply);
            }
        }

    } catch (err) {
        console.error("Failed to process Slack message:", err.response?.data || err.message || err);

        await say("❌ Sorry, I couldn't contact the AI service.");
    }
}

module.exports = {
    handleMessage
};