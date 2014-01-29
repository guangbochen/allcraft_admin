define ([

    'backbone',
    'common'

], function (Backbone, Common) {

    'use strict';

    var NotificationCollection = Backbone.Collection.extend ({ 

        //define collection model
        url: Common.ApiUrl + '/notifications',

        /**
         * default constructor
         */
        initialize: function () {
            this.bind ('request', this.indicate, this);
            this.bind ('sync', this.disindicate, this);
        },

        indicate: function () {
            $('#notifications-indicator').show();
            $('#notifications-table-body').empty();
        },

        disindicate: function () {
            $('#notifications-indicator').hide();
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

