'use strict';

var backbone = require('backbone');
var wallet = require('../../../../../../lib/dashpay-wallet-client');

var security =  backbone.Model.extend({
    initialize:function(){
         //call on client dapDAPIi to query... should be sync! client dapi might need to resolve its own promise if it needs to make a REST call into server DAPI
         this.set('IsAuthorised', false);
    },
    isAuthorised:function(){
        return this.get('IsAuthorised');
    },
    authorise:function(username, password){
        //call on client DAPI and await promise to resolve
        var authed = false;
        console.log('model login:' + username + '/' + password);
        wallet.LoginAsync(username, password).then(function(response) {

            if (response.status === 200) {
                console.error('Login Success! ' + response.res);
                // Succesful login...
                authed = true;
            } else {
                console.error('Login failed: ' + JSON.stringify(response));
            }
        }, function(error) {
            console.error('Login error');
        });
        return this.set('IsAuthorised',authed);
    }
});

module.exports = new security();
