var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var mongodb = require("mongodb");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

var logs = require('./routes/logs');
var datas = require('./routes/datas');

var db;

mongodb.MongoClient.connect("mongodb://localhost/mongoFirebaseTest", function(err, database) {
    if (err) {
        return console.log("Connection to DB failed");
    }

    db = database;
    console.log("Database connection ready");

    var server = app.listen(5000, function() {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/logs', logs);
app.use('/datas', datas);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});