/**
 * Formats a Jira profile for Slack.
 */
function formatProfile(profile) {
    return `
👤 *${profile.displayName}*

📧 ${profile.emailAddress}
🆔 ${profile.accountId}
`;
}

/**
 * Formats Jira projects for Slack.
 */
function formatProjects(projects) {
    if (!projects.length) {
        return "📂 No Jira projects found.";
    }

    let output = "📂 *Jira Projects*\n\n";

    projects.forEach(project => {
        output += `• *${project.name}* (${project.key})\n`;
    });

    return output;
}

/**
 * Formats Jira issues for Slack.
 */
function formatIssues(issues) {
    if (!issues.length) {
        return "✅ No open issues assigned to you.";
    }

    let output = "📋 *My Jira Issues*\n\n";

    issues.forEach(issue => {
        output += `• *${issue.key}*\n`;
        output += `  ${issue.fields.summary}\n`;
        output += `  Priority: ${issue.fields.priority?.name || "None"}\n\n`;
    });

    return output;
}

module.exports = {
    formatProfile,
    formatProjects,
    formatIssues
};