
define ([

    'underscore',
    'backbone',
    'text!/templates/messages/message.html',

], function (_, Backbone, MessageTemplate) {
    'use strict';

    var MessageView = Backbone.View.extend({

        template: _.template(MessageTemplate),
        tagName: 'tr',

        /**
         * constructor
         */
        initialize: function (options) {
            this.messages = options;
            this.is_read = options.is_read;
            if(this.is_read == 0)
                this.is_read = '<span class="badge badge-danger">Unread</span>';
            else
                this.is_read = '<span class="badge badge-success">Read</span>';
        },


        /**
         * renders the view templates, and update this.el with the new HTML
         */
        render: function () {

            this.$el.html (this.template ({ 
                messages : this.messages,
                is_read : this.is_read,
            }));
            return this;
        },

    });

    return MessageView;
});
