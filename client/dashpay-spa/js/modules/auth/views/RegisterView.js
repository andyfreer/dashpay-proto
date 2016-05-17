'use strict';

var marionette = require('backbone.marionette');

module.exports = marionette.ItemView.extend({
    template:require('./RegisterView.html'),
    ui: {
        username: 'input[name=username]',
        password: 'input[name=password]',
        comfirmPassword: 'input[name=passwordconfirmation]',
        form: '#signupform'
    },
    events: { 
        'click #signupBtn': 'register'
    },
        onRender:function(){
        this.ui.form.validate({
            errorClass:'help-inline',
            rules:{
                username:{'required':true}, password:{'required':true}
            },
            highlight:function (element) {
                
            },
            unhighlight:function(element) {
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
    register: function() {
       if(!this.ui.form.valid()) return;
        //do register here!
    }
});