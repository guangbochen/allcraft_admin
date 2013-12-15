define ([

    'underscore',
    'backbone',
    'syphon',
    'common',
    'views/orders/newOrdersPartial',
    'text!templates/orders/new.html'

], function (_, Backbone, Syphon, Common, NewOrdersPartial, NewOrdersTemplate) {
    'use strict';

    var NewOrdersView = Backbone.View.extend({

        template: _.template (NewOrdersTemplate),

        initialize: function (options) {
            this.ordersCollection = options.ordersCollection;

            _.bindAll (this, 'push', 'render');

            // Notify when collection has been added new models
            this.ordersCollection.on ('notify', this.push);
        },

        events: {
            'click #generate_orders': 'generateOrders',
            'submit': 'saveOrders'
        },

        push: function () {
            // Send username for private msg and broadcast notification
            console.log ('notify');
            this.render();
        },

        generateOrders: function () {
            var noOrder = this.$('#number_of_order').val();
            // Add the create orders section
            var ordersPlaceholderView = new NewOrdersPartial({ noOrder: noOrder });
            this.$('#orders').html (ordersPlaceholderView.render().el);

            this.$('#order-table').width (this.$('#order-table table').width());
        },

        saveOrders: function (e) {

            e.preventDefault();

            // Iterate orders input from the user and format them to an array
            var orders = $.map( Backbone.Syphon.serialize (this), function (order) { 
                return order; 
            });

            // save orders to local collection and server
            this.ordersCollection.saveOrders (orders);
        },

        render: function () {

            // unbind notify event to prevent memory leaks and zombies views ?
            this.$el.html (this.template);
            return this;
        },

        onClose: function () {
            this.ordersCollection.off ('notify');
        }
    });

    return NewOrdersView;
});

