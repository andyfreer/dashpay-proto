
window._ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $
var Marionette = require('backbone.marionette'),
    CoreModule = require('./modules/Core'),
    AuthModule = require('./modules/AuthModule'),
    AccountsModule = require('./modules/AccountsModule'),
    handlebars = require('handlebars'),
    authModel = require('./modules/core/models/Auth');

Marionette.Renderer.render = function(template, data) {
    template = template.trim();
    return handlebars.compile(template)(data);
};

var app = new Marionette.Application({
    initialize: function() {
        this.listenTo(authModel,'change:IsAuthorised', function() {
            if (authModel.isAuthorised()) {
                this.module('AccountsMoule', AccountsModule);
               Backbone.history.navigate('accounts', {trigger: true});
            }
        });
    }
});


app.on('before:start', function() {
    this.module('Core', CoreModule);

    if (!authModel.isAuthorised()) {
        this.module('AuthModule', AuthModule);
    } else {
        alert('application encountered error');
    }
});

app.on('start', function() {
    Backbone.history.start();
});

app.start();