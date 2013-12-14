define ([

    'backbone',
    'common'

], function (Backbone, Common) {

    'use strict';

    var OrderModel = Backbone.Model.extend ({ 
        urlRoot: Common.ApiUrl + '/orders'
    }); 

    return OrderModel;
    
});
