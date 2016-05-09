'use strict';

var marionette = require('backbone.marionette');

module.exports = marionette.ItemView.extend({

    template: require('./LoginView.html'),
    events: { 'click #btn-login' : 'attemptLogin'},
    onRender: function() {
        alert('test');
    },
    attempLogin: function() {
        alert('Login clicked');
    }
});