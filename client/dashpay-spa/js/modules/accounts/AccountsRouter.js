'use strict';

var marionette = require('backbone.marionette'),
    accountsView = require('./views/AccountsView'),
    channel = require('../../channel');

module.exports = marionette.AppRouter.extend({
    routes : {
        "accounts":"accounts"
    },
    accounts:function(){
        channel.command('ui:show-view',new accountsView());
    }
});
