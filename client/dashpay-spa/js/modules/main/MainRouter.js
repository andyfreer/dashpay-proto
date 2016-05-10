'use strict';

var marionette = require('backbone.marionette'),
    homeView = require('./views/HomeView'),
    accountsView = require('./views/AccountsView'),
    channel = require('../../channel');

module.exports = marionette.AppRouter.extend({
    routes : {
        "home" : 'home',
        "accounts":"accounts"
    },
    home : function() {
        channel.command('ui:show-view',new homeView());
    },
    accounts:function(){
        channel.command('ui:show-view',new accountsView());
    }
});
