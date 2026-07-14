const { askAI } = require("./provider");

/**
 * Explains the calculated project health score in Slack-friendly text.
 */
async function analyzeHealth(data) {
    const prompt = `
You are DevPulse AI.

The project health score has already been calculated.

Health Score: ${data.score}/100

Repository data:

${JSON.stringify(data, null, 2)}

DO NOT calculate another health score.

Explain why the project received this score.

Return ONLY Slack-friendly plain text in the following format:

📊 Project Health Score
Health Score: ${data.score}/100

📌 GitHub
• observations

📋 Jira
• observations

⚠️ Risks
• risks

💡 Suggestions
• suggestions

Keep the response under 200 words.
`;

    return await askAI(prompt);

}

module.exports = {
    analyzeHealth
};