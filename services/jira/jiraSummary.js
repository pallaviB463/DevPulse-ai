const { askAI } = require("../ai/provider");

/**
 * Summarizes Jira project data in a Slack-friendly format.
 */
async function summarizeJira(data) {
    const prompt = `
You are DevPulse AI.

Analyze this Jira project.

${JSON.stringify(data, null, 2)}

Provide:

1. Overall project status
2. Team workload
3. High priority issues
4. Suggestions

Keep under 200 words.
`;

    return await askAI(prompt);
}

module.exports = {
    summarizeJira
};