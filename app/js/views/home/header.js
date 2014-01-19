
define ([

    'underscore',
    'backbone',
    'common',
    'text!/templates/home/header.html',
    'Session',
    'collections/notifications'

], function (_, Backbone, Common, HeaderTemplate, Session, NotificationsCollection) {

    'use strict';

    var HeaderView = Backbone.View.extend({

        template: _.template (HeaderTemplate),

        initialize: function () {

            // Bind this context to events
            _.bindAll (this, 'logout', 'pullNotification');
            this.notifications = new NotificationsCollection();
        },

        events: {
            'click #logout': 'logout',
            'mouseover #notifications': 'openDorpdown',
            'mouseleave #notifications': 'closeDropdown'
        },

        /**
         * logout function manages user logout function
         */
        logout : function () {
            Session.logout();
        },

        /**
         * pullNotification
         */
        pullNotification : function (message) {
            console.log('hi');
            $('#notification-icon').append('<div id="notification-count"> <span class="count">1</span> </div>');
            $('#notifications-menu').prepend(' <li role="presentation"> ' 
                + '<a href="#" class="support-ticket"> '
                + '<div class="picture"> <span class="label label-important"><i class="fa fa-bookmark"></i></span> </div>'
                + '<div class="details"> ' + message.description
                + '</div> </a> </li>');
        },

        /**
         * 
         */
        openDorpdown : function () {
            $('#notifications').addClass('open');
        },

        closeDropdown : function () {
            $('#notifications').removeClass('open');
            $('#notification-count').empty();
        },

        seeAllNotifications : function () {
            $('#notifications-menu').append(' <li role="presentation"> '
                            + '<a href="#" class="text-align-center see-all"> '
                            + 'See all notifications <i class="fa fa-arrow-right"></i> </a> </li>');
        },

        /**
         * renders the view template, and updates this.el with the new HTML
         */
        render: function () {
            // Load the compiled HTML template into the Backbone "el"
            var that = this;
            this.$el.html (this.template());

            this.notifications.fetch({
                success: function (models, response){
                    for (var i in response) {
                        $('#notifications-menu').append(' <li role="presentation"> ' 
                            + '<a class="support-ticket"> '
                            + '<div class="picture"> <span class="label label-success"><i class="fa fa-bookmark"></i></span> </div>'
                            + '<div class="details"> ' + response[i].description
                            + '</div> </a> </li>');
                    };

                    that.seeAllNotifications();
                }
            });

            return this;

        },

        onClose: function () {},
    });

    return HeaderView;
});

