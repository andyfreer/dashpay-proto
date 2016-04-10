'use strict';

var express = require('express');
var log = require('../../util/log');

var Dash = require('../../../../../lib/dashpay-lib');
var DashDrive = require('../../dashdrive/dashdrive');
var DAuth = require('../../dauth/dauth');

// Login router (authenticates a user to a secure session)
module.exports = function (app) {

    var loginRouter = express.Router();
    app.use('/dapi/v1/login', loginRouter);

    // Use DAuth to authenticate all requests
    loginRouter.use(DAuth);

    // user login
    loginRouter.post('/offer', function (req, res) {
        log.info('OFFER==========================');

        // if it got this far, DAuth (above) verified the client user's sig
        var uname = req.body.uname;
        var ukey = req.body.ukey;
        var headersObj = req.headers;
        var dataObj = req.body;

        // check pool
        // check message type
        var pool = new Dash.lib.dauth.pool();

        pool.store(uname, ukey);
        console.log(pool.fetch(uname));

        res.json({ status: 200, res: true});
    });

    // login
    loginRouter.post('/ratify', function (req, res) {
        log.info('RATIFY ==========================');

        // check pool

        // check message type
        var pool = new Dash.lib.dauth.pool();
        pool.store('ratify', 'ratified!');
        console.log(pool.fetch('ratify'));
        res.json({ status: 200, res: true});
    });
};
