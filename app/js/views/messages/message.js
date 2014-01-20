
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
        },


        /**
         * renders the view templates, and update this.el with the new HTML
         */
        render: function () {

            this.$el.html (this.template ({ 
                messages : this.messages,
            }));
            return this;
        },

    });

    return MessageView;
});
