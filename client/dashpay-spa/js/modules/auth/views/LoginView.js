'use strict';

var $ = require('jquery'),
    authModel = require('../../core/models/Auth'),
    BaseFormView = require('../../../shared/BaseFormView')

var wallet = require('../../../../../../lib/dashpay-wallet-client');

module.exports = BaseFormView.extend({
    template: require('./LoginView.html'),
    ui: {
        username: 'input[name=username]',
        password: 'input[name=password]',
        form: '#loginform'
    },
    events: {
        'click #loginBtn': 'login'
    },
    validationRules: {
        username: { 'required': true }, 
        password: { 'required': true }
    },
    login: function() {
        if (!this.ui.form.valid()) return;

        authModel.authorise(this.ui.username.val(), this.ui.password.val());
        return;
        wallet.Login(this.ui.username.val(), this.ui.password.val(),
            function(err, res) {
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

});
