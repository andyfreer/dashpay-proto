'use strict';

var marionette = require('backbone.marionette'),
channel = require('../../../channel');

module.exports = marionette.ItemView.extend({
    template: require('./HeaderView.html'),
    current:null,
    ui:{
        menuitems: 'a href[data-name]'
    },events:{
        'click a[data-name]':'onNavigation'
    },
    initialize: function() {
        this.model.on('change:IsAuthorised', this.render, this);
        channel.on('nav:change', this.updateNav, this);
    },
    onRender:function(){
          $(this.current).parent().addClass('active');
    },
    onNavigation:function(selected){
        $(selected.currentTarget).parent().addClass('active');
        this.current = $(selected.currentTarget).parent();
    },
    updateNav:function(data){
        this.current =  '#' +data;
    }
   
});
