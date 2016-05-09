'use strict';

var marionette = require('backbone.marionette');
var $= require('jquery');
module.exports = marionette.ItemView.extend({

    template: require('./LoginView.html'),
    //template: '<div><button class="btn btn-success input-submitbtn" type="button" id="btn-login">Login </button></div>',

    events: { 'click #btn-login' : 'attemptLogin'},

    onRender: function() {
        console.log('loginView onRender');

        /*
        $('#btn-login').on('click',function(){
            alert('Login clicked2');
        });
        */

        // just a test of login code ported from the dashpay-wallet-html client...
        var uname = 'andy'; //$('#inp-login-uname').val();
        var upwd = '123456'; //$('#inp-login-pwd').val();

        // validate
        if (!uname || !upwd) {
            //showAlertMsg('Enter a username and password', alertMsg, true);
        } else {
            wallet.Login(uname, upwd,
                function (err, res) {
                    if (err) {
                        console.log('Response Error: ' + err);
                        //showAlertMsg("Error: Couldn't connect", alertMsg, true);
                    } else {
                        console.log('Response: ' + JSON.stringify(res));
                        if (res.status === 404) {
                            //showAlertMsg('User not found', alertMsg, true);
                        } else if (res.status === 401) {
                            //showAlertMsg('The password is incorrect', alertMsg, true);
                        } else if (res.status !== 200) {
                            //showAlertMsg('Masternode error.  Please try again.', alertMsg, true);
                        } else {
                            // Status 200 - don't do anything here because the wallet sdk will callback with login result
                        }
                    }
                }
            );
        }
    },
    attempLogin: function() {
        alert('Login clicked');
    }
});