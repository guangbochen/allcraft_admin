define ([

    'underscore',
    'backbone',
    'text!/templates/newOrders/newOrderPartial.html'

], function (_, Backbone, NewOrderPartialTemplate) {
    'use strict';

    var OrderPlaceholderView = Backbone.View.extend({

        tagName: 'tr',

        template: _.template (NewOrderPartialTemplate),

        initialize: function (options) {
            this.orderId = options.orderId;
            this.statuses = options.statuses;
        },

        render: function () {
            this.$el.html (this.template ({ 
                orderId: this.orderId,
                statuses: this.statuses.models
            }));
            return this;
        }
    });

    return OrderPlaceholderView;
});
