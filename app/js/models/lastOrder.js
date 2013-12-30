define ([
    'backbone',
    'common'

], function (Backbone, Common) {

    'use strict';

    // add order model
    var LastOrderModel = Backbone.Model.extend ({ 
        urlRoot: Common.ApiUrl + '/orders/last'
    }); 

    return LastOrderModel;
});
