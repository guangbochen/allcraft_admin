require.config ({
    waitSeconds : 15,
    paths: {
        jquery     : 'vendor/light-blue-white/lib/jquery/jquery-2.0.3.min',
        underscore : 'vendor/underscore-amd/underscore-min',
        backbone   : 'vendor/backbone-amd/backbone-min',
        syphon     : 'vendor/tidepool-backbone.syphon/lib/amd/backbone.syphon.min',
        text       : 'vendor/requirejs-text/text',
        propertyParser : 'vendor/requirejs-plugins/src/propertyParser'
    }
});

require ([ 

    'app'

], function (App) {

    App.initialize();

});

