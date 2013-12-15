/* Global define */

define ([
    'backbone',
    'underscore'
], function (Backbone, _) {
    return {
        // ApiUrl: 'http://hoochcreative.com.au/printee/server/index.php'
        vent: _.extend ({}, Backbone.Events),
        ApiUrl: 'http://api.allcraft.dev'
    };
});

