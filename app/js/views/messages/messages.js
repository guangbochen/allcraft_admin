define ([

    'underscore',
    'backbone',
    'common',
    'collections/messages',
    'views/messages/message',
    'views/home/header',
    'text!templates/messages/index.html',
    'Session',

], function (_, Backbone, Common, MessagesCollection, MessageView, HeaderView, MessagesTemplate, Session) {

    'use strict';

    var MessagesView = Backbone.View.extend({

        template: _.template (MessagesTemplate),
        url: Common.ApiUrl + '/messages/setRead',
        limit:  15,
        offset: 0,

        /**
         * constructor
         */
        initialize: function () {
            //validate user authen
            Session.getAuth ();
            this.messagesCollection = new MessagesCollection();
            this.receiver = Session.getUsername();
            this.hasPagi = false;
        },

        events: {
            'click li': 'fetchMessagesInPagi',
            'click #mark-all-as-read': 'markAllMessagesAsRead',
        },

        /**
         * this functions fetchs messages in pagination by click pages
         */
        fetchMessagesInPagi : function (ev) {

            var target = $(ev.currentTarget);
            var page = target.text()
            target.siblings().removeClass ('active');
            target.addClass ('active');

            //count the offset and fetch messages from rest api
            var offset = (page-1)*this.limit;
            this.fetchMessages(offset,this.limit, this.receiver);
        },

        /**
         * this function fetches messages from restful server
         */
        fetchMessages : function (offset, limit, receiver) {
            var that = this;

            //set fetch messages url with pagination
            this.messagesCollection.fetchByPagi(offset, limit, receiver);
            this.messagesCollection.fetch ({
                success: function (models, response) {

                    //display messages and pagination
                    that.displayMessages(response);
                    if(that.hasPagi === false){
                        that.showsPaginations(response.count);
                        that.hasPagi = true;
                    }
                }
            });
        },

        /**
         * this function append new messages to the view
         */
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
         * showsPaginations function add pagination pages to the view
         */
        showsPaginations : function(count){
            $('#messages-paginations').empty();
            var pages = Math.ceil(count/this.limit);
            for(var i=1; i<=pages; i++){
                if(i === 1) 
                    $('#messages-paginations').append('<li class="active hand-cursor"><a>'+i+'</a></li>');
                else
                    $('#messages-paginations').append('<li class="hand-cursor"><a>'+i+'</a></li>');
            };
        },

        /**
         * this function set all unread messages status into read
         * TODO, better way to update messages status
         */
        markAllMessagesAsRead : function () {

            var that = this;
            var receiver = Session.getUsername();
            var data = { 
                'username' : receiver, 
                'offset' : this.offset, 
                'limit' : this.limit
            }

            $('#mark-all-as-read').html('<i class="fa fa-gear fa-spin"></i>');
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
                    that.showsPaginations(response.count);
                    $('#mark-all-as-read').html('Mark all as read');
                },
                error : function (){
                    alert('Server internal error, please try again')
                    $('#mark-all-as-read').html('Mark all as read');
                }
                
            });
        },

        /**
         * renders the view template, and updates this.el with the new HTML
         */
        render: function () {
            this.$el.html (this.template());

            //fetch messages and append it to the view
            this.fetchMessages(this.offset, this.limit, this.receiver);

            return this;
        },

        onClose: function () {},

    });

    return MessagesView;
});

