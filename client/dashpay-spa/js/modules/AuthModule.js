'use strict';

var marionette = require('backbone.marionette');
var AuthRouter = require('./auth/AuthRouter');

module.exports = marionette.Module.extend({
  initialize: function () {
   
    this.router = new AuthRouter();
  },
  onStart: function () {
    
  }
});