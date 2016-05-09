'use strict';

var bitcore = require('bitcore-lib-dash');
var ECIES = require('bitcore-ecies-dash');
var mnemonic = require('bitcore-mnemonic-dash');
var Buffer = require('buffer-browserify').Buffer;
var reqwest = require('reqwest');
var Dash = require('../index.js');

// xhr network functions using Reqwest https://github.com/ded/reqwest
module.exports = {

    dapiGet: function (path, errCb, resCb) {

        reqwest({
            url: Dash.lib.config.dapiURL + ':' + Dash.lib.config.dapiPort + '/' + path
            , type: 'json'
            , method: 'get'
            , data: {}
            , contentType: 'application/json'
            , headers: {
            }
            , error: function (err) {
                errCb(err);
            }
            , success: function (resp) {
                resCb(resp);
            }
        });
    },

    dapiPost: function (path, data, headers, errCb, resCb) {
        console.log('DAPI Post: Data[' + JSON.stringify(data) + ']');
        var opts = {
            url: Dash.lib.config.dapiURL + ':' + Dash.lib.config.dapiPort + '/' + path
            , type: 'json'
            , method: 'post'
            , data: data
            //, contentType: 'application/json'
            , headers: headers
            , error: function (err) {
                errCb(err);
            }
            , success: function (resp) {
                resCb(resp);
            }
        };
        reqwest(opts);
    }
};