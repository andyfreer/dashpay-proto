'use strict';

var Dash = require('../../dashpay-lib');

// Wallet client
module.exports = function () {

    // pool for D-API endpoints
    var pool = new Dash.lib.dauth.pool();

    // DashPay Masternode Discovery..
    // (hardcoded to the dev masternode for now)
    pool.addEndpoint('devnode1', '127.0.0.1', '123');

    // token for local session store of user login credentials
    var UserToken = {};

    var states = {
        OFFLINE: 0,
        MOD: 1,
        ADMIN: 2
    };

    // observer hooks
    var listeners = [];

    // events ----------------------------------
    this.subscribe = function(callback) {
        listeners.push(callback);
    };

    this.unsubscribe = function(callback) {
        listeners = listeners.filter(
            function(listener) {
                if (listener !== callback) {
                    return listener;
                }
            }
        );
    };

    this.Signup = function(uname, upwd, callback) {

        // TODO: validate the params

        // generate a brain-wallet keypair from the password..
        var ukey = Dash.lib.keys.genUserKey(uname, upwd);
        if (!ukey) {
            console.log('Error creating UserKey');
            return;
        }

        // call DAPI
        Dash.lib.dapi.signup(uname, ukey, callback);
    };

    this.Login = function(uname, upwd, callback) {

        // generate a brain-wallet keypair from the password..
        var ukey = Dash.lib.keys.genUserKey(uname, upwd);
        if (!ukey) {
            console.log('Error creating UserKey');
            return;
        }

        // call DAPI
        console.log('login');
        Dash.lib.dapi.login(uname, ukey, function (err, res) {

            // set wallet state to logged in
            if (res) {
                if (res.status === 200) {

                    // store the login auth for future request in this session
                    UserToken.uname = uname;
                    UserToken.upwd = upwd;
                    UserToken.ukey = ukey;
                    UserToken.serverNonce = 1;

                    onUpdate(1);
                }
            }
            callback(err, res);
        });
    };

    this.createAccount = function(accName, accPassphrase, callback) {

        // get the HD pub key from the mnemonic
        var xpub = Dash.lib.keys.genAccKeyFromMnemonic(accPassphrase, UserToken.ukey);

        // encrypt acc name / pub key with ECIES for DashDrive...
        // TODO: combine these
        var encPubkey = Dash.lib.keys.encryptSelf(xpub.toString(), UserToken.ukey);
        var encAccName = Dash.lib.keys.encryptSelf(accName, UserToken.ukey);


        var decPubKey = Dash.lib.keys.decryptSelf(encPubkey, UserToken.ukey);
        var decAccName = Dash.lib.keys.decryptSelf(encAccName, UserToken.ukey);

        console.log('AccName encrypted: [' + encAccName + '] decrypted: [' + decAccName + ']');
        console.log('AccKey encrypted: [' + encPubkey + '] decrypted: [' + decPubKey + ']');

        // send it to DAPI
        Dash.lib.dapi.createAccount(UserToken, encAccName, encPubkey, function (err, res) {

            if (res) {
                if (res.status === 200) {
                }
            }
            callback(err, res);
        });
    };

    this.getAccounts = function(callback) {

        Dash.lib.dapi.getAccounts(UserToken, function (err, res) {
            callback(err, res);
        });
    };

    this.Logout = function() {
        onUpdate(0);
    };

    // fire an event
    var onUpdate = function(obj, scope) {
        listeners.forEach(function(listener) {
            listener.call(scope, obj);
        });
    };

    // timer state update check ------------------------------
    var fixedUpdate = function () {
        //var s = _walID + '  -  ' + new Date().toLocaleTimeString();
        //onUpdate('wal: ' + s, this);    // testing
    };
    var _timer = setInterval(fixedUpdate, 5000);
};