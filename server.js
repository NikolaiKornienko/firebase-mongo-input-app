var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoFirebaseTest');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

var logs = require('./app/routes/logs');
var datas = require('./app/routes/datas');

var server = app.listen(5000, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
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