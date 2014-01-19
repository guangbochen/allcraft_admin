/* Global define */
define ([
    // These are path alias that we configured in our main.js
    'backbone',
    'underscore',
    'pubnub'
], function (Backbone, _, ignore) {
    return {
        // ApiUrl: 'http://hoochcreative.com.au/printee/index.php',
        ApiUrl: 'http://api.printee.dev',
        vent: _.extend ({}, Backbone.Events),

    };
});

