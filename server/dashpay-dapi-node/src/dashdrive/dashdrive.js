'use strict';

var log = require('../util/log');

var Dash = require('../../../../lib/dashpay-lib');
var DashDrive = require('./db/dashdrive-db');           // use a DB to simulate DashDrive
//var DashDrive = require('./core/dashdrive-core');     // use core DashDrive (once it's built)

// DashDrive data access
module.exports = function() {

    var drive = new DashDrive();

    // fetch a user
    this.GetUser = function(uname, err) {
        drive.GetUser(uname, err);
    };

    // add a new user (signup)
    this.AddUser = function(uname, ukey, err) {
        drive.AddUser(uname, ukey, err);
    };

    // add a new user fund account
    this.AddAccount = function(uname, accName, accAddress, err) {
        drive.AddAccount(uname, accName, accAddress, err);
    };

    // get a user's fund accounts
    this.GetUserAccounts = function (uname, err) {
        drive.GetUserAccounts(uname, err);
    }
};