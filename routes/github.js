const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {

    res.json({

        service: "GitHub",

        status: "Coming Soon"

    });

});

module.exports = router;