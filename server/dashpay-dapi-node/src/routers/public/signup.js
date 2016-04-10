'use strict';

var express = require('express');
var log = require('../../util/log');

var Dash = require('../../../../../lib/dashpay-lib');
var DashDrive = require('../../dashdrive/dashdrive');

// Signup router
module.exports = function (app) {

    // public router, doesn't require a user auth
    var signupRouter = express.Router();
    app.use('/dapi/v1/signup', signupRouter);

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
