'use strict';

var marionette = require('backbone.marionette');
var ModalRegion = require('../regions/ModalRegion');
var HeaderView = require('./HeaderView');
var channel = require('../../../channel');
var AuthModel = require('../models/Auth');
module.exports = marionette.LayoutView.extend({
    el: '#dash-app',
    template: require('./AppLayout.html'),
    regions: {
        header: 'header',
        content: '[region=content]',
        modal: { selector: 'div[role=dialog]', regionClass: ModalRegion }
    },
    initialize: function() {
        this.headerView = new HeaderView({ model: AuthModel });

        channel.comply('ui:show-error', this.showError, this);
        channel.comply('ui:show-view', this.showView, this);
        channel.comply('ui:show-modal', this.showModal, this);
    },
    onRender: function() {
        this.getRegion('header').show(this.headerView);
    },
    showError: function(view) {
        this.showView(view);
    },
    showView: function(view) {
        if (view === this.currentView) {
            return;
        }

        this.currentView = view;
        this.getRegion('modal').empty();
        this.showChildView('content', view);
    },
    showModal: function(view) {
        this.showChildView('modal', view);
    }
});
