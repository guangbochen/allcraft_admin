define ([

    'underscore',
    'backbone',
    'syphon',
    'common',
    'collections/orders',
    'views/newOrders/newOrdersPartial',
    'text!/templates/newOrders/new.html'

], function (_, Backbone, Syphon, Common, OrdersCollection, NewOrdersPartial, NewOrdersTemplate) {
    'use strict';

    var NewOrdersView = Backbone.View.extend({

        //compile the new order template using the underscore
        template: _.template (NewOrdersTemplate),

        /**
         * constructor
         */
        initialize: function () {

            //initialize orders collection
            this.ordersCollection = new OrdersCollection ();

            _.bindAll (this, 'push', 'render');

            // Notify when collection has been added new models
            this.ordersCollection.on ('notify', this.push);
        },

        /**
         * define events for new orders
         */
        events: {
            'click #generate_orders': 'generateOrders',
            'click #clear_orders': 'clearOrders',
            'submit': 'saveOrders'
        },

        /**
         * push function send broadcast message through pubnub
         */
        push: function () {
            // Send username for private msg and broadcast notification
            var data = {
                username : "foo",
                is_creator : true,
                number_of_orders: "3",
                subscribers: ["bill", "jack", "lucy"]
            };

            $.ajax ({
                url: Common.ApiUrl + '/push',
                data: JSON.stringify(data),
                dataType: 'json',
                type: 'post'
            });
            this.render();
        },

        /**
         * generateOrders function creates new orders
         */
        generateOrders: function () {
            var noOrder = this.$('#number_of_order').val();
            //if is valid order number displays new orders
            if(isFinite(String(noOrder)) && noOrder) {
                // Add the create orders section
                var ordersPlaceholderView = new NewOrdersPartial({ noOrder: noOrder });
                this.$('#orders').html (ordersPlaceholderView.render().el);
                this.$('#order-table').width (this.$('#order-table table').width() * 4);
                //removes the error message 
                this.$('#number_of_order').removeClass('parsley-validated parsley-error');
                this.$('#order-number-validation').html('');
            }
            else {
                //display validation message
                this.$('#number_of_order').focus();
                this.$('#number_of_order').addClass('parsley-validated parsley-error');
                this.$('#order-number-validation').html('Invalid order number');
            }
        },

        /**
         * clearOrders function clean the new orders has been generated
         */
        clearOrders: function () {
            this.$('#number_of_order').focus();
            this.$('#number_of_order').val('');
            this.$('#orders').html('');
        },

        /**
         * saveOrders function save array of orders through order collection
         */
        saveOrders: function (e) {
            e.preventDefault();

            // Iterate orders input from the user and format them to an array
            var orders = $.map( Backbone.Syphon.serialize (this), function (order) { 
                return order; 
            });

            // call orders collection and save orders into the server
            this.ordersCollection.saveOrders (orders);
        },

        /**
         * renders the view template, and updates this.el with the new HTML
         */
        render: function () {
            // Load the compiled HTML template into the Backbone "el"
            this.$el.html (this.template);
            return this;
        },

        onClose: function () {
            // unbind notify event to prevent memory leaks and zombies views ?
            this.ordersCollection.off ('notify');
        }
    });

    return NewOrdersView;
});

