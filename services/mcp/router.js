const { askAI } = require("../ai/provider");
const { readProjectFile } = require("./filesystem/filesystemMCP");

async function executeMCP(request) {

    switch (request.type) {

        case "filesystem":

            return await explainFile(request.filename);

        case "github":

            return "🚧 GitHub MCP not implemented yet.";

        case "jira":

            return "🚧 Jira MCP not implemented yet.";

        default:

            return "Unknown request.";
    }

}

async function explainFile(filename) {

    const code = await readProjectFile(filename);

    if (!code) {

        return `❌ File '${filename}' not found.`;

    }

    const prompt = `
Explain this JavaScript file.

Filename:
${filename}

Code:

${code}
`;

    return await askAI(prompt);

}

module.exports = {

    executeMCP

};