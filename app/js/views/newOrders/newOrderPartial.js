define ([

    'underscore',
    'backbone',
    'text!/templates/newOrders/newOrderPartial.html'

], function (_, Backbone, NewOrderPartialTemplate) {
    'use strict';

    var OrderPlaceholderView = Backbone.View.extend({

        //compile the new order partial template
        template: _.template (NewOrderPartialTemplate),
        tagName: 'tr',

        /**
         * constructor
         */
        initialize: function (options) {

            this.count = options.count;
            this.orderId = options.orderId;
            this.statuses = options.statuses;
        },


        /**
         * renders the view templates, and update this.el with the new HTML
         */
        render: function () {

            this.$el.html (this.template ({ 
                //load the default order id and status collection
                orderId: this.orderId,
                statuses: this.statuses.models,
                count: this.count,
                orderNumber: this.addOrderNumber(this.orderId),
            }));
            return this;
        },

        addOrderNumber: function (orderNumber) {
            var str = "" + orderNumber;
            var pad = "00000";
            str = pad.substring(0, pad.length - str.length) + str;
            var newOrderNumber = 'AC' + str;
            return newOrderNumber;
        },

    });

    return OrderPlaceholderView;
});
