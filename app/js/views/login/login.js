
define ([

    'underscore',
    'backbone',
    'common',
    'text!/templates/login/index.html',
    'Session',
    'httpAuthen',

], function (_, Backbone, Common, LoginTemplate, Session) {

    'use strict';

    var LoginView = Backbone.View.extend({

        template: _.template (LoginTemplate),
        url: Common.ApiUrl + '/login',

        initialize: function () {
        },

        events: {
            'submit form': 'login',
            'click .myLogout': 'logout'
        },

        /**
         * login function validate user login action
         */
        login:function (event) {
            event.preventDefault();

            var username = $('#username').val();
            var password = $('#password').val();
            if(!username) {
                this.$('#username').focus();
            }
            else if(!password) {
                this.$('#password').focus();
            }
            else
            {
                var credentails = {
                    username: username,
                    password: password
                };

                Session.login(credentails);
            }
        },

        logout : function () {
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

        onClose: function () {},

    });

    return LoginView;
});

