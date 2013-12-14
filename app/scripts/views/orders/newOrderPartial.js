define ([

    'underscore',
    'backbone',
    'syphon',
    'text!templates/orders/newOrderPartial.html'

], function (_, Backbone, Syphon, NewOrderPartialTemplate) {
    'use strict';

    var OrderPlaceholderView = Backbone.View.extend({

        tagName: 'tr',

        template: _.template (NewOrderPartialTemplate),

        initialize: function (options) {
            this.orderId = options.orderId;
        },

        render: function () {
            this.$el.html (this.template ({
                orderId: this.orderId
            }));
            return this;
        }
    });

    return OrderPlaceholderView;
});
