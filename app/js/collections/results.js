define ([

    'backbone',
    'models/search',
    'common'

], function (Backbone, SearchModel, Common) {

    'use strict';

    var SearchCollection = Backbone.Collection.extend ({ 

        //define collection model
        model : SearchModel,
        url: Common.ApiUrl + '/statuses',

        /**
         * status constructor
         */
        initialize: function () {
        },
    });

    return StatusesCollection;
    
});

