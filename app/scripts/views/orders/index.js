define ([

    'underscore',
    'backbone',
    'collections/orders',
    'views/orders/ordersPartial',
    'text!templates/orders/index.html',
    'moment'

], function (_, Backbone, OrdersCollection, OrdersPartialView, OrdersTemplate, moment) {

    'use strict';

    var OrdersView = Backbone.View.extend({

        template: _.template (OrdersTemplate),

        initialize: function (options) {

            // Bind this context to events
            _.bindAll (this, 'display', 'loadMore');

            this.todayOrders = new OrdersCollection();
            this.todayOrders.on ('sync', this.display);

            this.yesterdayOrders = new OrdersCollection();
            this.yesterdayOrders.on ('sync', this.display);

            this.olderOrders = new OrdersCollection();
            this.olderOrders.on ('sync', this.display);
        },

        events: {
            'click #older-orders-load-more': 'loadMore'
        },

        loadMore: function () {
            this.olderOrders.offset += 5;
            this.olderOrders.fetchMore ();
        },

        display: function (collection) {
            collection.each (function (order) {
                var row = '<tr><td>' + order.get('id') + '</td>' +
                            '<td>' + order.get('order_number') + '</td>' +
                            '<td>' + order.get('customer') + '</td>' +
                            '<td>' + order.get('job') + '</td>'+
                            '<td>' + order.get('job_title') + '</td>'+
                            '<td>{status}</td></tr>';
                
                collection.selector.append (row);
            });
        },

        render: function () {
            this.$el.html ( this.template );

            var date = moment(new Date());

            // Get dates
            var today = date.format('YYYY-MM-DD');
            var yesterday = date.subtract('days', 1).format('YYYY-MM-DD');

            // Fetch today orders collection 
            this.fetchCollection (
                this.todayOrders, // collection
                this.$('#today-orders table tbody'), // selector
                0, // offset
                'created_at',  // query type
                today,  // date
                5 // limit
            ); 

            // Fetch yesterday orders collection
            this.fetchCollection (
                this.yesterdayOrders,
                this.$('#yesterday-orders table tbody'), 
                0,
                'created_at',
                yesterday,
                5
            );

            // Fetch older orders collection
            this.fetchCollection (
                this.olderOrders,
                this.$('#older-orders table tbody'), 
                0,
                'created_before',
                yesterday,
                5
            );

            return this;
        },

        fetchCollection: function (collection, selector, offset, query, date, limit) {
            collection.selector = selector;
            collection.offset = offset;
            collection.fetchOrdersByDate (query, date, limit);
        },

        onClose: function () {
            this.todayOrders.off     ('sync');
            this.yesterdayOrders.off ('sync');
            this.olderOrders.off     ('sync');
        }
    });

    return OrdersView;
});

