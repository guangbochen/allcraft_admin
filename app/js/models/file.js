
define ([
    'backbone',
    'common',

], function (Backbone, Common) {

    'use strict';

    // add status model
    var FileModel = Backbone.Model.extend ({ 
        urlRoot: Common.ApiUrl + '/files',

        initialize: function () {
            this.bind ('request', this.indicate, this);
            this.bind ('sync', this.disindicate, this);
        },

        indicate: function () {
            $('#indicator').show();
        },

        disindicate: function () {
            $('#indicator').hide();
        },
    }); 

    return FileModel;
});
