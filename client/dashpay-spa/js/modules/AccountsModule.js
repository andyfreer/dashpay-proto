'use strict';

var marionette = require('backbone.marionette');
var AccountsRouter = require('./accounts/AccountsRouter');

module.exports = marionette.Module.extend({
    initialize: function () {

        this.router = new AccountsRouter();
    },
    onStart: function () {

    }
});
