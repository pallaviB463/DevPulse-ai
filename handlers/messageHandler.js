const handleCommand = require("./commandHandler");
const { routeRequest } = require("../services/ai/router");
const { askAI } = require("../services/ai/provider");

const { handleGitHubCommand } = require("./githubHandler");
const { handleJiraCommand } = require("./jiraHandler");
const { handleStandup } = require("./standupHandler");
const { handleHealth } = require("./healthHandler");

const { classifyIntent } = require("../services/ai/intentClassifier");

async function handleMessage({ message, say }) {

    // Ignore bot messages
    if (message.subtype === "bot_message" || message.bot_id) {
        return;
    }

    let text = message.text.trim();

    // Built-in commands
    const commandResponse = await handleCommand(text.toLowerCase());

    if (commandResponse) {
        await say(commandResponse);
        return;
    }

    await say("🤖 Thinking...");

    // AI intent classification
    const intent = classifyIntent(text);

    // Keep repo/project names if present
    if (intent) {

        const words = text.split(/\s+/);

        if (words.length > 1) {
            text = `${intent.type} ${intent.command} ${words.slice(1).join(" ")}`;
        } else {
            text = `${intent.type} ${intent.command}`;
        }
    }

    try {

        // Special Project Health command
        if (
            text.toLowerCase().startsWith("project health") ||
            text.toLowerCase().startsWith("github dashboard")
        ) {

            const repo = text.split(/\s+/).pop();

            await handleHealth(repo, say);

            return;
        }

        const request = await routeRequest(text);

        console.log("Request:", request);

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

        console.error("========== ERROR ==========");
        console.error(err);
        console.error(err.response?.data);
        console.error(err.message);
        console.error(err.stack);
        console.error("===========================");

        await say("❌ Sorry, I couldn't contact the AI service.");
    }
}

module.exports = {
    handleMessage
};