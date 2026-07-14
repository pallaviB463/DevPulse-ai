const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        healthy: true,
        timestamp: new Date()
        timestamp: new Date()
    });
});

module.exports = router;