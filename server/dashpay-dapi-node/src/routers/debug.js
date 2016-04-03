'use strict';

var express = require('express');
var log = require('../util/log');

var Dash = require('../../../../lib/dashpay-lib');
var DashDrive = require('../dashdrive/dashdrive');

// some debug helper functions for prototype phase..
module.exports = function (app) {

    var debugRouter = express.Router();
    app.use('/api/v1/debug', debugRouter);

    // get all users in Dash Drive
    debugRouter.get('/users', function (req, res) {

    });
};