'use strict';

var express = require('express');
var log = require('../util/log');

var Dash = require('../../../../lib/dashpay-lib');
var DashDrive = require('../dashdrive/dashdrive');

// public (anonymous) routes
module.exports = function (app) {

    var publicRouter = express.Router();
    app.use('/api/v1/public', publicRouter);

    // spv
    publicRouter.get('/spv', function (req, res){
        // Browser-SPV methods here
        res.sendStatus(404);
    });

    //insight API
    publicRouter.get('/insight', function (req, res){
        // Insight API here
        res.sendStatus(404);
    });

    // get all users
    publicRouter.get('/users', function (req, res) {
        /*User.find({}, function (err, users) {
            res.json(users);
        });*/
    });
};