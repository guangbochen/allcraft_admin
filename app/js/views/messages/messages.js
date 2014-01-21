
define ([

    'underscore',
    'backbone',
    'common',
    'text!/templates/messages/index.html',
    'Session',
    'collections/messages',
    'views/messages/message',
    'views/home/header',

], function (_, Backbone, Common, MessagesTemplate, Session, MessageCollection, MessageView, HeaderView) {

    'use strict';

    var MessagesView = Backbone.View.extend({

        template: _.template (MessagesTemplate),
        url: Common.ApiUrl + '/messages/setRead',
        limit:  10,

        /**
         * constructor
         */
        initialize: function () {
            _.bindAll (this, 'fetchMessagesByPagi');
            this.messages = new MessageCollection();
            this.receiver = Session.getUsername();
        },

        events: {
            'click li': 'fetchMessagesByPagi',
            'click #mark-all-as-read': 'markAllMessagesAsRead',
        },

        /**
         * this functions fetchs messages in pagination by click pages
         */
        fetchMessagesByPagi : function (ev) {

            var target = $(ev.currentTarget);
            var page = target.text()
            target.siblings().removeClass ('active');
            target.addClass ('active');

            var offset = (page-1)*this.limit;
            this.fetchMessages(offset,this.limit, this.receiver);
        },

        displayMessages : function (response) {
            var that = this;
            $('#messages-table-body').empty();
            // Add a single order placeholder
            var messages = response.messages;
            for (var i in messages) {
                var messageView = new MessageView(messages[i]);
                that.$el.find('tbody').append(messageView.render().el);
            }
            //update count of unread messages
            $('#unread_message').html(response.unread_messages);
        
        },

        /**
         * this method fetches notifcation from restful server
         */
        fetchMessages : function (offset, limit, receiver) {
            var that = this;
            this.messages.fetchByPagi(offset, limit, receiver);

            this.messages.fetch ({
                success: function (models, response) {
                    that.displayMessages(response);
                }
            });
        },

        /**
         * showsPaginations function add pagination pages to the view
         */
        showsPaginations : function(){

            var that = this;
            this.messages.fetch ({
                success: function (models, response) {
                    var pages = Math.ceil(response.count/that.limit);
                    $('#messages-paginations') .empty();
                    for(var i=1; i<=pages; i++){
                        if(i === 1) 
                            $('#messages-paginations') .append('<li class="active hand-cursor"><a>'+i+'</a></li>');
                        else
                            $('#messages-paginations').append('<li class="hand-cursor"><a>'+i+'</a></li>');
                    
                    };

                }
            });
        },

        /**
         * this function set all unread messages status into read
         */
        markAllMessagesAsRead : function () {
            var that = this;
            var receiver = Session.getUsername();
            var data = { 'username' : receiver}

            // update messages status 
            $.ajax ({
                url: this.url,
                data: JSON.stringify (data),
                dataType: 'json',
                type: 'post',
                success: function (response) {
                    // update message box in the header
                    var headerView = new HeaderView();
                    headerView.loadMessages();

                    // update messages status
                    that.displayMessages(response);
                    that.showsPaginations();
                }
            });
        },


        /**
         * renders the view template, and updates this.el with the new HTML
         */
        render: function () {
            //fetch messages and append to the view
            var offset = 0;
            this.fetchMessages(offset, this.limit, this.receiver);
            this.showsPaginations();

            // Load the compiled HTML template into the Backbone "el"
            this.$el.html (this.template());
            return this;
        },

        onClose: function () {},

    });

    return MessagesView;
});

