var marionette = require('backbone.marionette');

module.exports= marionette.ItemView.extend({
    template: require('./AccountItemView.html'),
    tagName:'tr'
});