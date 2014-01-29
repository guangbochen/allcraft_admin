define ([
    'jquery',
    'underscore',
    'backbone',
    'collections/users',
    'collections/statuses',
    'views/home/index',
    'views/home/header',
    'views/newOrders/new',
    'views/orders/orders',
    'views/orders/edit',
    'views/orders/copy',
    'views/search/search',
    'views/login/login',
    'views/notifications/notifications',
    'views/messages/messages',
    'Session',

], function ($, _, Backbone, UsersCollection, StatusesCollection, HomeView, HeaderView, NewOrdersView, 
    OrdersView, EditOrdersView, CopyOrdersView, SearchView, LoginView, NotificationsView, MessagesView, Session) {
    'use strict';

    var AppRouter = Backbone.Router.extend ({

        //define router url
        routes: {
            '': 'index',
            'orders': 'viewOrders',
            'orders/new': 'newOrders',
            'orders/:id/edit': 'editOrders',
            'orders/:id/copy': 'copyOrders',
            'orders/search': 'searchOrders',
            'login': 'login',
            'notifications': 'notifications',
            'messages': 'messages',
        },

        /**
         * constructor
         */
        initialize: function () {
            this.usersCollection = new UsersCollection();
            this.statusesCollection = new StatusesCollection();
            this.statusesCollection.fetch();
            this.usersCollection.fetch();
        },

        index: function () {
            this.showView (new HomeView ());
            this.activeSidebar($('#home'));
        },

        viewOrders: function () {
            this.showView (new OrdersView ());
            this.activeSidebar($('#view-orders'));
        },

        newOrders: function () {
            this.showView (new NewOrdersView ({
                usersCollection: this.usersCollection,
                statusesCollection: this.statusesCollection,
            }));
            this.activeSidebar($('#new-orders'));
        },

        editOrders: function (id) {
            var orderModel = 
            this.showView (new EditOrdersView ({
                id: id,
                usersCollection: this.usersCollection,
                statusesCollection: this.statusesCollection,
            }));
            this.activeSidebar($('#view-orders'));
        },

        copyOrders: function (id) {
            this.showView (new CopyOrdersView ({ 
                id: id, 
                usersCollection: this.usersCollection,
                statusesCollection: this.statusesCollection,
            }));
            this.activeSidebar($('#view-orders'));
        },

        searchOrders: function () {
            this.showView (new SearchView ());
            this.activeSidebar($('#search-orders'));
        },

        login: function () {
            var loginView = new LoginView();
            $('#navigation-wrapper').addClass('hide');
            $('#page-content').html(loginView.render().el);
            $('#indicator').hide();
        },

        notifications: function () {
            this.showView (new NotificationsView());
            this.activeSidebar($('#view-notifications'));
        },

        messages: function () {
            this.showView (new MessagesView());
            this.activeSidebar($('#view-messages'));
        },

        // Clean previous view and open current view
        showView:function (view) {

            if (this.currentView) this.currentView.close();
            this.currentView = view;

            //render page header template to the view
            var headerView = new HeaderView();
            $('#page-header').html(headerView.render().el);

            //render template to the view
            $('#navigation-wrapper').removeClass('hide');
            $('#page-content').html(view.render().el);
            $('#indicator').hide();
            return view;

        },

        activeSidebar: function (selector) {
            selector.addClass ('active');
            selector.siblings().removeClass ('active');
        },

    });

    return AppRouter;
});

