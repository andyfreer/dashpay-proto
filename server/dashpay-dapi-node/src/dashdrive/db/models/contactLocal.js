'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// return the mongoose model..
module.exports = mongoose.model('ContactLocal', new Schema({
    uname: String,
    contact_uname: String,
    pay_addr: String
}));
