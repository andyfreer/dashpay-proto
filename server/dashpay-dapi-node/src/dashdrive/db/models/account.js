
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// return the mongoose model..
module.exports = mongoose.model('Account', new Schema({
    uname: String,
    accName: String,
    accAddr: String
}));
