define ([

    'backbone',
    'common',
    'Session',

], function (Backbone, Common, Session) {

    'use strict';

    var MessagesCollection = Backbone.Collection.extend ({ 

        //define collection model
        url: Common.ApiUrl + '/messages',

        /**
         * default constructor
         */
        initialize: function () {
            this.bind ('request', this.indicate, this);
            this.bind ('sync', this.disindicate, this);
        },

        indicate: function () {
            $('#messages-indicator').show();
            $('#messages-table-body').empty();
        },

        disindicate: function () {
            $('#messages-indicator').hide();
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

