'use strict';

var marionette = require('backbone.marionette'),
channel = require('../../channel');
module.exports = marionette.AppRouter.extend({
routes : {
    "" : 'index'
  },
    index: function() {
     // channel.command('ui:show-view', new HomeView());
      //channel.command('reset-title');
    },
    execute:function(name){
         window.location = '#register'
    }
});