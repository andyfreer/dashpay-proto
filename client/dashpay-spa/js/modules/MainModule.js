'use strict';

var marionette = require('backbone.marionette');
var MainRouter = require('./main/MainRouter');

module.exports = marionette.Module.extend({
    initialize: function () {

        this.router = new MainRouter();
    },
    onStart: function () {

    }
});
