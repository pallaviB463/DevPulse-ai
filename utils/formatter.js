function formatSlackMessage(text) {

    return text
        .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, "$1 / $2")
        .replace(/\\text\{([^}]*)\}/g, "$1")
        .replace(/\\\[/g, "")
        .replace(/\\\]/g, "")
        .replace(/\\\(/g, "")
        .replace(/\\\)/g, "")
        .replace(/\u00A0/g, " ")
        .trim();

}

module.exports = {
    formatSlackMessage
};