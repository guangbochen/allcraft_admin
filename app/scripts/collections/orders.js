define ([

    'backbone',
    'models/order',
    'common'

], function (Backbone, OrderModel, Common) {

    'use strict';

    var OrdersCollection = Backbone.Collection.extend ({ 

        model : OrderModel,
        url: Common.ApiUrl + '/orders',

        saveOrders: function (orders) {
            var _this = this;

            $.ajax ({
                url: this.url,
                data: JSON.stringify (orders),
                dataType: 'json',
                type: 'post',
                success: function (response, textStatus, xhr) {
                    _this.trigger ('notify');
                }
            });
        },

        fetchOrdersByDate: function (query, date, limit) {
            this.url += '?' + query + '=' + date + '&limit=' + limit + '&offset=' + this.offset;
            this.fetch();
        },

        fetchMore: function () {
            this.url = this.url.replaceAt (this.url.length - 1, this.offset.toString());
            this.fetch ();
        }

    });

    return OrdersCollection;
    
});

