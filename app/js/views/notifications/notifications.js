define ([

    'underscore',
    'backbone',
    'common',
    'text!templates/notifications/index.html',
    'Session',
    'collections/notifications',
    'views/notifications/notification',

], function (_, Backbone, Common, NotificationsTemplate, Session,
    NotificationCollection, NotificationView) {

    'use strict';

    var NotificationsView = Backbone.View.extend({

        template: _.template (NotificationsTemplate),
        limit:  15,
        offset: 0,

        /**
         * constructor
         */
        initialize: function () {
            //validate user authen
            Session.getAuth ();

            //initialise instance
            this.notifications = new NotificationCollection();
            this.hasPagi = false;

        },

        events: {
            'click li': 'fetchNotificationsInPagi',
        },

        /**
         * this functions fetchs notifications in pagination when click page numbers
         */
        fetchNotificationsInPagi : function (ev) {

            var target = $(ev.currentTarget);
            var page = target.text()
            target.siblings().removeClass ('active');
            target.addClass ('active');

            var offset = (page-1)*this.limit;
            this.fetchNotifications(offset,this.limit);
        },

        /**
         * this function fetches notifcations from rest api
         */
        fetchNotifications : function (offset, limit) {
            var that = this;

            this.notifications.fetchByPagi(offset, limit);

            this.notifications.fetch ({
                success: function (models, response) {
                    var notificationView = null;
                    $('#notifications-table-body').empty();
                    // Add a single order placeholder
                    var notifications = response.notifications;
                    for (var i in notifications) {
                        notificationView = new NotificationView(notifications[i]);
                        that.$el.find('tbody').append(notificationView.render().el);
                    };

                    // dispalays paginations if is not shown
                    if(that.hasPagi === false){
                        that.showsPaginations(response.count);
                        that.hasPagi = true;
                    }
                }
            });
        },

        /**
         * showsPaginations function append pagination pages to the view
         */
        showsPaginations : function(count){

            var pages = Math.ceil(count/this.limit);
            for(var i=1; i<=pages; i++){
                if(i === 1) 
                    $('#notifications-paginations').append('<li class="active hand-cursor"><a>'+i+'</a></li>');
                else
                    $('#notifications-paginations').append('<li class="hand-cursor"><a>'+i+'</a></li>');
            
            };

        },

        /**
         * renders the view template, and updates this.el with the new HTML
         */
        render: function () {
            this.$el.html (this.template);

            // fetch notifications and append to the view
            this.fetchNotifications(this.offset, this.limit);
            this.showsPaginations();

            return this;
        },

        onClose: function () {},

    });

    return NotificationsView;
});

