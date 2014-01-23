define ([

    'backbone',
    'models/file',
    'common'

], function (Backbone, FileModel, Common) {

    'use strict';

    var FilesCollection = Backbone.Collection.extend ({ 

        //define collection model
        // model : FileModel,
        url: Common.ApiUrl + '/files',

        /**
         * default constructor
         */
        initialize: function () {
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

