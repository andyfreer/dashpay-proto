'use strict';

var marionette = require('backbone.marionette'),
channel = require('../../../channel'),
NewAccount = require('./NewAccountItemView'),
ChildView = require('./AccountItemView');

var emptyView = marionette.CompositeView.extend({
    template:require('./NoitemsView.html'),
    tagName:'tr'
});
module.exports = marionette.CompositeView.extend({
    template: require('./AccountsCompositeView.html'),
    childView: ChildView,
    emptyView: emptyView,
    childViewContainer: "tbody",
    events:{
        'click #addContactBtn' : 'onAddContact'
    },
    initialize: function (options) {
        this.collection = options.collection;
  },
  onRender:function(){
      console.log('compo calling render');
  },
    onAddContact:function(e){
        e.preventDefault();
       console.log('1')
        channel.command('ui:show-modal', new NewAccount({
            collection:this.collection
        }));
    }
});
