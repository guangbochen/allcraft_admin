define ([

    'backbone',
    'collections/orders',
    'views/orders/index',
    'views/orders/new'

], function (Backbone, OrdersCollection, OrdersView, NewOrdersView) {
    'use strict';

    var AppRouter = Backbone.Router.extend ({

        initialize: function () {
            this.ordersCollection = new OrdersCollection();
        },

        routes: {

            '': 'index',
            'orders': 'viewOrders',
            'orders/new': 'newOrders'
        },

        index: function () {
            $('#page-content').html ('<h2> Home page </h2>');
            this.activeSidebar($('#home'));
        },

        viewOrders: function () {
            this.showView (new OrdersView ({ ordersCollection: this.ordersCollection }));
            this.activeSidebar($('#view-orders'));
        },

        newOrders: function () {
            this.showView (new NewOrdersView ({ ordersCollection: this.ordersCollection }));
            this.activeSidebar($('#new-orders'));
        },

        activeSidebar: function (selector) {
            selector.addClass ('active');
            selector.siblings().removeClass ('active');
        },

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

