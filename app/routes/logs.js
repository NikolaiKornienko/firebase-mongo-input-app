var express = require('express');
var router = express.Router();
var Log = require('../models/log');

router.get("/", function(req, res) {
    Log.find({}, function(err, logs) {
        if (err) throw err;

        res.status(200).json(logs);
    });
});

module.exports = router;