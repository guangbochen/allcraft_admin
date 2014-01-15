define ([

    'underscore',
    'backbone',
    'text!/templates/home/home.html',

], function (_, Backbone, HomeTemplate) {

    'use strict';

    var HomeView = Backbone.View.extend({

        template: _.template (HomeTemplate),

        initialize: function () {
        },

        // renders the view template, and updates this.el with the new HTML
        // ==========================
        render: function () {
            // Load the compiled HTML template into the Backbone "el"
            this.$el.html (this.template);
            return this;
        },

        events: {
            'click #logout': 'logout'
        },

        logout: function () {
            console.log('logout');
        },

        onClose: function () {

        }
    });

    return HomeView;
});

