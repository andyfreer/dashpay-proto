'use strict';


var Radio = require('backbone.radio');
var Backbone = require('backbone');

var channel = module.exports = Radio.channel('app-channel');

channel.comply('navigate', function (fragment, options) {
  Backbone.history.navigate(fragment, options);
});