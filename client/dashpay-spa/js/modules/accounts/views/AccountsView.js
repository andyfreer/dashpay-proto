'use strict';

var marionette = require('backbone.marionette');
var $= require('jquery');

var wallet = require('../../../../../../lib/dashpay-wallet-client');

module.exports = marionette.ItemView.extend({
    template: require('./AccountsView.html')
});
