function formatProfile(profile) {

    return `
👤 *${profile.displayName}*

📧 ${profile.emailAddress}
🆔 ${profile.accountId}
`;

}
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

module.exports = {
    formatProfile,
    formatProjects
};