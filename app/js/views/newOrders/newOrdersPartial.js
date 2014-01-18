define ([

    'underscore',
    'backbone',
    'syphon',
    'models/lastOrder',
    'collections/statuses',
    'views/newOrders/newOrderPartial',
    'text!/templates/newOrders/newOrdersPartial.html'

], function (_, Backbone, Syphon, LastOrder, StatusesCollection, NewOrderPartial, NewOrdersPartialTemplate) {
    'use strict';

    var OrdersPlaceholderView = Backbone.View.extend({

        //compile the new orders partial template
        template: _.template (NewOrdersPartialTemplate),
        tagName: 'form',

        // constructor
        // ==========================
        initialize: function (options) {
            this.noOrder = options.noOrder;
        },

        // renders the view template, and updates this.el with the new HTML
        // ==========================
        render: function () {
            // Load the compiled HTML template into the Backbone "el"
            this.$el.html (this.template);

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
                            for (var i = 1; i <= _this.noOrder; i++) {
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

            return this;
        },

    });
    return OrdersPlaceholderView;
});
