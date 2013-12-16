define ([

    'backbone',
    'common'

], function (Backbone, Common) {

    'use strict';

    var StatusModel = Backbone.Model.extend ({ 
        urlRoot: Common.ApiUrl + '/statuses'
    }); 

    return StatusModel;
    
});
