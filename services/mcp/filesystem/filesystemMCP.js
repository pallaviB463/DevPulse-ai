const fs = require("fs");
const path = require("path");

async function readProjectFile(filename) {

    try {

        const fullPath = path.join(process.cwd(), filename);

        if (!fs.existsSync(fullPath)) {

            return null;

        }

        return fs.readFileSync(fullPath, "utf8");

    } catch (err) {

        console.error(err);

        return null;

    }

}

module.exports = {

    readProjectFile

};