const { askAI } = require("../ai/provider");

async function summarizeRepository(data) {

    const prompt = `
You are DevPulse AI.

Analyze this GitHub repository.

${JSON.stringify(data, null, 2)}

Provide:

1. Repository health
2. Development activity
3. Code maintenance observations
4. Suggestions for improvement

Keep the answer under 200 words.
`;

    return await askAI(prompt);

}

module.exports = {
    summarizeRepository
};