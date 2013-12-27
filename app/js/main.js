// app bootstrap for configuring Require.js and loading initally important dependencies
require.config ({
    // waitSeconds : 15,
    paths: {
        jquery     : 'vendor/light-blue-white/lib/jquery/jquery-2.0.3.min',
        underscore : 'vendor/underscore-amd/underscore-min',
        backbone   : 'vendor/backbone-amd/backbone-min',
        syphon     : 'vendor/tidepool-backbone.syphon/lib/amd/backbone.syphon.min',
        text       : 'vendor/requirejs-text/text',
        moment     : 'vendor/momentjs/min/moment.min',
        propertyParser : 'vendor/requirejs-plugins/src/propertyParser',
        pubnub     : 'vendor/pubnub/web/pubnub.min'
    }
});

require ([ 

    // Load our app module and pass it to our definition function
    'app'
], function (App) {

    // The "app" dependency is passed in as "App"
    App.initialize();
});

