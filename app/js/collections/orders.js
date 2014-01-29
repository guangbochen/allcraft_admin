define ([

    'backbone',
    'models/order',
    'common',

], function (Backbone, OrderModel, Common ) {

    'use strict';

    var OrdersCollection = Backbone.Collection.extend ({ 

        //define instances
        model : OrderModel,
        url: Common.ApiUrl + '/orders',

        initialize: function () {
            // this.bind ('request', this.indicate, this);
            // this.bind ('sync', this.disindicate, this);
        },

        indicate: function () {
            $('#indicator').show();
        },

        disindicate: function () {
            $('#indicator').hide();
        },

        sortBy: function (comparator) {
            this.comparator = comparator;
            return this.sort (comparator);
        },

        /**
         * saveOrders function post json data to the rest server
         */
        saveOrders: function (orders) {
            var _this = this;

            $.ajax ({
                url: this.url,
                data: JSON.stringify (orders),
                dataType: 'json',
                type: 'post',
                success: function (response, textStatus, xhr) {
                    _this.trigger ('notify');
                },
                error: function () {
                    alert('WARNNING: server internal error, failed to generate new orders.');
                    $('#save-orders').html('Save Orders')
                }
            });
        },

        /**
         * fetchOrdersByDate function fetch orders by date from the rest server
         */
        fetchOrdersByDate: function (query, date, limit) {
            this.url += '?' + query + '=' + date + '&limit=' + limit + '&offset=' + this.offset;
            this.fetch();
        },

        /**
         * fetchMore function loads older orders by date from the rest server
         */
        fetchMore: function () {

            var _this = this;
            this.url = this.url.replaceAt ( this.url.length - this.pos(this.offset),
                    this.offset.toString());
            this.fetch ({
                success: function(response) {
                    if(response.length == 0) _this.trigger ('noMore');
                },
            });
        },

        pos: function (offset) {
            if (offset > 10)
                return 2;
            else if (offset > 100)
                return 3;
            else if (offset > 1000)
                return 4;
            else
                return 1;
        },

    });

    return OrdersCollection;
    
});
 
