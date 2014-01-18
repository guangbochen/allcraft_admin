
define ([

    'underscore',
    'backbone',
    'common',
    'text!/templates/home/header.html',
    'Session',

], function (_, Backbone, Common, HeaderTemplate, Session) {

    'use strict';

    var HeaderView = Backbone.View.extend({

        template: _.template (HeaderTemplate),
        // url: Common.ApiUrl + '/login',

        initialize: function () {

        },

        events: {
            'click #logout': 'logout'
        },


        logout : function () {
            console.log('logout');
            Session.logout();
        },

        /**
         * renders the view template, and updates this.el with the new HTML
         */
        render: function () {
            // Load the compiled HTML template into the Backbone "el"
            this.$el.html (this.template);
            return this;
        },

        onClose: function () {},
    });

    return HeaderView;
});

