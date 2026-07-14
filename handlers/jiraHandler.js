const { parseJiraCommand } = require("../services/jira/jiraParser");
const {
    getMyProfile,
    getProjects,
    getMyIssues
} = require("../services/jira/jiraService");
const { summarizeJira } = require("../services/jira/jiraSummary");
const {
    formatProfile,
    formatProjects,
    formatIssues
} = require("../utils/jiraFormatter");

async function loadJiraSnapshot() {
    const profile = await getMyProfile();
    const [projects, issues] = await Promise.all([
        getProjects(),
        getMyIssues()
    ]);

    return {
        profile,
        projects,
        issues
    };
}

/**
 * Handles Jira-related Slack commands.
 */
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

    if (command === "issues") {
        const issues = await getMyIssues();

        await say(formatIssues(issues));

        return true;

    }

    if (command === "summary") {
        const jiraData = await loadJiraSnapshot();
        const summary = await summarizeJira(jiraData);

        await say(summary);

        return true;
    }

    return false;
}

module.exports = {
    handleJiraCommand
};