const { parseGitHubCommand } = require("../services/github/githubParser");
const { generateDashboard } = require("../services/github/githubDashboard");
const { dashboardBlocks } = require("../utils/slackBlocks");
const {
    summarizeRepository
} = require("../services/github/githubSummary");
const {
    getProfile,
    getRepositories,
    getCommits,
    getPullRequests,
    getIssues
} = require("../services/github/githubService");

const {
    formatProfile,
    formatRepositories,
    formatCommits,
    formatPullRequests,
    formatIssues
} = require("../utils/githubFormatter");

async function loadGitHubSnapshot(repo) {
    const profile = await getProfile();
    const [commits, pulls, issues] = await Promise.all([
        getCommits(repo),
        getPullRequests(process.env.GITHUB_USERNAME, repo),
        getIssues(process.env.GITHUB_USERNAME, repo)
    ]);

    return {
        profile,
        commits,
        pulls,
        issues
    };
}

/**
 * Handles GitHub-related Slack commands.
 */
async function handleGitHubCommand(text, say) {
    const { command, repo } = parseGitHubCommand(text);

    if (command === "profile") {
        const profile = await getProfile();

        await say(formatProfile(profile));

        return true;
    }

    if (command === "repos") {
        const repos = await getRepositories();

        await say(formatRepositories(repos));

        return true;
    }

    if (command === "commits") {
        const commits = await getCommits(repo);

        await say(formatCommits(commits));

        return true;
    }

    if (command === "pulls") {
        const pulls = await getPullRequests(
            process.env.GITHUB_USERNAME,
            repo
        );

        await say(formatPullRequests(pulls));

        return true;
    }

    if (command === "issues") {
        const issues = await getIssues(
            process.env.GITHUB_USERNAME,
            repo
        );

        await say(formatIssues(issues));

        return true;
    }

    if (command === "summary") {
        const repositoryData = await loadGitHubSnapshot(repo);
        const summary = await summarizeRepository(repositoryData);

        await say(summary);

        return true;
    }

    if (command === "dashboard") {
        const repositoryData = await loadGitHubSnapshot(repo);
        const dashboard = await generateDashboard(repositoryData);

        await say({
            blocks: dashboardBlocks({
                repo,
                owner: repositoryData.profile.login,
                commits: repositoryData.commits.length,
                pulls: repositoryData.pulls.length,
                issues: repositoryData.issues.length,
                summary: dashboard
            })
        });

        return true;
    }

    return false;
}

module.exports = {
    handleGitHubCommand
};