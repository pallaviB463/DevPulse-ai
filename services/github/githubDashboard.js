const { askAI } = require("../ai/provider");

async function generateDashboard(data) {

    const prompt = `
You are DevPulse AI.

Analyze this GitHub repository.

${JSON.stringify(data, null, 2)}

Return:

📊 Repository Health Score (0-100)

📈 Development Activity

🔧 Maintenance Observations

💡 Suggestions for Improvement

Keep it under 150 words.
`;

    return await askAI(prompt);
}

module.exports = {
    generateDashboard
};