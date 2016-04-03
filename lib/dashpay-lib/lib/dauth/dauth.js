'use strict';

var core = require('bitcore-lib-dash');
var Message = require('bitcore-message-dash');
var ECIES = require('bitcore-ecies-dash');
var mnemonic = require('bitcore-mnemonic-dash');

// DAuth
module.exports = {

    // TODO: move to JDAT
    genAuthHeaders: function (ukeyPrv, data) {

        // sign the data with the user's private UserKey
        var sig = Message(JSON.stringify(data)).sign(ukeyPrv);

        var headers = {
            'x-dauth-sig-header': sig
        };
        return headers;
    },

    // TODO: move to JDAT
    verifyAuthHeader: function (ukeyPub, data, headers) {

        try {
            var address = new core.PublicKey(ukeyPub).toAddress();
            var sig = headers['x-dauth-sig-header'];
            var msg = JSON.stringify(data);

            // test an auth fail by changing the msg...
            //msg += '0';

            // verify the data was signed by the user's pub key
            return Message(msg).verify(address, sig);

        } catch (err) {

            console.log('Dauth error:' + err);
            return null;
        }
    },

    messageTypes: {
        OFFER: 0,
        ACCEPT: 1,
        RATIFY: 2
    }

    /* Notes for the next DAuth implementation
     * todo - reauth if sequence lost..
     *
     * Offer: (C -> S)
     * =================
     *
     * Headers...
     *  Msg Type ID
     *  SenderID
     *  SourceID (0 - client, 1 - masternode)
     *  Data Sig (enc'd data signed for recip. pubkey)
     *
     * Data...
     *  Time,
     *  Offer Seed
     *
     * .Accept: (S -> C)
     * =================
     *
     * Headers...
     *  - SourceID
     * Data...
     *  + Offer Solution
     *  + Session length
     *
     *
     * .Ratify: (C -> S)
     * =================
     *
     * Data...
     *  - Session length
     *
     *
     * .Confirm: (S -> C)
     * =================
     * "
     *
     *
     * .Session Msg
     * =================
     *
     *  JDT:
     *      Msg Type
     *      Sender NID
     *      Sender Req Key
     *
     */
};