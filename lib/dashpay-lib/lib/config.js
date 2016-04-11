'use strict';

// config shared between clients and DAPI
// URL must be https as d-api will reject http
module.exports = {
    dapiURL: 'https://localhost',
    dapiPort: 8080,
    //dapiURL: 'https://api.dash.org',
    //dapiPort: 443,
    accPwdMinLen: 6,    // acc pwds must be must be min 15 chars on production releases
    userNameMinLen: 4
};