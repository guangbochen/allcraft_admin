define ([

    'backbone',
    'models/order',
    'common'

], function (Backbone, OrderModel, Common) {

    'use strict';

    var OrdersCollection = Backbone.Collection.extend ({ 

        model : OrderModel,
        url: Common.ApiUrl + '/orders',
        pubnub: Common.pubnub,

        initialize: function () {
            this.bind ('request', this.indicate, this);
            this.bind ('sync', this.disindicate, this);
            this.bind ('error', this.showError, this);
        },

        showError: function () {
        },

        indicate: function () {
            $('.indicator').show();
        },

        disindicate: function () {
            $('.indicator').hide();
        },

        sortBy: function (comparator) {
            this.comparator = comparator;
            return this.sort (comparator);
        },

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

            var _this = this;
            this.url = this.url.replaceAt (this.url.length - this.pos(this.offset), 
                                           this.offset.toString());
            this.fetch ({
                error: function () {
                    // trigger a custom event here. (the ideal is to hide the load more button)
                    _this.trigger ('noMore');
                }
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
        }

    });

    return OrdersCollection;
    
});

