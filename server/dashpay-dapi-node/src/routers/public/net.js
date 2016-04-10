'use strict';

var express = require('express');
var log = require('../../util/log');

var Dash = require('../../../../../lib/dashpay-lib');
var DashDrive = require('../../dashdrive/dashdrive');

// Network functions
module.exports = function (app) {

    // public router, doesn't require a user auth
    var netRouter = express.Router();
    app.use('/dapi/v1/net', netRouter);

    // get a user's quorum details
    netRouter.get('/node/quorum', function (req, res){
        res.sendStatus(418);
    });

    // lookup a masernode's details
    netRouter.get('/node/lookup', function (req, res){
        res.sendStatus(418);
    });
};
