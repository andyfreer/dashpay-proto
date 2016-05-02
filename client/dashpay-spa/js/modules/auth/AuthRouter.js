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
      channel.command('ui:show-view',new AuthLayoutView());
    console.log('register action route');
    
  },
  signIn:function(){
      channel.command('ui:show-view',new AuthLayoutView());
  }
});