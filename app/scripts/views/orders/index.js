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

        initialize: function () {

            // Bind this context to events
            _.bindAll (this, 'display', 'loadMore', 'hide');

            this.todayOrders = new OrdersCollection();
            this.todayOrders.on ('sync', this.display);

            this.yesterdayOrders = new OrdersCollection();
            this.yesterdayOrders.on ('sync', this.display);

            this.olderOrders = new OrdersCollection();
            this.olderOrders.on ('sync', this.display);
            this.olderOrders.on ('noMore', this.hide);
        },

        events: {
            'click #older-orders-load-more': 'loadMore'
        },

        hide: function () {
            this.olderOrders.selector.parent().siblings('button').prop('disabled', true);
        },

        loadMore: function () {
            this.olderOrders.offset += 10;
            this.olderOrders.fetchMore ();
        },

        display: function (collection) {
            collection.each (function (order) {
                var row = '<tr>' +
                            '<td>' + order.get('order_number') + '</td>' +
                            '<td>' + order.get('created_at') + '</td>' +
                            '<td>' + order.get('customer') + '</td>' +
                            '<td>' + order.get('job') + '</td>'+
                            '<td>' + order.get('job_title') + '</td>'+
                            '<td>{status}</td>' +
                          '</tr>';
                
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
                10 // limit
            ); 

            // Fetch yesterday orders collection
            this.fetchCollection (
                this.yesterdayOrders,
                this.$('#yesterday-orders table tbody'), 
                0,
                'created_at',
                yesterday,
                10
            );

            // Fetch older orders collection
            this.fetchCollection (
                this.olderOrders,
                this.$('#older-orders table tbody'), 
                0,
                'created_before',
                yesterday,
                10
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
            this.olderOrders.off     ('noMore');
        }
    });

    return OrdersView;
});

