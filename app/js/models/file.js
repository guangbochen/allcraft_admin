
define ([
    'backbone',
    'common',

], function (Backbone, Common) {

    'use strict';

    // add status model
    var FileModel = Backbone.Model.extend ({ 
        urlRoot: Common.ApiUrl + '/files',

        initialize: function(){
        },
    }); 

    return FileModel;
});
