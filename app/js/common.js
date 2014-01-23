/* Global define */
define ([
    // These are path alias that we configured in our main.js
    'backbone',
    'underscore',
    'pubnub'
], function (Backbone, _, ignore) {
    return {
        ApiUrl: 'http://allcraftapi.hoochcreative.com.au',
        // ApiUrl: 'http://api.printee.dev',
        fileUrl: 'http://hoochcreative.com.au/allcraft_api/server',
        // fileUrl: 'http://api.printee.dev',
        vent: _.extend ({}, Backbone.Events),
        
    };

});

