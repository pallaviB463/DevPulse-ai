async function handleCommand(text) {

    switch (text) {

        case "hello":
            return `👋 Hello!

Welcome to *DevPulse AI* 🚀`;

        case "help":
            return `🤖 *DevPulse AI*

Available Commands

• hello
• help
• about
• ping

Coming Soon 🚀

• summarize
• github
• jira
• review
• explain`;

        case "about":
            return `🚀 *DevPulse AI*

AI-powered Developer Assistant

✅ Slack
✅ OpenAI
✅ GitHub MCP
✅ Jira MCP
✅ Express Backend

Built with Bolt + Node.js`;

        case "ping":
            return "🏓 Pong!";

        default:
            return null;
    }
}

module.exports = handleCommand;