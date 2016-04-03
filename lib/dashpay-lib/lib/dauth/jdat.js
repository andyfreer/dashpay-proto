'use strict';

var core = require('bitcore-lib-dash');
var Message = require('bitcore-message-dash');
var ECIES = require('bitcore-ecies-dash');

// NOTE: this isn't used yet, will be next DAuth ver...

/*
 *  =======================================================
 *  JSON D-Auth Token (JDAT)
 *  =======================================================
 *
 *  Compact JSON token used to establish secure messaging
 *  channels within the D-Auth messaging protocol.
 *
 *  ..based on RFC:
 *  http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html
 *  http://self-issued.info/docs/draft-ietf-jose-json-web-signature.html
 *
 *  ..based on code:
 *  https://github.com/auth0/node-jsonwebtoken
 *  https://github.com/brianloveswords/node-jws
 *
 *  =======================================================
 */

var JDAT = module.exports;

/*
 *  JDAT offer request
 *  returns a request for a secure authentication channel,
 *  encrypted for the recipient, and signed by the sender.
 *  It requires prior knowledge of the sender and recipient's
 *  network ID and the private and public keys of each, respectively.
 */
JDAT.offer = function (senderID, senderPrvKey, recipPubKey) {

    // seq challenge



};

/*  JDAT offer response
 *  returns a response to a JDAT offer
 */
JDAT.accept = function (senderID, senderPrvKey, recipPubKey) {



};


JDAT.sign = function(payload, prvKey, options, callback) {
    options = options || {};
    var header = {};

    // TODO: timestamp, notbefore, expiry, options, encoding, async/callback

    //return jws.sign({header: header, payload: payload, secret: secretOrPrivateKey, encoding: encoding});

    // sign the data with the user's private UserKey
    var sig = Message(JSON.stringify(data)).sign(ukeyPrv);

    var headers = {
        'x-dauth-sig-header': sig
    };
    return headers;

};

JDAT.verify = function(jdtString, pubKey, options, callback) {
    options = options || {};
    var header = {};

    // TODO: timestamp, notbefore, expiry, options, encoding, async/callback

    //return jws.sign({header: header, payload: payload, secret: secretOrPrivateKey, encoding: encoding});

    var address = new core.PublicKey(pubKey).toAddress();
    var sig = headers['x-dauth-sig-header'];
    var msg = JSON.stringify(data);

    // test an auth fail by changing the msg...
    //msg += '0';

    // verify the data was signed by the user's pub key
    return Message(msg).verify(address, sig);

};