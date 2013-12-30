define ([
    'backbone',
    'common'

], function (Backbone, Common) {

    'use strict';

    // add status model
    var StatusModel = Backbone.Model.extend ({ 
        urlRoot: Common.ApiUrl + '/statuses'
    }); 

    return StatusModel;
});
