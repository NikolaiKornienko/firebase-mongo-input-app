var admin = require("firebase-admin");
var serviceAccount = require('../key');
var dataController = require('../controllers/dataController');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://test-mongo-firebase.firebaseio.com'
});

var ref = admin.database().ref();
ref.on('child_changed', (snapshot) => {
    dataController.updateData(snapshot.val());
});

let updateData = function(req, res) {
    var value = req.body.data;
    ref.update({ data: value });
    res.send('data updated');
};

module.exports = {
    updateData : updateData
};