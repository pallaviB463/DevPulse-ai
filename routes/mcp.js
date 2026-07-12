const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({

        service: "MCP",

        status: "Ready"

    });

});

module.exports = router;