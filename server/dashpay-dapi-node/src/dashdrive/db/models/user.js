'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// return the mongoose model..
module.exports = mongoose.model('User', new Schema({
    uname: String,
    ukey: String
}));
