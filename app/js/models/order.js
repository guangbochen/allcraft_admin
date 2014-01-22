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
            $('#indicator').show();
            $('#saveOrder').html('<i class="fa fa-spinner fa-spin"></i>');
        },

        disindicate: function () {
            $('#indicator').hide();
            $('#saveOrder').html('Save Changes');
        },
    }); 

    return OrderModel;
});
