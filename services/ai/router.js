const routes = [
    {
        prefix: "github",
        type: "github"
    },
    {
        prefix: "jira",
        type: "jira"
    }
];

/**
 * Routes free-form Slack messages to the most appropriate AI service.
 */
async function routeRequest(message) {
    const text = message.toLowerCase().trim();

    for (const route of routes) {
        if (text.startsWith(route.prefix)) {
            return {
                type: route.type,
                prompt: message
            };
        }
    }

    if (text.startsWith("standup")) {
        return {
            type: "standup",
            prompt: message
        };
    }

    return {
        type: "ai",
        prompt: message
    };
}

module.exports = {
    routeRequest
};