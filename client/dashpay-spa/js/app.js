
window._ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $
var Marionette =require('backbone.marionette');
var CoreModule = require('./modules/Core');
var AuthModule =require('./modules/AuthModule');
var MainModule =require('./modules/MainModule');
var handlebars = require('handlebars');

Marionette.Renderer.render = function (template, data) {
    template = template.trim();
    return handlebars.compile(template)(data);
};

var app = new Marionette.Application({});


app.on('before:start',function(){
    this.module('Core',CoreModule);
    this.module('AuthModule', AuthModule);
    this.module('MainModule', MainModule);
});
app.on('start', function () {

  Backbone.history.start();

});

app.start();