var express = require('express');
var router = express.Router();

router.get("/", function(req, res) {
    var db = req.db;
    db.collection('logs').find({}).toArray(function(err, docs) {
        if (!err) {
            res.status(200).json(docs);
        }
    });
});

module.exports = router;