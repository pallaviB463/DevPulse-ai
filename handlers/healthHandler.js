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

/**
 * Calculates and posts the project health summary for a repository.
 */
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
    let score = 100;

    if (commits.length === 0) score -= 20;
    if (pulls.length === 0) score -= 15;
    if (issues.length === 0) score -= 10;

    if (jiraIssues.length === 0) score -= 15;

    score = Math.max(score, 0);

    const report = await analyzeHealth({
        score,
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