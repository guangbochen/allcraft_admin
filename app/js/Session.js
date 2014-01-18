define([

    'backbone',
    'router',
    'Common',
    'httpAuthen',
    'jquery_cookie',

], function(Backbone, Router, Common){

    var SessionModel = Backbone.Model.extend({

        url: Common.ApiUrl,

        /**
         * construcotr 
         */
        initialize : function (){
            // Ajax Request Configuration
            $.ajaxSetup({
                headers: Backbone.BasicAuth.getHeader({
                    username: 'default',
                    password: 'default'
                }),
                // Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
                statusCode: {
                    401: function(){
                        // Redirec to the login page.
                        Backbone.history.navigate('#/login', { trigger : true });
                     
                    },
                    403: function(){
                        alert('permission forbidden');
                    }
                }
            });
        },

        /**
         * login function validate user login through restful api
         */
        login : function(credentials){
            console.log('check login');
            var that = this;
            var login = $.ajax({
                url : Common.ApiUrl + '/login',
                dataType : 'json',
                type : 'POST',
                data: credentials,
                headers: Backbone.BasicAuth.getHeader(credentials),
            });

            login.done(function(response){
                //save user info into session cookie
                $.cookie('user', JSON.stringify(response));
                console.log(response);

                //setup ajax response header
                $.ajaxSetup({
                    headers: Backbone.BasicAuth.getHeader({
                        username: response.username,
                        password: response.password
                    })
                });

                //redirect page to index page
                Backbone.history.navigate('', { trigger : true });
            });

        },

        logout : function(callback) { 

            //remove session cookie
            if($.cookie('user')) $.removeCookie('user');

            //reset ajaxSetup response header
            $.ajaxSetup({
                headers: Backbone.BasicAuth.getHeader({
                    username: '',
                    password: '' 
                })
            });

            // redirect to login page
            Backbone.history.navigate('#/login', { trigger : true });
        },

        getAuth : function(callback) {

            //if contains session cookie then login with session user
            if($.cookie('user')) {
                var user = JSON.parse($.cookie('user'));
                $.ajaxSetup({
                    headers: Backbone.BasicAuth.getHeader({
                        username: user.username,
                        password: user.password 
                    })
                });
            }
            // fetch would validate user authorization via rest api
            var Login = this.fetch(); 
            Login.always(callback);
        }
    
    });

    return new SessionModel();
});