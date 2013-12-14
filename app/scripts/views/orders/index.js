define ([

    'underscore',
    'backbone',
    'views/orders/ordersPartial',
    'text!templates/orders/index.html'

], function (_, Backbone, OrdersPartialView, OrdersTemplate) {

    'use strict';

    var OrdersView = Backbone.View.extend({

        template: _.template (OrdersTemplate),

        initialize: function (options) {
            this.ordersCollection = options.ordersCollection;
        },

        render: function () {

            var _this = this;

            console.log (this.todayOrders);

            // console.log (todayOrders);
            this.$el.html ( this.template );
            return this;
            
            // // append menu into parent template
            // var menuView = {};
            // this.menusCollection.each (function (menu) {
            //     menuView = new MenuView( { model: menu } );
            //     this.$('#menus table tbody').append (menuView.render().el);
            // }, this);
        }
    });

    return OrdersView;
});

