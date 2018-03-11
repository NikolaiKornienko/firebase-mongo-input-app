var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    current_value: String,
    updated_at: Date
});

var Log = mongoose.model('Log', logSchema);

module.exports = Log;