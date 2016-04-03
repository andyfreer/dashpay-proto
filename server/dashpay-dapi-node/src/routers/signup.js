'use strict';

var express = require('express');
var log = require('../util/log');

var Dash = require('../../../../lib/dashpay-lib');
var DashDrive = require('../dashdrive/dashdrive');

// signup router
module.exports = function (app) {

    var signupRouter = express.Router();
    app.use('/api/v1/signup', signupRouter);

    signupRouter.use(function (req, res, next) {

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

    // user signup
    signupRouter.post('/user', function(req,res, next) {

        var drive = new DashDrive();

        // add the user to Dash Drive
        drive.AddUser(req.body.uname, req.body.ukey, function(err) {
            if (err) {
                log.info('User signup: Error: ' + err['msg']);
                res.json({ status: 402 });
            } else {
                log.info('User signup: Success');
                res.json({ status: 200, res: true});
            }
        });
    });
};