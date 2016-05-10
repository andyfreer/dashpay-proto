'use strict';

var backbone = require('backbone');

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
        return this.set('IsAuthorised',true);
    }
});

module.exports = new security();