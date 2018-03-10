var express = require('express');
var router = express.Router();

function insertLog(newLog, db, res) {
    db.collection('logs').insertOne(newLog, function(err, doc) {
        if (!err) {
            res.status(201).end();
        }
    });
}

router.post("/", function(req, res) {
    var newData = req.body;
    var db = req.db;
    db.collection('datas').find({}).toArray(function(err, docs) {
        if (!err) {
            var newLog = {
                'currentValue': newData.data,
                'date': Date.now()
            };
            if (!docs.length) {
                db.collection('datas').insertOne(newData, function(err, doc) {
                    if (!err) {
                        insertLog(newLog, db, res);
                    }
                });
            } else {
                db.collection('datas').updateOne({
                    _id: docs[0]._id
                }, newData, function(err, doc) {
                    if (!err) {
                        insertLog(newLog, db, res);
                    }
                });
            }
        }
    });
});

module.exports = router;