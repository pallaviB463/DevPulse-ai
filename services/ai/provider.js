const OpenAI = require("openai");
const { SYSTEM_PROMPT } = require("./prompts");

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "DevPulse AI"
    }
});

async function askAI(prompt) {
    try {

        const completion = await client.chat.completions.create({

            model: "openai/gpt-oss-20b",

            messages: [
            {
                role: "system",
                content: SYSTEM_PROMPT
            },
            {
                role: "user",
                content: prompt
            }
            ]

        });

        return completion.choices[0].message.content;

    } catch (error) {

        console.error(error);

        return "❌ AI service unavailable.";

    }
}

module.exports = {
    askAI
};