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

async function handleGitHubCommand(text, say) {
    const { command, repo } = parseGitHubCommand(text);
    console.log("Command:", command);
    console.log("Repo:", repo);

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

        const profile = await getProfile();

        const commits = await getCommits(repo);

        const pulls = await getPullRequests(
            process.env.GITHUB_USERNAME,
            repo
        );

        const issues = await getIssues(
            process.env.GITHUB_USERNAME,
            repo
        );

        const repositoryData = {
            profile,
            commits,
            pulls,
            issues
        };

        const summary = await summarizeRepository(repositoryData);

        await say(summary);

        return true;
    }
    if (command === "dashboard") {

        const profile = await getProfile();

        const commits = await getCommits(repo);

        const pulls = await getPullRequests(
            process.env.GITHUB_USERNAME,
            repo
        );

        const issues = await getIssues(
            process.env.GITHUB_USERNAME,
            repo
        );

        const dashboard = await generateDashboard({
            profile,
            commits,
            pulls,
            issues
        });

        await say({

            blocks: dashboardBlocks({

                repo,

                owner: profile.login,

                commits: commits.length,

                pulls: pulls.length,

                issues: issues.length,

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