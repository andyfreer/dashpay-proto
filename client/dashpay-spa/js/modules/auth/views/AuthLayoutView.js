'use strict';

var marionette = require('backbone.marionette'),
LoginView = require('./LoginView');

module.exports = marionette.LayoutView.extend({
    template:require('./AuthLayoutView.html'),
    regions:{
        login:'#login'
    },
    onRender:function(){
        console.log('rendering layout');
        this.login.show(new LoginView);
    }
});