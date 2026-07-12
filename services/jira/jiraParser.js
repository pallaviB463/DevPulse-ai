function parseJiraCommand(text) {

    const parts = text.trim().split(/\s+/);

    return {
        command: parts[1] || "",
        project: parts[2] || ""
    };

}

module.exports = {
    parseJiraCommand
};