const routes = [

    {
        keywords: ["github", "repo", "repository", "commit", "pull", "issue"],
        type: "github"
    },

    {
        keywords: ["jira", "ticket", "sprint", "epic"],
        type: "jira"
    }

];

async function routeRequest(message) {

    const text = message.toLowerCase();

    for (const route of routes) {

        if (route.keywords.some(word => text.includes(word))) {

            return {
                type: route.type,
                prompt: message
            };

        }

    }

    return {
        type: "ai",
        prompt: message
    };

}

module.exports = {
    routeRequest
};