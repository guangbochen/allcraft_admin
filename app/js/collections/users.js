define ([

    'backbone',
    'common'

], function (Backbone, Common) {

    'use strict';

    var UsersCollection = Backbone.Collection.extend ({ 

        //define collection model
        url: Common.ApiUrl + '/users',

        /**
         * default constructor
         */
        initialize: function () {
        },

    });

    return UsersCollection;
    
});

