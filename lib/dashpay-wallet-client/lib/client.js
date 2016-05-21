var Promise = require("bluebird");

var wallet = Promise.promisifyAll(require('../../dashpay-wallet-sdk'));

// return a promisified DashPay Wallet object..
 module.exports =  Promise.promisifyAll(new wallet.Wallet());
