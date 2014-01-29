define ([
    'backbone',
    'common',
    'collections/orders',

], function (Backbone, Common, OrdersCollection) {

    'use strict';

    // add order model
    var OrderModel = Backbone.Model.extend ({ 
        urlRoot: Common.ApiUrl + '/orders',

        initialize: function(){
            this.on ('request', this.indicate, this);
            this.on ('sync', this.disindicate, this);
        },

        indicate: function () {
            $('#update-order').html('<i class="fa fa-gear fa-spin btn"></i>');
            $('#copy-order').html('<i class="fa fa-gear fa-spin btn"></i>');
        },

        disindicate: function () {
            $('#update-order').html('Save changes');
            $('#copy-order').html('Save as new');
        },
    }); 

    return OrderModel;
});
