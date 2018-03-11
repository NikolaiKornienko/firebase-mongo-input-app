var Data = require('../models/data');
var logController = require('./logController');

let updateData = function(value) {
    Data.find({}, function(err, datas) {
        if (err) throw err;

        if (!datas.length) {
            var data = Data({
                value: value
            });

            data.save(function(err) {
                if (err) throw err;

                logController.addLog(value).then(function() {

                });
            });
        } else {
            Data.findOneAndUpdate({ value: datas[0].value }, { value: value }, function(err, data) {
                if (err) throw err;

                logController.addLog(value);
            });
        }
    });
};

module.exports = {
    updateData : updateData
};