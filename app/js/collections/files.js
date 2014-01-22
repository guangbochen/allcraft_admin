define ([

    'backbone',
    'models/file',
    'common'

], function (Backbone, FileModel, Common) {

    'use strict';

    var FilesCollection = Backbone.Collection.extend ({ 

        //define collection model
        model : FileModel,
        url: Common.ApiUrl + '/files',

        /**
         * default constructor
         */
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

        /**
         * fetch list of files by order number
         */
        fetchFiles: function (value) {
            this.url += '/' + value ;
            this.fetch();
        },
    });

    return FilesCollection;
    
});

