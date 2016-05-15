
var marionette = require('backbone.marionette'),
Account = require('../models/Account');

module.exports= marionette.ItemView.extend({
    template: require('./NewAccountItemView.html'),
    ui:{
        name: 'input[name="name"]'
    },
    events:{
        'click #saveBtn': 'onSave'
    },
      initialize: function (options) {
        this.collection = options.collection;
  },
    onSave:function(){
        this.collection.add(new Account({
            name:this.ui.name.val()
        }));
    }
    
});