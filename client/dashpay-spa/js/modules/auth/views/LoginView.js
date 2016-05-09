'use strict';

var marionette = require('backbone');
var $= require('jquery');

var wallet = require('../../../../../../lib/dashpay-wallet-client');

module.exports = marionette.ItemView.extend({
    template: require('./LoginView.html'),
    ui: {
        username: 'input[name=username]',
        password: 'input[name=password]'
    },
    events: { 
        'click #loginBtn': 'login'
    },
    login: function() {
        if (!this.ui.username.val() || !this.ui.password.val()) {
            alert('Enter a username and password');
        } else {
            wallet.Login(this.ui.username.val(), this.ui.password.val(),
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
    }
});
