require("dotenv").config();
const healthRoute = require("./routes/health");
const express = require("express");
const githubRoute = require("./routes/github");
const jiraRoute = require("./routes/jira");
const aiRoute = require("./routes/ai");
const mcpRoute = require("./routes/mcp");

const app = express();

app.use(express.json());
app.use("/health", healthRoute);
app.use("/github", githubRoute);
app.use("/jira", jiraRoute);
app.use("/ai", aiRoute);
app.use("/mcp", mcpRoute);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {

    res.json({

        service: "DevPulse AI",

        status: "Running",

        version: "1.0"

    });

});

app.listen(PORT, () => {

    console.log("================================");
    console.log(`🌐 Express Server Running`);
    console.log(`http://localhost:${PORT}`);
    console.log("================================");

});