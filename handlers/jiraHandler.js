const { parseJiraCommand } = require("../services/jira/jiraParser");
const { getMyProfile } = require("../services/jira/jiraService");
const {
    formatProfile
} = require("../utils/jiraFormatter");

async function handleJiraCommand(text, say) {

    const { command } = parseJiraCommand(text);

    if (command === "profile") {

        const profile = await getMyProfile();

        await say(formatProfile(profile));

        return true;
    }

    return false;

}

module.exports = {
    handleJiraCommand
};