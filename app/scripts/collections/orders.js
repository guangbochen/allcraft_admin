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
                    _this.add (response);
                    _this.trigger ('notify', _this);
                }
            });
        },

    });

    return OrdersCollection;
    
});

