'use strict';

var $ = require('jquery'),
    authModel = require('../../core/models/Auth'),
    BaseFormView = require('../../../shared/BaseFormView')

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
    }
});