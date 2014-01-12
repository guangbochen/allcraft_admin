define ([

    'underscore',
    'backbone',
    'collections/orders',
    'collections/searchs',
    'text!/templates/orders/orders.html',
    'moment',
    'views/search/search',

], function (_, Backbone, OrdersCollection, SearchsCollection, OrdersTemplate, moment, SearchView) {

    'use strict';

    var OrdersView = Backbone.View.extend({

        template: _.template (OrdersTemplate),

        // Constructor
        // ==================
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
            'click #older-orders-load-more': 'loadMore',
            'submit': 'searchOrders',
            'click #orders-refresh': 'render',
        },

        // hide function disable load more button once it has no orders to load
        // ==========================
        hide: function () {
            this.olderOrders.selector.parent().siblings('button').prop('disabled', true);
        },

        // load more function loads older orders
        // ==========================
        loadMore: function () {
            this.olderOrders.offset += 10;
            this.olderOrders.fetchMore ();
        },

        // display function add the loaded orders to the html
        // ==========================
        display: function (collection) {

            var _this = this;
            //remove loading icon
            if(collection.loading) collection.loading.empty();
            collection.each (function (order) {
                var row = '<tr>' +
                            '<td> <a href="#/orders/' + order.get('id') + '/edit' +
                            '" class="btn btn-default" id="edit-order">Edit</a> </td>' +
                            '<td> <a href="#/orders/' + order.get('id') + '/copy' +
                            '" class="btn btn-warning" id="edit-order">Copy</a> </td>' +
                            '<td>' + order.get('order_number') + '</td>' +
                            '<td>' + order.get('created_at') + '</td>' +
                            '<td>' + order.get('customer') + '</td>' +
                            '<td>' + order.get('job') + '</td>'+
                            '<td>' + order.get('job_title') + '</td>'+
                            _this.statusColor (order.get('status')) +
                          '</tr>';
                
                if(collection.selector) collection.selector.append (row);
                else   _this.$('#searched-orders table tbody').append(row);
            });

        },

        // statusColor function set the bgcolor of the status column upon its status
        // ==========================
        statusColor: function (status) {
            switch (status) 
            {
                case 'a': return '<td class="red">' + status + '</td>'; 
                case 'b': return '<td class="blue">' + status + '</td>';
                case 'c': return '<td class="green">' + status + '</td>';
            }
            return '<td class="white">' + status + '</td>';
        },

        // renders the view template, and updates this.el with the new HTML
        // ==========================
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
                999, // limit,
                this.$('#today-loading-orders') // loading icon
            ); 

            // Fetch yesterday orders collection
            this.fetchCollection (
                this.yesterdayOrders,
                this.$('#yesterday-orders table tbody'), 
                0,
                'created_at',
                yesterday,
                999,
                this.$('#yesterday-loading-orders')
            );

            // Fetch older orders collection
            this.fetchCollection (
                this.olderOrders,
                this.$('#older-orders table tbody'), 
                0,
                'created_before',
                yesterday,
                10,
                this.$('#older-loading-orders')
            );

            this.$('#searched-orders').hide();
            return this;
        },


        // fetchCollection function loads the orders upon its input paramaters
        // ====================================================
        fetchCollection: function (collection, selector, offset, query, date, limit, loading) {
            collection.selector = selector;
            collection.offset = offset;
            collection.fetchOrdersByDate (query, date, limit);
            collection.loading = loading;
        },

        onClose: function () {
            this.todayOrders.off     ('sync');
            this.yesterdayOrders.off ('sync');
            this.olderOrders.off     ('sync');
            this.olderOrders.off     ('noMore');
        },

        // search orders by customer, order numbers and status
        // ====================================================
        searchOrders: function (e) {

            e.preventDefault();

            //get input searching value
            var value = this.$('#orders-search-query').val();
            var _this = this;

            //validate searching input
            if(!value) return;

            //initalise search collection
            var searchCollection = new SearchsCollection();
            searchCollection.searchOrdersBy(value);
            searchCollection.fetch ({
                success: function (models, response, options) {

                    //refresh the html view
                    _this.$('#searched-orders table tbody').empty();
                    _this.$('#searched-orders').show();
                    _this.$('#all-orders').hide();
                    _this.$('#searching-result').empty();
                    _this.$('#orders-search-query').val('');

                    if(models.length == 0) 
                    {
                        _this.$('#searching-result').html(
                            '<section class="my-search-result"> <h2>' +
                            'No orders found for <Strong>' + value +
                            '. </strong></h2> </section>');
                    }
                    else{
                        _this.display(models);
                    }
                },
                error: function () {
                    alert('no relevant searching result is provided');
                },
            });
        },

    });

    return OrdersView;
});

