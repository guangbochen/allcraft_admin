
define ([

    'underscore',
    'backbone',
    'common',
    'text!/templates/home/header.html',
    'Session',
    'collections/notifications',
    'collections/messages',

], function (_, Backbone, Common, HeaderTemplate, Session, NotificationsCollection, MessagesCollection) {

    'use strict';

    var HeaderView = Backbone.View.extend({

        template: _.template (HeaderTemplate),

        initialize: function () {

            // Bind this context to events
            _.bindAll (this, 'logout', 'pullNotification');
            this.notificationsCollection = new NotificationsCollection();
            this.messagesCollection = new MessagesCollection();
        },

        events: {
            'click #logout': 'logout',
            'mouseover #notifications': 'openDorpdown',
            'mouseleave #notifications': 'closeDropdown',
            'mouseover #messages': 'openDorpdown',
            'mouseleave #messages': 'closeDropdown',
        },

        /**
         * logout function manages user logout function
         */
        logout : function () {
            Session.logout();
        },

        /**
         * pullNotification function is triggered by the app.js when pubnub push new notifications
         */
        pullNotification : function (message) {
            $('#notifications-count').append('<div id="notification-count"> <span class="count">new</span> </div>');
            $('#notifications-menu').prepend(' <li role="presentation"> ' 
                + '<a href="#/notifications" class="support-ticket"> '
                + '<div class="picture"> <span class="label label-important"><i class="fa fa-bookmark"></i></span> </div>'
                + '<div class="details"> ' + message.description
                + '</div> </a> </li>');
            this.loadMessages();
        },

        /**
         * this function open drop down menu
         */
        openDorpdown : function (ev) {
            var target = ev.currentTarget.id;
            $('#'+target).addClass('open');
        },

        /**
         * this function close drop down menu
         */
        closeDropdown : function (ev) {
            var target = ev.currentTarget.id;
            $('#'+target).removeClass('open');
            if(target === 'notifications')
                $('#notification-count').empty();
        },

        /**
         * this function add see all button to notifications dropdown menu
         */
        appendSeeAllButtonToNotifications: function () {
            $('#notifications-menu').append(' <li role="presentation"> '
                            + '<a href="#/notifications" class="text-align-center see-all"> '
                            + 'See all notifications <i class="fa fa-arrow-right"></i> </a> </li>');
        },

        /**
         * this function add see all button to messages dropdown menu
         */
        appendSeeAllButtonToMessages: function () {
            $('#messages-menu').append(' <li role="presentation"> '
                            + '<a href="#/messages" class="text-align-center see-all"> '
                            + 'See all messages <i class="fa fa-arrow-right"></i> </a> </li>');
        },

        /**
         * loadNotifications fetches latest notifications from api
         */
        loadNotifications : function () {
            var that = this;
            this.notificationsCollection.fetch({
                success: function (models, response){
                    $('#notifcations-menu').empty();
                    var notifications = response.notifications;
                    for (var i in notifications) {
                        $('#notifications-menu').append(' <li role="presentation"> ' 
                            + '<a href="#/notifications" class="support-ticket"> '
                            + '<div class="picture"> <span class="label label-success"><i class="fa fa-bookmark"></i></span> </div>'
                            + '<div class="details"> ' + notifications[i].description
                            + '</div> </a> </li>');
                    };
                    that.appendSeeAllButtonToNotifications();
                }
            });
        },

        /**
         * loadNotifications fetches latest notifications from api
         */
        loadMessages : function () {
            var that = this;
            this.messagesCollection.countUnreadMessags();
            this.messagesCollection.fetch({
                success: function (models, response){
                    var messages = response.messages;
                    $('#messages-menu').empty();
                    for (var i in messages) {
                        if(messages[i].is_read == 0)
                            var icon = '<span class="label label-danger"> <i class="fa fa-tag"></i></span> '
                        else
                            var icon = '<span class="label label-success"> <i class="fa fa-tag"></i></span> '

                        $('#messages-menu').append(' <li role="presentation"> ' 
                            + '<a href="#/messages" class="support-ticket"> '
                            + '<div class="picture"> '+ icon +'</div>'
                            + '<div class="details"> ' + messages[i].description
                            + '</div> </a> </li>');
                    };

                    //append count of unread message to header view
                    if(response.unread_messages != 0)
                        $('#messages-count').append('<span class="count">'+ response.unread_messages + '</span>');
                    else
                        $('#messages-count').empty();

                    // append see all messages button
                    that.appendSeeAllButtonToMessages();
                }
            });
        
        },

        /**
         * renders the view template, and updates this.el with the new HTML
         */
        render: function () {

            //load notifications and messages
            this.loadNotifications();
            this.loadMessages();

            // Load the compiled HTML template into the Backbone "el"
            this.$el.html (this.template());
            return this;
        },

        onClose: function () {},
    });

    return HeaderView;
});

