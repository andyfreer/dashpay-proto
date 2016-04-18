
'use strict';

var marionette = require('backbone.marionette');
var _ = require('underscore');

module.exports = marionette.Region.extend({
  onShow: function(view) {
    if (!this.eventsSetup) {
      this.eventsSetup = true;
      this.$el.on('hidden.bs.modal', _.bind(this.onModalHidden, this));
    }

    var region = this;
    this.listenTo(view, 'destroy', function () {
      region.$el.modal('hide');
    });

    this.$el.modal('show');
  },
  onModalHidden: function () {
    this.empty();
  }
});
