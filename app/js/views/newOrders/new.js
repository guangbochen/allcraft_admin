define ([

    'underscore',
    'backbone',
    'syphon',
    'common',
    'collections/orders',
    'views/newOrders/newOrdersPartial',
    'text!/templates/newOrders/new.html',
    'Session'

], function (_, Backbone, Syphon, Common, OrdersCollection, NewOrdersPartial, NewOrdersTemplate, Session) {
    'use strict';

    var NewOrdersView = Backbone.View.extend({

        //compile the new order template using the underscore
        template: _.template (NewOrdersTemplate),

        /**
         * constructor
         */
        initialize: function () {

            //validate user authen
            Session.getAuth ();

            //initialize orders collection
            this.ordersCollection = new OrdersCollection ();
            // _.bindAll (this, 'push', 'render');
            _.bindAll (this, 'render', 'clearOrders');

            // Notify when collection has been added new models
            this.ordersCollection.on('notify', this.notify);
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
         * generateOrders function creates new orders
         */
        generateOrders: function () {
            var count = this.$('#number_of_order').val();
            $('#new-order-alert').addClass('hide');
            //if is valid order number displays new orders
            if(isFinite(String(count)) && count) {
                // Add the create orders section
                var ordersPlaceholderView = new NewOrdersPartial({ count: count });
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
            $('#number_of_order').focus();
            $('#number_of_order').val('');
            $('#orders').html('');
            $('#new-order-alert').addClass('hide');
        },

        /**
         * saveOrders function save array of orders through order collection
         */
        saveOrders: function (e) {
            e.preventDefault();

            var that = this;
            // Iterate orders input from the user and format them to an array
            var orders = $.map( Backbone.Syphon.serialize (this), function (order) { 
                return order; 
            });
            var assigned_user = that.$('#assign-users').val();
            var count = that.$('#number_of_order').val();
            var creator = JSON.parse($.cookie('user')).username;

            var data = {
                creator : creator,
                number_of_orders: count,
                subscribers: assigned_user,
                orders: orders
            };
            // call orders collection and save orders into the server
            this.ordersCollection.saveOrders (data);
            $('#save-orders').html('<i class="fa fa-spinner fa-spin"></i>')
        },

        /**
         * notify function generates notification once generate order successfully
         */
        notify : function() {

            //display notification once generate new orders
            $('#save-orders').html('Save Orders')
            $('#orders').html('');
            $('#number_of_order').focus();
            $('#number_of_order').val('');
            $('#new-order-alert').removeClass('hide');
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

