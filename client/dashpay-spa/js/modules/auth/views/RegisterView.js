'use strict';

var marionette = require('backbone.marionette'),
BaseFormView = require('../../../shared/BaseFormView')

module.exports = BaseFormView.extend({
    template: require('./RegisterView.html'),
    ui: {
        username: 'input[name=username]',
        password: 'input[name=password]',
        comfirmPassword: 'input[name=passwordconfirmation]',
        form: '#signupform'
    },
    events: {
        'click #signupBtn': 'register'
    },
    validationRules: {
        username: { 'required': true }, password: { 'required': true }
    },
    register: function() {
        if (!this.ui.form.valid()) return;
        //do register here!
    }
});