'use strict';

var core = require('bitcore-lib-dash');
var ECIES = require('bitcore-ecies-dash');
var mnemonic = require('bitcore-mnemonic-dash');
var Dash = require('../index.js');

// TODO: massive amount of error checking & validation & edge cases
// TODO: 'ukey' aka UserKey structure/usage needs standardizing across libs/functions
module.exports = {

    // generates a UserKey pub/pri pair from a SHA256 hash (brain-wallet password)
    // UserKey is used to authenticate users and not for funds.
    genUserKey : function (uname, upwd) {

        // TODO: salt using a question or PIN..
        var buf = new Buffer(uname + upwd); //  basic for now
        var hash = core.crypto.Hash.sha256(buf);
        var bn = core.crypto.BN.fromBuffer(hash);
        var priKey = new core.PrivateKey(bn);
        var pubKey = priKey.toPublicKey();
        return { pub: pubKey.toString(), prv: priKey };
    },

    // gen an account key from a mnemonic
    genAccKeyFromMnemonic : function (accPassphrase) {
        var isValid = Dash.lib.core.mnemonic.isValid(accPassphrase);
        console.log('Mnemonic isValid [' + isValid + ']');
        var code = new Dash.lib.core.mnemonic(accPassphrase);
        var xpriv = code.toHDPrivateKey();
        var xpub = xpriv.hdPublicKey;
        console.log('Gen key [' + xpub + '] from mnemonic [' + accPassphrase + ']');
        return xpub;
    },

    genMnemonic : function () {
        var code = new Dash.lib.core.mnemonic();
        return code.toString();
    },

    // encrypt using hex
    encryptSelf : function (data, ukey) {
        console.log('ukey for enc:' + ukey + ' JSON:' + JSON.stringify(ukey));
        var buff = new Buffer(data);
        var prvKey = new Dash.lib.core.PrivateKey(ukey.prv.toString());
        var pubKey = prvKey.publicKey;

        // Encrypt data
        var cypher1 = ECIES().privateKey(prvKey).publicKey(pubKey);
        var encrypted = cypher1.encrypt(buff);
        var encHex = Dash.lib.core.util.buffer.bufferToHex(encrypted);
        //console.log('Encrypted data:' + encHex);
        return encHex;
    },

    // decrypt using hex
    decryptSelf : function (encData, ukey) {
        //var buff = new Buffer(encData);
        var buff = Dash.lib.core.util.buffer.hexToBuffer(encData);
        var prvKey = new Dash.lib.core.PrivateKey(ukey.prv.toString());
        var pubKey = prvKey.publicKey;
        var cypher2 = ECIES().privateKey(prvKey).publicKey(pubKey);
        // decrypt data
        var decrypted = cypher2.decrypt(buff);
        return decrypted;
    },

     testECIES : function () {

        var alicePrivateKey = core.PrivateKey();
        var bobPrivateKey = core.PrivateKey();

        var alicePublicKey = alicePrivateKey.publicKey;
        var bobPublicKey = bobPrivateKey.publicKey;
        var data = new Buffer('Hello DashNation!');

        // Encrypt data
        var cypher1 = ECIES().privateKey(alicePrivateKey).publicKey(bobPublicKey);
        var encrypted = cypher1.encrypt(data);

        // Decrypt data
        var cypher2 = ECIES().privateKey(bobPrivateKey).publicKey(alicePublicKey);
        var decrypted = cypher2.decrypt(encrypted);

        console.log('alicePrivateKey', JSON.stringify(alicePrivateKey));
        console.log('bobPrivateKey', JSON.stringify(bobPrivateKey));
        console.log('alicePublicKey', JSON.stringify(alicePublicKey.toAddress()));
        console.log('bobPublicKey', JSON.stringify(bobPublicKey));
        console.log('data', data.toString());
        console.log('cypher1', cypher1);
        console.log('encrypted', encrypted.toString());
        console.log('cypher2', cypher2);
        console.log('decrypted', decrypted.toString());
        console.log(data.toString(), decrypted.toString());
    }
};