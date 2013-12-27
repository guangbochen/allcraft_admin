define ([

    'underscore',
    'backbone',
    'syphon',
    'collections/statuses',
    'views/newOrders/newOrderPartial',
    'text!/templates/newOrders/newOrdersPartial.html'

], function (_, Backbone, Syphon, StatusesCollection, NewOrderPartial, NewOrdersPartialTemplate) {
    'use strict';

    var OrdersPlaceholderView = Backbone.View.extend({

        //compile the new order partial template
        template: _.template (NewOrdersPartialTemplate),
        tagName: 'form',

        /**
         * constructor
         */
        initialize: function (options) {
            this.noOrder = options.noOrder;
        },

        /**
         * renders the view template, and updates this.el with the new HTML
         */
        render: function () {
            // Load the compiled HTML template into the Backbone "el"
            this.$el.html (this.template);

            var _this = this;
            var statusesCollection = new StatusesCollection ();
            statusesCollection.fetch ({
                success: function (models, response, options) {
                    var orderPlaceholderView = null;
                    // Add a single order placeholder
                    for (var i = 1; i <= _this.noOrder; i++)
                    {
                        orderPlaceholderView = new NewOrderPartial({ 
                            orderId: i,
                            statuses: statusesCollection
                        });
                        _this.$el.find('tbody').append (orderPlaceholderView.render().el);
                    }
                }
            });

            return this;
        }

    });
    return OrdersPlaceholderView;
});
