'use strict';

var marionette = require('backbone.marionette');

module.exports = marionette.ItemView.extend({
    template:require('./RegisterView.html'),
    ui: {
        username: 'input[name=username]',
        password: 'input[name=password]',
        comfirmPassword: 'input[name=passwordconfirmation]'
    },
    events: { 
        'click #signupBtn': 'register'
    },
    register: function() {
        if (!this.ui.username.val() || !this.ui.password.val() || !this.ui.comfirmPassword.val()) {
            alert('Enter a username and password');
        } 
        //do register here!
    }
});