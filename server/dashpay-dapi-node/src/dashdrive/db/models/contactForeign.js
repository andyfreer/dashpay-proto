'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// return the mongoose model..
module.exports = mongoose.model('ContactForeign', new Schema({
    uname: String,
    contact_uname: String,
    receive_addr: String
}));
