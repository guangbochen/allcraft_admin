define ([

    'jquery',
    'underscore',
    'backbone',
    'syphon',
    'models/lastOrder',
    'collections/statuses',
    'collections/users',
    'views/newOrders/newOrderPartial',
    'text!templates/newOrders/newOrdersPartial.html',
    'select2'

], function ($, _, Backbone, Syphon, LastOrder, StatusesCollection, UsersCollection, NewOrderPartial, NewOrdersPartialTemplate ) {
    'use strict';

    var OrdersPlaceholderView = Backbone.View.extend({

        //compile the new orders partial template
        template: _.template (NewOrdersPartialTemplate),
        tagName: 'form',

        /**
         * constructor
         */
        initialize: function (options) {

            //initialise instances
            this.count = options.count;
            this.usersCollection = options.usersCollection;
            this.statusesCollection = options.statusesCollection;
            this.lastOrder = new LastOrder();

            //reset the render if the sync is called
            this.usersCollection.on ('sync reset', this.render, this);
            this.statusesCollection.on ('sync reset', this.render, this);

            // Fetch only when users or statuses collection is empty
            if (this.usersCollection.length === 0) 
                this.usersCollection.fetch ();
            if (this.statusesCollection.length === 0) 
                this.statusesCollection.fetch ();

        },

        /**
         * fetchStatusAndOrderNumber function fetch status 
         * and generate unique order number
         */
        appendNewOrders: function() {
            //define instances
            var _this = this;

            //fetch the last order number
            this.lastOrder.fetch ({
                success: function (models) {
                    var lastOrderNumber = parseInt(models.toJSON().id);
                    // Add a single order placeholder
                    for (var i = 1; i <= _this.count; i++) {
                        var orderPlaceholderView = new NewOrderPartial({ 
                            count: i,
                            orderId: lastOrderNumber+i,
                            statuses: _this.statusesCollection,
                        });
                        _this.$el.find('tbody').append(orderPlaceholderView.render().el);
                    }
                    $('#generating-new-orders').hide();
                }
            });
        },

        /**
         * this function add assign users to the select box
         */
        addAssignUsers : function () {
            //fetch assign users
            this.usersCollection.each (function (user) {
                var users = user.toJSON().users;
                for (var i in users) {
                    this.$el.find('#assigned-users').append('<option value="'
                        + users[i].username +'">'
                        + users[i].username + '</option>');
                }
            }, this);
        },

        /**
         * renders the view template, and updates this.el with the new HTML
         */
        render: function () {
            var _this = this;
            // Load the compiled HTML template into the Backbone "el"
            this.$el.html (this.template({
                users : _this.usersCollection,
            }));

            //append new generated orders to the view
            this.appendNewOrders();

            //append assign users to the selection
            this.addAssignUsers();

            return this;
        },

    });
    return OrdersPlaceholderView;
});
