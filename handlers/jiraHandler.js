const { parseJiraCommand } = require("../services/jira/jiraParser");
const { getMyProfile,getProjects } = require("../services/jira/jiraService");
const {
    formatProfile,
    formatProjects
} = require("../utils/jiraFormatter");

async function handleJiraCommand(text, say) {

    const { command } = parseJiraCommand(text);

    if (command === "profile") {

        const profile = await getMyProfile();

        await say(formatProfile(profile));

        return true;
    }

    if (command === "projects") {

        const projects = await getProjects();

        await say(formatProjects(projects));

        return true;
    }

    return false;

}

module.exports = {
    handleJiraCommand
};