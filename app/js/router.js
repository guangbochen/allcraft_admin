define ([
    'backbone',
    'collections/orders',
    'views/orders/index',
    'views/orders/edit',
    'views/newOrders/new'

], function (Backbone, OrdersCollection, OrdersView, EditOrdersView, NewOrdersView) {
    'use strict';

    var AppRouter = Backbone.Router.extend ({

        //define url routes
        routes: {

            '': 'index',
            'orders': 'viewOrders',
            'orders/new': 'newOrders',
            'orders/:id/edit': 'editOrders',
            'orders/search': 'searchOrders'
        },

        index: function () {
            $('#page-content').html ('<h2> Welcome to Allcraft </h2>');
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
            // if (this.currentView)
            //     this.currentView.close();
            $('#page-content').html(view.render().el);
            // this.currentView = view;
            // return view;
        },
    });

    return AppRouter;
});

