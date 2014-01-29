
define ([

    'underscore',
    'backbone',
    'common',
    'text!templates/orders/uploaded-files.html',

], function (_, Backbone, Common, FilesTemplate) {
    'use strict';

    var UploadedFilesView = Backbone.View.extend({

        template: _.template(FilesTemplate),
        tagName: 'tr',

        /**
         * constructor
         */
        initialize: function (options) {
            this.file = options;
        },

        /**
         * renders the view templates, and update this.el with the new HTML
         */
        render: function () {
            this.$el.html (this.template ({ 
                file : this.file,
                download_url : Common.fileUrl + this.file.download_url,
            }));
            return this;
        },

    });

    return UploadedFilesView;
});
