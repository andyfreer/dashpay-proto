'use strict';

var marionette = require('backbone.marionette');
var $ = require('jquery');

module.exports = marionette.ItemView.extend({
    setupValidation: function() {
        this.ui.form.validate({
            errorClass: 'help-inline',
            rules:this.validationRules,
            highlight: function(element) {
                $(element).closest('.form-group').addClass('has-error');
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
    }
});