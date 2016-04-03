'use strict';

var dash = require('../../dashpay-lib');

var DashPay = function DashPay() {
    if (!(this instanceof DashPay)) {
        return new DashPay();
    }
};

DashPay.prototype.test = function() {

    return 'Hello DashWorld!';
};

module.exports = DashPay;