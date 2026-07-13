const { parseJiraCommand } = require("../services/jira/jiraParser");
const { getMyProfile,getProjects, getMyIssues} = require("../services/jira/jiraService");
const { summarizeJira } = require("../services/jira/jiraSummary");
const {
    formatProfile,
    formatProjects,
    formatIssues
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
    if (command === "issues") {

        const issues = await getMyIssues();

        await say(formatIssues(issues));

        return true;

    }
    if (command === "summary") {

        const profile = await getMyProfile();

        const projects = await getProjects();

        const issues = await getMyIssues();

        const summary = await summarizeJira({
            profile,
            projects,
            issues
        });

        await say(summary);

        return true;
}

    return false;

}

module.exports = {
    handleJiraCommand
};