define ([

    'backbone',
    'common',
    'Session',

], function (Backbone, Common, Session) {

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

        /**
         * fetchByPagi function fetches notification in pagination
         */
        fetchByPagi: function (offset, limit, receiver) {
            this.url = Common.ApiUrl + '/messages';
            this.url += '?' + 'offset=' + offset + '&limit=' + limit + '&receiver=' + receiver;
        },

        countUnreadMessags : function () {
            var receiver = Session.getUsername();
            this.url += '?' + 'receiver=' + receiver;
        },

        markAllMessagesAsRead : function () {

        },

    });

    return MessagesCollection;
    
});

