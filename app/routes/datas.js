var express = require('express');
var router = express.Router();
var firebaseService = require('../services/firebaseService');

router.post("/", firebaseService.updateData);

module.exports = router;