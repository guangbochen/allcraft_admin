
define ([

    'underscore',
    'backbone',
    'common',
    'text!/templates/notifications/index.html',
    'Session',
    'collections/notifications',
    'views/notifications/notification',

], function (_, Backbone, Common, NotificationsTemplate, Session, NotificationCollection, NotificationView) {

    'use strict';

    var NotificationsView = Backbone.View.extend({

        template: _.template (NotificationsTemplate),
        limit:  10,

        /**
         * constructor
         */
        initialize: function () {
            _.bindAll (this, 'fetchNotificationsByPagi');
            this.notifications = new NotificationCollection();
        },

        events: {
            'click li': 'fetchNotificationsByPagi',
        },

        /**
         * this functions fetchs notifications in pagination by click pages
         */
        fetchNotificationsByPagi : function (ev) {

            var target = $(ev.currentTarget);
            var page = target.text()
            target.siblings().removeClass ('active');
            target.addClass ('active');

            var offset = (page-1)*this.limit;
            this.fetchNotifications(offset,this.limit);
        },

        /**
         * this method fetches notifcation from restful server
         */
        fetchNotifications : function (offset, limit) {
            var that = this;

            if(offset != undefined && limit)
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
                    }

                }
            });
        },

        /**
         * showsPaginations function add pagination pages to the view
         */
        showsPaginations : function(){

            var that = this;
            this.notifications.fetch ({
                success: function (models, response) {
                    var pages = Math.ceil(response.count/that.limit);
                    for(var i=1; i<=pages; i++){
                        if(i === 1) 
                            $('#notifications-paginations') .append('<li class="active hand-cursor"><a>'+i+'</a></li>');
                        else
                            $('#notifications-paginations').append('<li class="hand-cursor"><a>'+i+'</a></li>');
                    
                    };

                }
            });
        },

        /**
         * renders the view template, and updates this.el with the new HTML
         */
        render: function () {
            // Load the compiled HTML template into the Backbone "el"
            this.$el.html (this.template);

            //fetch notifications and append to the view
            this.fetchNotifications();
            this.showsPaginations();

            return this;
        },

        onClose: function () {},

    });

    return NotificationsView;
});

