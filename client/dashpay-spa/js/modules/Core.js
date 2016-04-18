'use strict';

var marionette = require('backbone.marionette');
var AppLayout = require('./core/views/AppLayout');
var CoreRouter = require('./core/CoreRouter');

module.exports = marionette.Module.extend({
  initialize: function () {
      alert('module');
    this.appLayout = new AppLayout();
    this.router = new CoreRouter();
  },
  onStart: function () {
    this.appLayout.render();
  }
});