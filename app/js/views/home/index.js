define ([

    'underscore',
    'backbone',
    'text!/templates/home/home.html',
    'Session',

], function (_, Backbone, HomeTemplate) {

    'use strict';

    var HomeView = Backbone.View.extend({

        template: _.template (HomeTemplate),

        initialize: function () {
            _.bindAll(this, "logout");
        },


        events: {
            'click #logout': 'logout'
        },

        logout: function () {
            console.log('logout');
        },

        /**
         * renders the view template, and updates this.el with the new HTML
         */
        render: function () {
            // Load the compiled HTML template into the Backbone "el"
            this.$el.html (this.template);
            return this;
        },

        onClose: function () { }
    });

    return HomeView;
});

