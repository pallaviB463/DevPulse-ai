const { getCommits } = require("../github/githubService");
const { getMyIssues } = require("../jira/jiraService");
const { askAI } = require("../ai/provider");

async function generateStandup() {

    const repo = process.env.DEFAULT_REPOSITORY;

    const commits = await getCommits(repo);

    const issues = await getMyIssues();

    const prompt = `
You are DevPulse AI.

Today's GitHub commits:

${JSON.stringify(commits, null, 2)}

Current Jira Issues:

${JSON.stringify(issues, null, 2)}

Generate a daily standup.

Format:

Yesterday:
- ...

Today:
- ...

Blockers:
- ...

Keep it under 150 words.
`;

    return await askAI(prompt);

}

module.exports = {
    generateStandup
};