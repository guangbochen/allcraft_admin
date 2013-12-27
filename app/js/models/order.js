define ([
    'backbone',
    'common'

], function (Backbone, Common) {

    'use strict';

    /**
     * add order model
     */
    var OrderModel = Backbone.Model.extend ({ 
        urlRoot: Common.ApiUrl + '/orders'
    }); 

    return OrderModel;
});
