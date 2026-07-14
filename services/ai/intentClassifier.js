/**
 * Infers a structured command intent from a natural-language Slack message.
 */
function classifyIntent(message) {
    const text = message.toLowerCase();

    if (
        text.includes("repositories") ||
        text.includes("repos") ||
        text.includes("my repos")
    ) {
        return {
            type: "github",
            command: "repos"
        };
    }

    if (
        text.includes("commits") ||
        text.includes("latest commit")
    ) {
        return {
            type: "github",
            command: "commits"
        };
    }

    if (
        text.includes("pull requests") ||
        text.includes("prs")
    ) {
        return {
            type: "github",
            command: "pulls"
        };
    }

    if (
        text.includes("issues")
    ) {
        return {
            type: "jira",
            command: "issues"
        };
    }

    return null;
}

module.exports = {
    classifyIntent
};