
var marionette = require('backbone.marionette'),
    Account = require('../models/Account'),
    BaseFormView = require('../../../shared/BaseFormView')

module.exports = BaseFormView.extend({
    template: require('./NewAccountItemView.html'),
    ui: {
        name: 'input[name="name"]',
        form: '#newAccountFrm'
    },
    events: {
        'click #saveBtn': 'onSave'
    },
    initialize: function(options) {
        this.collection = options.collection;
    },
    validationRules: {
        name: { 'required': true }
    },
    onSave: function() {
        if (!this.ui.form.valid()) return
        this.collection.add(new Account({
            name: this.ui.name.val()
        }));
    }

});