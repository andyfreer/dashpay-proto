'use strict';

var DashPay = module.exports;

DashPay.lib = {};
DashPay.lib.keys = require('./lib/keys');
DashPay.lib.net = require('./lib/net');
DashPay.lib.dapi = require('./lib/dapi');
DashPay.lib.dauth = require('./lib/dauth/dauth');
DashPay.lib.dauth.jdat = require('./lib/dauth/jdat');
DashPay.lib.dauth.pool = require('./lib/dauth/pool');
DashPay.lib.config = require('./lib/config');
DashPay.lib.core = require('bitcore-lib-dash');
DashPay.lib.core.mnemonic = require('bitcore-mnemonic-dash');
DashPay.lib.core.message = require('bitcore-message-dash');