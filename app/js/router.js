define ([
    'backbone',
    'collections/orders',
    'views/home/index',
    'views/newOrders/new',
    'views/orders/orders',
    'views/orders/edit',
    'views/orders/copy',

], function (Backbone, OrdersCollection, HomeView, NewOrdersView, OrdersView, EditOrdersView, CopyOrdersView) {
    'use strict';

    var AppRouter = Backbone.Router.extend ({

        //define url routes
        routes: {
            '': 'index',
            'orders': 'viewOrders',
            'orders/new': 'newOrders',
            'orders/:id/edit': 'editOrders',
            'orders/:id/copy': 'copyOrders',
            'orders/search': 'searchOrders'
        },

        index: function () {
            // $('#page-content').html ('<h2> Welcome to Allcraft </h2>');
            this.showView (new HomeView ());
            this.activeSidebar($('#home'));
        },

        viewOrders: function () {
            this.showView (new OrdersView ());
            this.activeSidebar($('#view-orders'));
        },

        newOrders: function () {
            this.showView (new NewOrdersView ());
            this.activeSidebar($('#new-orders'));
        },

        editOrders: function (id) {
            this.showView (new EditOrdersView ({id: id}));
            this.activeSidebar($('#view-orders'));
        },

        copyOrders: function (id) {
            this.showView (new CopyOrdersView ({id: id}));
            this.activeSidebar($('#view-orders'));
        },

        searchOrders: function () {
            console.log ('search');
            this.activeSidebar($('#search-orders'));
        },

        activeSidebar: function (selector) {
            selector.addClass ('active');
            selector.siblings().removeClass ('active');
        },

        // Clean previous view and open current view
        showView:function (view) {
            if (this.currentView)
                this.currentView.close();
            $('#page-content').html(view.render().el);
            this.currentView = view;
            return view;
        },
    });

    return AppRouter;
});

