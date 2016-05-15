'use strict';

var marionette = require('backbone.marionette'),
    AccountsCompositeView = require('./views/AccountsCompositeView'),
  AccountCollection = require('./models/AccountCollection'),
    channel = require('../../channel');

module.exports = marionette.AppRouter.extend({
    routes : {
        "accounts":"accounts"
    },
    accounts:function(){
        channel.command('ui:show-view',new AccountsCompositeView({
            collection:new AccountCollection()
        }));
    }
});
