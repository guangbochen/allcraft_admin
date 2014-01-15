// app bootstrap for configuring Require.js and loading initally important dependencies
require.config ({
    waitSeconds : 15,
    paths: {
        jquery     : 'vendor/light-blue-white/lib/jquery/jquery-2.0.3.min',
        modal      : 'vendor/light-blue-white/lib/bootstrap/modal', //bootstrap dialog
        transition : 'vendor/light-blue-white/lib/bootstrap/transition', //bootstrap dialog transition
        underscore : 'vendor/underscore-amd/underscore-min',
        backbone   : 'vendor/backbone-amd/backbone-min',
        syphon     : 'vendor/tidepool-backbone.syphon/lib/amd/backbone.syphon.min',
        text       : 'vendor/requirejs-text/text',
        moment     : 'vendor/momentjs/min/moment.min',
        propertyParser : 'vendor/requirejs-plugins/src/propertyParser',
        pubnub     : 'vendor/pubnub/web/pubnub.min',
        // maskedinput : 'vendor/light-blue-white/lib/jquery-maskedinput/jquery.maskedinput',
        // plugin for file upload
        widget           : 'vendor/jquery-file-upload/js/vendor/jquery.ui.widget',
        iframe_transport : 'vendor/jquery-file-upload/js/jquery.iframe-transport',
        fileupload       : 'vendor/jquery-file-upload/js/jquery.fileupload',
        httpAuthen       : 'authen/backbone.basicauth', //basic http authen
    }
});

require ([ 

    // Load our app module and pass it to our definition function
    'app',
    'httpAuthen'
], function (App) {

    // Tell jQuery to watch for any 401 or 403 errors and handle them appropriately
    $.ajaxSetup({

        // headers: Backbone.BasicAuth.getHeader({
        //     username: '',
        //     password: ''
        // }),
        // beforeSend: function (xhr)
        // {
        //     xhr.setRequestHeader('Authentication', 'authorizationToken');
        // },
        statusCode: {
            401: function(){
                // Redirec the to the login page.
                window.location.replace('/#/login');
             
            },
            403: function() {
                // 403 -- Access denied
                window.location.replace('/#/denied');
            }
        }
    });

    // The "app" dependency is passed in as "App"
    App.initialize();
});
