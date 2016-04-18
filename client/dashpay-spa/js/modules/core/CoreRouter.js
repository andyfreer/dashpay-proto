'use strict';

var marionette = require('backbone.marionette');

module.exports = marionette.AppRouter.extend({
routes : {
    "" : 'index'
  },
    index: function() {
  alert('index called');
      channel.command('ui:show-view', new HomeView());
      channel.command('reset-title');
    }
});