define ([

    'backbone',
    'common'

], function (Backbone, Common) {

    'use strict';

    var MessagesCollection = Backbone.Collection.extend ({ 

        //define collection model
        // model : FileModel,
        url: Common.ApiUrl + '/messages',

        /**
         * default constructor
         */
        initialize: function () {
        },

    });

    return MessagesCollection;
    
});

