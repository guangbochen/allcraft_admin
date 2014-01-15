
define ([

    'underscore',
    'backbone',
    'common',
    'text!/templates/login/index.html',
    // 'httpAuthen',
    // 'authen/backbone.basicauth',

], function (_, Backbone, Common, LoginTemplate) {

    'use strict';

    var LoginView = Backbone.View.extend({

        template: _.template (LoginTemplate),
        url: Common.ApiUrl + '/login',

        initialize: function () {
        },

        events: {
            'submit form': 'login',

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
                var user = {
                    username: username,
                    password: password
                };

                $.ajax({
                    url: this.url,
                    type: 'POST',
                    dataType: 'json',
                    data: user,
                    headers: Backbone.BasicAuth.getHeader(user),
                    success: function (data) {
                        console.log('pass');
                        // If not, send them back to the home page
                        window.location.replace('#/');
                    },
                    error: function (data, response, message) {
                        console.log(data);
                    }
                });
            }
        },

        /**
         * renders the view template, and updates this.el with the new HTML
         */
        render: function () {
            // Load the compiled HTML template into the Backbone "el"
            this.$el.html (this.template);
            return this;
        },

        onClose: function () {

        }
    });

    return LoginView;
});

