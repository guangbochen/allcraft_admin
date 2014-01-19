define ([

    'backbone',
    'common'

], function (Backbone, Common) {

    'use strict';

    var NotificationCollection = Backbone.Collection.extend ({ 

        //define collection model
        // model : FileModel,
        url: Common.ApiUrl + '/notifications',

        /**
         * default constructor
         */
        initialize: function () {
        },

    });

    return NotificationCollection;
    
});

