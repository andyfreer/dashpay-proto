'use strict';

var express = require('express');
var log = require('../../util/log');

var Dash = require('../../../../../lib/dashpay-lib');
var DashDrive = require('../../dashdrive/dashdrive');
var DAuth = require('../../dauth/dauth');

// User router (for authenticated session routes)
module.exports = function (app) {

    var userRouter = express.Router();
    app.use('/dapi/v1/user/', userRouter);

    // Use DAuth to authenticate all requests
    userRouter.use(DAuth);

    //============================================
    // action methods
    // (result in commits to DashDrive)
    //============================================

    // create user account
    userRouter.post('/account/create', function(req,res, next) {

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

    // get all accounts for a user
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

    // update a user's profile
    userRouter.get('/update', function (req, res){
        res.sendStatus(418);
    });

    // change the user's password
    userRouter.get('/update/auth', function (req, res){
        res.sendStatus(418);
    });

    // send a contact request
    userRouter.get('/contact/add', function (req, res){
        res.sendStatus(418);
    });

    // authorize a contact request from another user
    userRouter.get('/contact/grant', function (req, res){
        res.sendStatus(418);
    });

    // send a message to a contact
    userRouter.get('/contact/msg', function (req, res){
        res.sendStatus(418);
    });

    // send a transaction description
    userRouter.get('/tx/send', function (req, res){
        res.sendStatus(418);
    });

    //============================================
    // query methods
    // (read-only calls, no writes to DashDrive)
    //============================================

    // get hashes for last time user data was updated
    userRouter.get('/lasthashes', function (req, res){
        res.sendStatus(418);
    });

    // get all a user's contacts
    userRouter.get('/contacts', function (req, res){
        res.sendStatus(418);
    });

    // get requests to connect for the user
    userRouter.get('/contacts/requests', function (req, res){
        res.sendStatus(418);
    });

    // get messages for the user
    userRouter.get('/messages', function (req, res){
        res.sendStatus(418);
    });

    // get the apps this user has authorized
    userRouter.get('/apps', function (req, res){
        res.sendStatus(418);
    });

    // get requests to authorize new apps
    userRouter.get('/apps/request', function (req, res){
        res.sendStatus(418);
    });

    // get the user's transactions
    userRouter.get('/tx', function (req, res){
        res.sendStatus(418);
    });

    // search for users to add
    userRouter.get('/search', function (req, res){
        res.sendStatus(418);
    });
};
