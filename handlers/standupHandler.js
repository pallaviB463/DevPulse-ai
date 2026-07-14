const { generateStandup } = require("../services/standup/standupService");

/**
 * Generates and sends the daily standup summary.
 */
async function handleStandup(say) {
    const summary = await generateStandup();

    await say(summary);

    return true;
}

module.exports = {
    handleStandup
};