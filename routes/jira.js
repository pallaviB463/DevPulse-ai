const express = require("express");

const router = express.Router();

const { getMyProfile } = require("../services/jira/jiraService");

router.get("/profile", async (req, res) => {
    try {
        const profile = await getMyProfile();

        res.json(profile);
    } catch (err) {
        console.error("Jira profile request failed:", err.response?.data || err.message);

        res.status(500).json({
            error: "Unable to contact Jira"
        });
    }
});

module.exports = router;