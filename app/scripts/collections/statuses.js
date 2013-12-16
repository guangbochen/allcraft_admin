define ([

    'backbone',
    'models/status',
    'common'

], function (Backbone, StatusModel, Common) {

    'use strict';

    var StatusesCollection = Backbone.Collection.extend ({ 

        model : StatusModel,
        url: Common.ApiUrl + '/statuses',

        initialize: function () {
        },
    });

    return StatusesCollection;
    
});

