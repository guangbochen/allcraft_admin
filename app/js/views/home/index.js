define ([

    'underscore',
    'backbone',
    'text!/templates/home/home.html',
    'Session',

], function (_, Backbone, HomeTemplate, Session) {

    'use strict';

    var HomeView = Backbone.View.extend({

        template: _.template (HomeTemplate),
        username: '',

        initialize: function () {

            Session.getAuth ();
            if($.cookie('user')) {
                var user = JSON.parse($.cookie('user'));
                this.username = user.username;
            }
        },


        events: {
        },

        /**
         * renders the view template, and updates this.el with the new HTML
         */
        render: function () {
            // Load the compiled HTML template into the Backbone
            this.$el.html (this.template({
                    username: this.username
                })
            );
            return this;
        },

        onClose: function () { }
    });

    return HomeView;
});

