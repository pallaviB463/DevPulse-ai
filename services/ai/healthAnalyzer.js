const { askAI } = require("./provider");

async function analyzeHealth(data) {

    const prompt = `
You are DevPulse AI.

Analyze this software project.

${JSON.stringify(data, null, 2)}

Give:

1. Health score out of 100
2. GitHub observations
3. Jira observations
4. Risks
5. Suggestions

Limit to 200 words.
`;

    return await askAI(prompt);

}

module.exports = {
    analyzeHealth
};