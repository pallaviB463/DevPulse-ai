const { generateStandup } = require("../services/standup/standupService");

async function handleStandup(say) {

    const summary = await generateStandup();

    await say(summary);

    return true;
}

module.exports = {
    handleStandup
};