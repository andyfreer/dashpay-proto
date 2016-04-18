'use strict';

var marionette = require('backbone.marionette');
var AuthLayoutView = require('./views/AuthLayoutView');
var channel = require('../../channel');

module.exports = marionette.AppRouter.extend({
routes : {
    "register" : 'register',
    "signIn":"signIn"
  },
  register : function() {
    console.log('register action route');
    channel.command('show-ui',new AuthLayoutView());
  },
  signIn:function(){ console.log('sign in action route');}
});