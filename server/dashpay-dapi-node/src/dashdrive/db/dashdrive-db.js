'use strict';

var log = require('../../util/log');

var Dash = require('../../../../../lib/dashpay-lib');
var User = require('./models/user');
var Account = require('./models/account');
var ContactLocal = require('./models/contactLocal');
var ContactForeign = require('./models/contactForeign');

// DashDrive implementation on MongoDB..
module.exports = function() {

    this.GetUser = function (uname, callback) {

        console.log('DashDrive: GetUser(' + uname +')');

        User.findOne({ uname: uname }, function(err, user) {
            if (err) {
                callback(err);
            }
            callback(null, user);
        });
    };

    this.AddUser = function(uname, ukey, err) {

        // create the user
        var newUser = new User({
            uname: uname,
            ukey: ukey
        });

        // add the user to the db
        newUser.save(err);
    };

    this.AddAccount = function(uname, accName, accAddr, err) {

        // create the user
        var newAcc = new Account({
            uname: uname,
            accName: accName,
            accAddr: accAddr,
        });

        // add the account to the db
        newAcc.save(err);
    };

    this.GetUserAccounts = function(uname, callback) {

        Account.find({
            'uname': uname
        }, function(err, accounts) {
            if (err) {
                //onErr(err, callback);
            } else {
                //mongoose.connection.close();
                console.log(accounts);
                callback("", accounts);
            }
        });
    };
};