'use strict';

var marionette = require('backbone.marionette');
var $= require('jquery');
var authModel = require('../../core/models/Auth');

var wallet = require('../../../../../../lib/dashpay-wallet-client');

module.exports = marionette.ItemView.extend({
    template: require('./LoginView.html'),
    ui: {
        username: 'input[name=username]',
        password: 'input[name=password]',
        form:'#loginform'
    },
    events: { 
        'click #loginBtn': 'login'
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
            errorPlacement: function(error,element) {
    return true;
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
            console.log(_popover.data("popover"));
            _popover.data("popover");
            return $(value.element).popover("show");
            });
    }
  
        })
    },
    login: function() {
        if(!this.ui.form.valid())return;
        
            authModel.authorise(this.ui.username.val(), this.ui.password.val());
            return;
            wallet.Login(this.ui.username.val(), this.ui.password.val(),
                function (err, res) {
                    if (err) {
                        console.log('Response Error: ' + err);
                        //showAlertMsg("Error: Couldn't connect", alertMsg, true);
                    } else {
                        console.log('Response: ' + JSON.stringify(res));
                        if (res.status === 404) {
                            //showAlertMsg('User not found', alertMsg, true);
                        } else if (res.status === 401) {
                            //showAlertMsg('The password is incorrect', alertMsg, true);
                        } else if (res.status !== 200) {
                            //showAlertMsg('Masternode error.  Please try again.', alertMsg, true);
                        } else {
                            // Status 200 - don't do anything here because the wallet sdk will callback with login result
                        }
                    }
                }
            );
        }
    
});
