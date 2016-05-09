// interim solution for global var for dashpaywallet client
// ...later state will be moved up to the lib / Marionette ver. made

// global ref to DashPay-Wallet SDK that also contains DashPay-Lib
var Dash = require('DashPayWallet');

// create a global DashPay Wallet object..
var wallet = new Dash.Wallet();

