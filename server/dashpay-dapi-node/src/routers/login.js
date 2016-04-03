'use strict';

var express = require('express');
var log = require('../util/log');

var Dash = require('../../../../lib/dashpay-lib');
var DashDrive = require('../dashdrive/dashdrive');

// Login router (authenticates a user to a secure session)
module.exports = function (app) {

    var loginRouter = express.Router();
    app.use('/api/v1/login', loginRouter);

    // DAuth the user's request
    loginRouter.use(function (req, res, next) {

        var uname = req.body.uname;

        // get the user's pubkey from DashDrive to verify the sig
        var ukey = '';
        var drive = new DashDrive();
        var userDashDriveKey = drive.GetUser(
            uname,
            function(err, doc) {

                if (doc) {
                    ukey = doc.ukey;
                    var headersObj = req.headers;
                    var dataObj = req.body;

                    // for debugging some dauth info
                    log.info(req.baseUrl + ': DAuth uname = ['+ uname + ': ukey = ['+ ukey +']');
                    log.info(req.baseUrl + ': DAauth Header = ['+ headersObj['x-dauth-sig-header'] + ']');
                    log.info(req.baseUrl + ': DAauth Data = ['+ JSON.stringify(dataObj) + ']');

                    if (Dash.lib.dauth.verifyAuthHeader(ukey, dataObj, headersObj)) {
                        log.info('DAuth verification: success');
                        next();
                    } else {
                        log.info('DAuth verification: failed, request terminated');
                        res.send({ status: 401, res: false});
                    }

                } else if (err) {
                    log.info('Get user: Error: ' + err);
                    res.send({ status: 500, res: false});
                } else {
                    log.info('Get user: Not found ');
                    res.send({ status: 404, res: false});
                }
            });
    });

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