define ([

    'backbone',
    'models/status',
    'common',

], function (Backbone, StatusModel, Common) {

    'use strict';

    var StatusesCollection = Backbone.Collection.extend ({ 

        //define collection model
        model: StatusModel,
        url: Common.ApiUrl + '/statuses',

        /**
         * status constructor
         */
        initialize: function () {
        },
    });

    return StatusesCollection;
    
});

