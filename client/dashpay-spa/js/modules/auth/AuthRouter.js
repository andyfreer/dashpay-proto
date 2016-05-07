'use strict';

var marionette = require('backbone.marionette'),
registerView = require('./views/RegisterView'),
signInView = require('./views/LoginView'),
channel = require('../../channel');

module.exports = marionette.AppRouter.extend({
routes : {
    "register" : 'register',
    "signIn":"signIn"
  },
  register : function() { 
      channel.command('ui:show-view',new registerView());
  },
  signIn:function(){
      channel.command('ui:show-view',new signInView());
  }
});