// app bootstrap for configuring Require.js and loading initally important dependencies
require.config ({
    waitSeconds : 15,
    paths: {
        jquery     : 'vendor/light-blue-white/lib/jquery/jquery-2.0.3.min',
        underscore : 'vendor/underscore-amd/underscore-min',
        backbone   : 'vendor/backbone-amd/backbone-min',
        syphon     : 'vendor/tidepool-backbone.syphon/lib/amd/backbone.syphon.min',
        text       : 'vendor/requirejs-text/text',
        moment     : 'vendor/momentjs/min/moment.min',
        propertyParser : 'vendor/requirejs-plugins/src/propertyParser',
        pubnub     : 'vendor/pubnub/web/pubnub.min',
        maskedinput : 'vendor/light-blue-white/lib/jquery-maskedinput/jquery.maskedinput',
        modal      : 'vendor/light-blue-white/lib/bootstrap/modal', //bootstrap dialog
        transition : 'vendor/light-blue-white/lib/bootstrap/transition', //bootstrap dialog transition
        // plugin for file upload
        widget           : 'vendor/jquery-file-upload/js/vendor/jquery.ui.widget',
        iframe_transport : 'vendor/jquery-file-upload/js/jquery.iframe-transport',
        fileupload       : 'vendor/jquery-file-upload/js/jquery.fileupload',
        httpAuthen       : 'authen/backbone.basicauth', //basic http authen
        jquery_cookie    : 'vendor/jquery-cookie/jquery.cookie',
        select2          : 'vendor/light-blue-white/lib/select2',
    }
});

require ([ 

    // Load our app module and pass it to our definition function
    'app',
], function (App) {

    // The "app" dependency is passed in as "App"
    App.initialize();
});
