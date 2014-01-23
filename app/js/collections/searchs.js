define ([

    'backbone',
    'models/search',
    'common'

], function (Backbone, SearchModel, Common) {

    'use strict';

    var SearchCollection = Backbone.Collection.extend ({ 

        //define collection model
        // model : SearchModel,
        url: Common.ApiUrl + '/search',

        /**
         * search constructor
         */
        initialize: function () {
        },

        /**
         * searchOrdersBy function search orders by inputted value
         */
        searchOrdersBy: function (value) {
            this.url += '?q=' + value ;
            this.fetch();
        },
    });

    return SearchCollection;
    
});

