define ([

    'underscore',
    'backbone',
    'syphon',
    'views/orders/newOrderPartial',
    'text!templates/orders/newOrdersPartial.html'

], function (_, Backbone, Syphon, NewOrderPartial, NewOrdersPartialTemplate) {
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
            // Add a single order placeholder
            
            for (var i = 1; i <= this.noOrder; i++)
            {
                var orderPlaceholderView = new NewOrderPartial({
                    orderId: i
                });
                this.$el.find('tbody').append (orderPlaceholderView.render().el);
            }

            return this;
        }
    });

    return OrdersPlaceholderView;
});
