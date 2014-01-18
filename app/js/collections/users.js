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

        // /**
        //  * fetch list of files by order number
        //  */
        // fetchFiles: function (value) {
        //     this.url += '/' + value ;
        //     this.fetch();
        // },
    });

    return UsersCollection;
    
});

