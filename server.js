require("dotenv").config();
const express = require("express");

const aiRoute = require("./routes/ai");
const githubRoute = require("./routes/github");
const healthRoute = require("./routes/health");
const mcpRoute = require("./routes/mcp");
const jiraRoutes = require("./routes/jira");

const app = express();

app.use(express.json());
app.use("/health", healthRoute);
app.use("/github", githubRoute);
app.use("/jira", jiraRoutes);
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
    console.info(`Express server listening on http://localhost:${PORT}`);

});