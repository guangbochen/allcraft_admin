define ([

    'backbone',
    'collections/orders',
    'views/orders/index',
    'views/orders/edit',
    'views/orders/new'

], function (Backbone, OrdersCollection, OrdersView, EditOrdersView, NewOrdersView) {
    'use strict';

    var AppRouter = Backbone.Router.extend ({

        routes: {

            '': 'index',
            'orders': 'viewOrders',
            'orders/new': 'newOrders',
            'orders/:id/edit': 'editOrders'
        },

        index: function () {
            $('#page-content').html ('<h2> Home page </h2>');
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

