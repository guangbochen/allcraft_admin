define ([

    'underscore',
    'backbone',
    'text!templates/notifications/notification.html',

], function (_, Backbone, NotificationTemplate) {
    'use strict';

    var NotificationView = Backbone.View.extend({

        template: _.template(NotificationTemplate),
        tagName: 'tr',

        /**
         * constructor
         */
        initialize: function (options) {
            this.notifications = options;
            this.assigned_users = 'None';
            if(options.ownSubscribers) {
                this.subscribers = options.ownSubscribers;
                this.assigned_users = '';
                for(var i in this.subscribers){
                    this.assigned_users += '<p><i class="fa fa-user noti-user"></i> ' 
                        + this.subscribers[i].receiver + '</p>';
                }
            }
        },


        /**
         * renders the view templates, and update this.el with the new HTML
         */
        render: function () {

            this.$el.html (this.template ({ 
                notifications : this.notifications,
                assigned_users: this.assigned_users,
            }));
            return this;
        },

    });

    return NotificationView;
});
