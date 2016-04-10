'use strict';

var express = require('express');
var log = require('../../util/log');

var Dash = require('../../../../../lib/dashpay-lib');
var DashDrive = require('../../dashdrive/dashdrive');
var DAuth = require('../../dauth/dauth');

// App methods
module.exports = function (app) {

    var appRouter = express.Router();
    app.use('/dapi/v1/app/', appRouter);

    // Use DAuth to authenticate all requests
    appRouter.use(DAuth);

    // create an app
    appRouter.get('/create', function (req, res){
        res.sendStatus(418);
    });

    // search all apps
    appRouter.get('/search', function (req, res){
        res.sendStatus(418);
    });

    // get an app's details
    appRouter.get('/details', function (req, res){
        res.sendStatus(418);
    });

    // update an app's details
    appRouter.get('/update', function (req, res){
        res.sendStatus(418);
    });

    // send a request to a user to authorize an app
    appRouter.get('/user/add', function (req, res){
        res.sendStatus(418);
    });

    // user authorizes an app
    appRouter.get('/app/grant', function (req, res){
        res.sendStatus(418);
    });

    // let's a user rate an app they have used
    appRouter.get('/rate', function (req, res){
        res.sendStatus(418);
    });

    // raise a charge to a user from an app
    appRouter.get('/charge', function (req, res){
        res.sendStatus(418);
    });
};
