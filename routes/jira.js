const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({

        service: "Jira",

        status: "Coming Soon"

    });

});

module.exports = router;