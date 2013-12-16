define ([

    'underscore',
    'backbone',
    'syphon',
    'collections/statuses',
    'views/orders/newOrderPartial',
    'text!templates/orders/newOrdersPartial.html'

], function (_, Backbone, Syphon, StatusesCollection, NewOrderPartial, NewOrdersPartialTemplate) {
    'use strict';

    var OrdersPlaceholderView = Backbone.View.extend({

        initialize: function (options) {
            this.noOrder = options.noOrder;
        },

        tagName: 'form',

        template: _.template (NewOrdersPartialTemplate),

        render: function () {
            // Add the create orders
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
