define ([

    'underscore',
    'backbone',
    'syphon',
    'models/lastOrder',
    'collections/statuses',
    'collections/users',
    'views/newOrders/newOrderPartial',
    'text!templates/newOrders/newOrdersPartial.html',
    'select2'

], function (_, Backbone, Syphon, LastOrder, StatusesCollection, UsersCollection, NewOrderPartial, NewOrdersPartialTemplate ) {
    'use strict';

    var OrdersPlaceholderView = Backbone.View.extend({

        //compile the new orders partial template
        template: _.template (NewOrdersPartialTemplate),
        tagName: 'form',

        // constructor
        // ==========================
        initialize: function (options) {
            this.count = options.count;
        },


        /**
         * fetchStatusAndOrderNumber function fetch status 
         * and generate unique order number
         */
        fetchStatusAndOrderNumber: function() {
            //define instances
            var _this = this;
            var statusesCollection = new StatusesCollection();
            var lastOrder = new LastOrder();

            //fetch array of statuses and pass to the newOrderPartial
            statusesCollection.fetch ({
                success: function (models, response, options) {

                    //fetch the last order number
                    lastOrder.fetch ({
                        success: function (models) {
                            var lastOrderNumber = parseInt(models.toJSON().id);
                            var orderPlaceholderView = null;
                            // Add a single order placeholder
                            for (var i = 1; i <= _this.count; i++) {
                                orderPlaceholderView = new NewOrderPartial({ 
                                    count: i,
                                    orderId: lastOrderNumber+i,
                                    statuses: statusesCollection,
                                });
                                _this.$el.find('tbody').append(orderPlaceholderView.render().el);
                            }
                        }
                    });
                }
            });
        },

        // renders the view template, and updates this.el with the new HTML
        // ==========================
        render: function () {
            // Load the compiled HTML template into the Backbone "el"
            this.$el.html (this.template);

            //fetch ordernumber and order status
            this.fetchStatusAndOrderNumber();

            //fetch assign users
            var usersCollection = new UsersCollection();
            usersCollection.fetch({
                success: function (models, response) {
                    var users = response.users;
                    for (var i in users) {
                        $('#assign-users').append('<option value="'
                            + users[i].username +'">'
                            + users[i].username + '</option>');
                    }
                }
            });

            return this;
        },

    });
    return OrdersPlaceholderView;
});
