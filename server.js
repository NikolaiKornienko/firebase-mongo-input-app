var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect("mongodb://localhost/mongoFirebaseTest", function(err, database) {
    if (err) {
        return console.log("Connection to DB failed");
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(5000, function() {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({
        "error": message
    });
}

app.get("/logs", function(req, res) {
    db.collection('logs').find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get logs.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.post("/datas", function(req, res) {
    var newData = req.body;
    db.collection('datas').find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get data.");
        } else {
            var newLog = {
                'currentValue': newData.data,
                'date': Date.now()
            };
            if (!docs.length) {
                db.collection('datas').insertOne(newData, function(err, doc) {
                    if (err) {
                        handleError(res, err.message, "Failed to update data");
                    } else {
                        db.collection('logs').insertOne(newLog, function(err, doc) {
                            if (err) {
                                handleError(res, err.message, "Failed to create new log.");
                            } else {
                                res.status(201).end()
                            }
                        });
                    }
                });
            } else {
                db.collection('datas').updateOne({
                    _id: docs[0]._id
                }, newData, function(err, doc) {
                    if (err) {
                        handleError(res, err.message, "Failed to update data");
                    } else {
                        db.collection('logs').insertOne(newLog, function(err, doc) {
                            if (err) {
                                handleError(res, err.message, "Failed to create new log.");
                            } else {
                                res.status(201).end();
                            }
                        });
                    }
                });
            }
        }
    });
});