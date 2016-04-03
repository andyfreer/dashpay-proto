'use strict';

function pool() {
    this.keys = {};
    this.length = 0;
    this.defaultValue = null;
}

/*
 * // Connection pool to hold authed session endpoints on both client and MNs - not used fully yet...
 *
 * fields to implement...
 * ======================
 *
 * Time
 * PartyID
 * PartyIP
 * SourceID
 * PubKey (looked up from decentralized source)
 * AuthState (-1 = sync lost /invalid = restart
 * AuthSeed
 * SeqID
 *
 *
 */

pool.prototype.addEndpoint = function(epID, epIP, epPubKey) {

};

pool.prototype.store = function(key, value) {
    this.keys[key] = value;
    this.length++;
};
pool.prototype.fetch = function(key) {
    var value = this.keys[key];
    if (value) {
        return value;
    } else {
        if (this.defaultValue) return this.defaultValue;
        return null;
    }
};

pool.prototype.hasKey = function(key) {
    for (var k in this.keys) {
        if (key == k) {
            return true;
        } else {
            return false;
        }
    };
    return false;
};
pool.prototype.remove = function(key) {
    if (this.keys[key]) {
        delete this.keys[key];
        this.length--;
    }
};

module.exports = pool;