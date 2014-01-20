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

        /**
         * fetchByPagi function fetches notification in pagination
         */
        fetchByPagi: function (offset, limit) {
            this.url = Common.ApiUrl + '/notifications';
            this.url += '?' + 'offset=' + offset + '&limit=' + limit;
        },

    });

    return NotificationCollection;
    
});

