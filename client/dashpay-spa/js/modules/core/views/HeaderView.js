'use strict';

var marionette = require('backbone.marionette');

module.exports = marionette.ItemView.extend({
    template: require('./HeaderView.html'),
    initialize: function() {
        this.model.on('change:IsAuthorised', this.render, this);
    },
    onRender:function(){
        console.log(this.model.get('IsAuthorised'));
    }
});
