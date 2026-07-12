async function routeRequest(message) {

    const text = message.trim().toLowerCase();

    // Filesystem
    if (text.startsWith("explain ")) {

        const filename = message.substring(8).trim();

        return {
            type: "filesystem",
            filename
        };
    }

    // GitHub
    if (text.startsWith("github")) {

        return {
            type: "github",
            query: message
        };
    }

    // Jira
    if (text.startsWith("jira")) {

        return {
            type: "jira",
            query: message
        };
    }

    // Default AI
    return {
        type: "ai",
        prompt: message
    };
}

module.exports = {
    routeRequest
};