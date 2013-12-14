define ([

    'backbone',
    'collections/orders',
    'views/orders/index',
    'views/orders/new'

], function (Backbone, OrdersCollection, OrdersView, NewOrdersView) {
    'use strict';

    var AppRouter = Backbone.Router.extend ({

        routes: {

            '': 'index',
            'orders': 'viewOrders',
            'orders/new': 'newOrders'
        },

        activeHomeSidebar: function () {
            $('#new-orders').removeClass ('active');
            $('#view-orders').removeClass ('active');
            $('#home').addClass ('active');
        },

        activeNewOrdersSidebar: function () {
            $('#home').removeClass ('active');
            $('#view-orders').removeClass ('active');
            $('#new-orders').addClass ('active');
        },
        activeViewOrdersSidebar: function () {
            $('#home').removeClass ('active');
            $('#new-orders').removeClass ('active');
            $('#view-orders').addClass ('active');
        },

        index: function () {
            $('#page-content').html ('<h2> Home page </h2>');
            this.activeHomeSidebar();
        },

        viewOrders: function () {
            var ordersView = new OrdersView ({ ordersCollection: new OrdersCollection() });
            $('#page-content').html (ordersView.render().el);
            this.activeViewOrdersSidebar();
        },

        newOrders: function () {
            var newOrdersView = new NewOrdersView({ ordersCollection: new OrdersCollection() });
            $('#page-content').html (newOrdersView.render().el);
            this.activeNewOrdersSidebar();
        }
    });

    return AppRouter;
});

