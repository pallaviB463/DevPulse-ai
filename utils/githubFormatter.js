function formatRepositories(repos) {

    if (!repos.length) {
        return "No repositories found.";
    }

    let message = "📦 *Your GitHub Repositories*\n\n";

    repos.forEach(repo => {

        message +=
`• *${repo.name}*
Language: ${repo.language || "Unknown"}
Updated: ${repo.updated_at.split("T")[0]}

`;

    });

    return message;

}
function formatProfile(profile) {

    return `
🐙 *GitHub Profile*

👤 ${profile.name}
📛 Username: ${profile.login}
📦 Public Repositories: ${profile.public_repos}
👥 Followers: ${profile.followers}
⭐ Following: ${profile.following}
🌐 ${profile.html_url}
`;

}
function formatCommits(commits) {

    let message = "📜 *Latest Commits*\n\n";

    commits.forEach(commit => {

        message += `• ${commit.message}\n`;
        message += `  👤 ${commit.author}\n`;
        message += `  📅 ${new Date(commit.date).toLocaleDateString()}\n\n`;

    });

    return message;
}
function formatPullRequests(pulls) {

    if (!pulls.length) {
        return "🎉 No open pull requests.";
    }

    let message = "🔀 *Open Pull Requests*\n\n";

    pulls.forEach(pr => {

        message += `#${pr.number} ${pr.title}\n`;
        message += `👤 ${pr.author}\n`;
        message += `📅 ${new Date(pr.created_at).toLocaleDateString()}\n\n`;

    });

    return message;
}
function formatIssues(issues) {

    if (!issues.length) {
        return "🎉 No open issues.";
    }

    let message = "🐞 *Open Issues*\n\n";

    issues.forEach(issue => {

        message += `#${issue.number} ${issue.title}\n`;
        message += `👤 ${issue.author}\n`;
        message += `📅 ${new Date(issue.created_at).toLocaleDateString()}\n\n`;

    });

    return message;
}

module.exports = {
    formatProfile,
    formatRepositories,
    formatCommits,
    formatPullRequests,
    formatIssues
};




