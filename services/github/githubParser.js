function parseGitHubCommand(text) {

    const parts = text.trim().split(/\s+/);

    return {
        command: parts[1] || "",
        repo: parts[2] || ""
    };

}



module.exports = {
    parseGitHubCommand
};