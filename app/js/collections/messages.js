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
            console.log(this.url);
        },

        countUnreadMessags : function () {
            var receiver = Session.getUsername();
            this.url += '?' + 'receiver=' + receiver;
            // var count = 0;
            this.fetch({
                success: function (models, response) {
                    var count = response.unread_messages;
                    return count;
                }
            });
        },

    });

    return MessagesCollection;
    
});

