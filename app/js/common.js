/* Global define */

define ([
    // These are path alias that we configured in our main.js
    'backbone',
    'underscore',
    'pubnub'
], function (Backbone, _, ignore) {
    return {
        pubnub: PUBNUB.init({
            subscribe_key : 'sub-c-077f7902-66ad-11e3-b1d4-02ee2ddab7fe',
            publish_key: 'pub-c-8021207d-c906-4f21-ac84-7d5773c9255b'
        }),
        // ApiUrl: 'http://hoochcreative.com.au/printee/index.php',
        ApiUrl: 'http://api.printee.dev',
        vent: _.extend ({}, Backbone.Events)
    };
});

