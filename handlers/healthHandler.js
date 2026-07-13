const {
    getProfile,
    getCommits,
    getPullRequests,
    getIssues
} = require("../services/github/githubService");

const {
    getMyIssues
} = require("../services/jira/jiraService");

const {
    analyzeHealth
} = require("../services/ai/healthAnalyzer");

async function handleHealth(repo, say) {

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

    const jiraIssues = await getMyIssues();

    const report = await analyzeHealth({

        profile,
        commits,
        pulls,
        issues,
        jiraIssues

    });

    await say(report);

}

module.exports = {
    handleHealth
};