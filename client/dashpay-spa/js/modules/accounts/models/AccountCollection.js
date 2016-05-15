'use strict';

var backbone = require('backbone'),
accountModel = require('./Account');

module.exports = backbone.Collection.extend({
    model:accountModel
});
