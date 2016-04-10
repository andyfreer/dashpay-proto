'use strict';

var express = require('express');
var log = require('../../util/log');

var Dash = require('../../../../../lib/dashpay-lib');
var DashDrive = require('../../dashdrive/dashdrive');

// SPV methods
module.exports = function (app) {

    // public router, doesn't require a user auth
    var spvRouter = express.Router();
    app.use('/dapi/v1/spv', spvRouter);

    spvRouter.get('/somecall', function (req, res){
        res.sendStatus(418);
    });
};
