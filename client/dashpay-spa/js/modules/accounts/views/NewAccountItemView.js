
var marionette = require('backbone.marionette'),
    Account = require('../models/Account');

module.exports = marionette.ItemView.extend({
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
    onRender: function() {
        this.ui.form.validate({
            errorClass: 'help-inline',
            rules: {
                name: { 'required': true }
            },
            highlight: function(element) {
                $(element).closest('.form-group').addClass('has-error')
            },
            unhighlight: function(element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            showErrors: function(errorMap, errorList) {
                $.each(this.successList, function(index, value) {
                    return $(value).popover("hide");
                });
                return $.each(errorList, function(index, value) {
                    $(value.element).closest('.form-group').addClass('has-error');
                    var _popover;

                    _popover = $(value.element).popover({
                        trigger: "manual",
                        placement: "top",
                        content: value.message,
                        template: "<div class=\"popover\"><div class=\"arrow\"></div><div class=\"popover-inner\"><div class=\"popover-content\"><p></p></div></div></div>"
                    });

                    _popover.data("popover");
                    return $(value.element).popover("show");
                });
            }
        })
    },
    onSave: function() {
        if(!this.ui.form.valid()) return
        this.collection.add(new Account({
            name: this.ui.name.val()
        }));
    }

});