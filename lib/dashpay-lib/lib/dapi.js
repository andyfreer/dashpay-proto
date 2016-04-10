'use strict';

var bitcore = require('bitcore-lib-dash');
var ECIES = require('bitcore-ecies-dash');
var mnemonic = require('bitcore-mnemonic-dash');
var Buffer = require('buffer-browserify').Buffer;

// handles low level calls to D-API from a client
module.exports = {

    signup : function (uname, ukey, callback) {

        // Build the request
        var path = 'dapi/v1/signup/user';
        var data = { uname: uname, ukey: ukey.pub};

        // Sign the request data
        var headers = Dash.lib.dauth.genAuthHeaders(ukey.prv, data);

        Dash.lib.net.dapiPost(
            path,
            data,
            headers,
            function (err) {
                callback(err, null);
            },
            function (res) {
                callback(null, res);
            }
        );
    },

    login : function (uname, ukey, callback) {

        // Build the request
        var path = 'dapi/v1/login/offer';
        var data = { uname: uname, ukey: ukey.pub};

        // Sign the request
        var headers = Dash.lib.dauth.genAuthHeaders(ukey.prv, data);

        Dash.lib.net.dapiPost(
            path,
            data,
            headers,
            function (err) {
                callback(err, null);
            },
            function (res) {
                ratify(uname, ukey, callback);
            }
        );

        // internally perform the second stage of DAuth login
        // TODO: exchange HD seeds and mutually auth the MN
        var ratify = function(uname, ukey, callback) {

            // Build the request
            var path = 'dapi/v1/login/ratify';
            var data = { uname: uname, ukey: ukey.pub};

            // Sign the request data
            var headers = Dash.lib.dauth.genAuthHeaders(ukey.prv, data);

            Dash.lib.net.dapiPost(
                path,
                data,
                headers,
                function (err) {
                    callback(err, null);
                },
                function (res) {
                    //
                    callback(null, res);
                }
            );
        };
    },

    createAccount : function (UserToken, accName, accAddr, callback) {
        // Build the request
        var path = 'dapi/v1/user/account/create';
        var data = {
            uname: UserToken.uname,
            ukey: UserToken.ukey.pub,
            accName: accName,
            accAddr: accAddr
        };

        // Sign the request data
        var headers = Dash.lib.dauth.genAuthHeaders(UserToken.ukey.prv, data);

        Dash.lib.net.dapiPost(
            path,
            data,
            headers,
            function (err) {
                callback(err, null);
            },
            function (res) {
                callback(null, res);
            }
        );
    },

    getAccounts : function (UserToken, callback) {

        // Build the request
        var path = 'dapi/v1/user/accounts/get';
        var data = {
            uname: UserToken.uname,
            ukey: UserToken.ukey.pub
        };

        // Sign the request data
        var headers = Dash.lib.dauth.genAuthHeaders(UserToken.ukey.prv, data);

        Dash.lib.net.dapiPost(
            path,
            data,
            headers,
            function (err) {
                callback(err, null);
            },
            function (res) {

                // masively slow and lazy way to decrypt the dashdrive data...
                for(var i = 0; i < res.res.length; i++) {
                    var obj = res.res[i];

                    obj.accName = Dash.lib.keys.decryptSelf(obj.accName, UserToken.ukey);

                    console.log('decrypted account name:' + obj.accName);
                }
               callback(null, res);
            }
        );
    },

    addContact : function () {

    },

    acceptContact : function () {

    },

    getContacts : function () {

    },

    getUsers : function () {

        Dash.lib.net.testGetUsers(
            function (err) {
                callback(err, null);
            },
            function (res) {
                callback(null, res);
            }
        );
    }
};