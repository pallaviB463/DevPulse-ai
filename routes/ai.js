const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({

        service: "AI",

        status: "Ready"

    });

});

module.exports = router;