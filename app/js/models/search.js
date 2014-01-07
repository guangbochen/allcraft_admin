
define ([
    'backbone',
    'common',

], function (Backbone, Common) {

    'use strict';

    // add status model
    var SearchModel = Backbone.Model.extend ({ 
        urlRoot: Common.ApiUrl + '/search',

        initialize: function(){
        },
    }); 

    return SearchModel;
});
