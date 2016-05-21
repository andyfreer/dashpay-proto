'use strict';

var express = require('express');
var log = require('../util/log');

var Dash = require('../../../../lib/dashpay-lib');
var DashDrive = require('../dashdrive/dashdrive');

// DAuth middleware, will be used to support secure sessions in auth routers
module.exports = function (req, res, next) {

    var uname = req.body.uname;

    // get the user's pubkey from DashDrive to verify the sig
    var ukey = '';
    var drive = new DashDrive();
    var userDashDriveKey = drive.GetUser(uname, function(err, doc) {
        if (doc) {
            ukey = doc.ukey;
            var headersObj = req.headers;
            var dataObj = req.body;

            // for debugging some dauth info
            log.info(req.baseUrl + ': DAuth uname = ['+ uname + ': ukey = ['+ ukey +']');
            log.info(req.baseUrl + ': DAuth Header = ['+ headersObj['x-dauth-sig-header'] + ']');
            log.info(req.baseUrl + ': DAuth Data = ['+ JSON.stringify(dataObj) + ']');

            // this is just basic
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
};
