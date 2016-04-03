'use strict';

var express = require('express');
var log = require('../util/log');

var Dash = require('../../../../lib/dashpay-lib');
var DashDrive = require('../dashdrive/dashdrive');

// User router (for authenticated session routes)
module.exports = function (app) {

    var userRouter = express.Router();
    app.use('/api/v1/user', userRouter);

    userRouter.use(function (req, res, next) {

        // TODO: ukey needs to come from DashDrive and not the request
        var uname = req.body.uname;
        var ukey = req.body.ukey;
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
            res.sendStatus(401);
        }
    });

    // create user account
    userRouter.post('/accounts/create', function(req,res, next) {

        var drive = new DashDrive();

        // add the user to Dash Drive
        drive.AddAccount(
            req.body.uname,
            req.body.accName,
            req.body.accAddr,
            function(err) {
            if (err) {
                log.info('Get accounts: Error: ' + err['msg']);
                res.json({ status: 402 });
            } else {
                log.info('Get accounts: Success');
                res.json({ status: 200, res: true});
            }
        });
    });

    // create user account
    userRouter.post('/accounts/get', function(req,res, next) {

        var drive = new DashDrive();

        // add the user to Dash Drive
        drive.GetUserAccounts(
            req.body.uname,
            function(err, callback) {
                if (err) {
                    log.info('Add account: Error: ' + err['msg']);
                    res.json({ status: 402 });
                } else {
                    log.info('Add account: Success');
                    res.json({ status: 200, res: callback});
                }
            });
    });
};