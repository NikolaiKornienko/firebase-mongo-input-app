var Log = require('../models/log');

var addLog = function(value) {
    var log = new Log({
        current_value: value,
        updated_at: Date.now()
    });
    return log.save();
};

module.exports = {
    addLog : addLog
};