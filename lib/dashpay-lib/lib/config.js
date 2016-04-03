'use strict';

// config shared between clients and DAPI
module.exports = {
    dapiURL: 'https://localhost', // must be https as d-api will reject http
    dapiPort: 8080,
    accPwdMinLen: 6,    // acc pwds must be must be min 15 chars on production releases
    userNameMinLen: 4
};