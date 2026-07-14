const fs = require("fs");
const path = require("path");

/**
 * Reads a file from the current project workspace.
 */
async function readProjectFile(filename) {

    try {

        const fullPath = path.join(process.cwd(), filename);

        if (!fs.existsSync(fullPath)) {

            return null;

        }

        return fs.readFileSync(fullPath, "utf8");

    } catch (err) {

        console.error("Failed to read project file:", err.message || err);

        return null;

    }

}

module.exports = {

    readProjectFile

};