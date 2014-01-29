define ([

    'underscore',
    'backbone',
    'syphon',
    'common',
    'modal', //modal dialog
    'transition', //dialog transition
    'models/order',
    'collections/statuses',
    'collections/files',
    'collections/users',
    'text!templates/orders/edit.html',
    'text!templates/orders/pdf.html',
    'views/orders/uploaded-files',
    'Session',
    // dependencies for fileupload
    'widget',
    'iframe_transport',
    'fileupload',
    'maskedinput',
    'select2',

], function (_, Backbone, Syphon, Common, Modal, Transition, OrderModel, StatusesCollection, FilesCollection, 
        UsersCollection, EditOrdersTemplate, pdfTemplate, UploadedFilesView, Session) {

    'use strict';

    var EditOrdersView = Backbone.View.extend ({

        template: _.template (EditOrdersTemplate),
        pdfTemplate: _.template (pdfTemplate),

        /**
         * constructor
         */
        initialize: function (options) {

            //initialise instance
            this.orderModel = new OrderModel ({id: options.id});
            this.filesCollection = new FilesCollection();
            this.usersCollection = options.usersCollection;
            this.statusesCollection = options.statusesCollection;

            //reset the render if the sync is called
            this.usersCollection.on ('sync reset', this.render, this);
            this.statusesCollection.on ('sync reset', this.render, this);

            // Fetch only when users or statuses collection is empty
            if (this.usersCollection.length === 0) 
                this.usersCollection.fetch ();
            if (this.statusesCollection.length === 0) 
                this.statusesCollection.fetch ();
        },

        events: {
            'submit': 'updateOrder',
            'click #redirect-to-orders': 'redirectToOrders',
        },


        /**
         * returnToAllOrders function dismiss the dialog and redirect all orders page
         */
        redirectToOrders: function () {
            //dismiss the modal dialog
            this.$('#edit-submit-dialog').modal('hide');
            //hidden.bs.modal will wait modal transition to complete, then redirect the page
            this.$('#edit-submit-dialog').on('hidden.bs.modal', function () {
                //redirect to orders page
                window.location.hash = 'orders';
            });
        },

        /**
         * updateOrder function updates the order via put method
         */
        updateOrder: function (e) {
            e.preventDefault();

            //serialize the order input
            var _this = this;
            var input = Backbone.Syphon.serialize (this);
            var creator = JSON.parse($.cookie('user')).username;
            var subscribers = _this.$('#assigned-users').val();

            var data = {
                creator: creator,
                number_of_orders: 1,
                subscribers: subscribers,
                orders: input,
            };

            this.orderModel.save (data, {
                success: function (model) {
                    // update pdf template to the view
                    $('#job-bag-pdf').empty();
                    $('#job-bag-pdf').html(_this.pdfTemplate({
                        order: model.toJSON(),
                    }));

                    //display modal dialog
                    _this.$('#edit-submit-dialog').modal('show');
                },
            });
        },

        /**
         * loadFiles function load a list of files belongs to specific order
         */
        loadFiles: function (order_number) {
            var _this = this;

            // fetch file by order number 
            this.filesCollection.fetchFiles(order_number);
            this.filesCollection.fetch ({
                success: function (models, response, options) {
                    //reset the view of files
                    _this.$('#uploaded-file-list table tbody').empty();
                    if(models.length != 0) {
                        _this.$('#no-files').empty();
                        for (var i in response) {
                            var filesView = new UploadedFilesView(response[i]);
                            _this.$el.find('#uploaded-file-list table tbody').append(filesView.render().el);
                        }
                    }
                }
            });
        },

        /**
         * this function add assign users to the select box
         */
        addAssignUsers : function () {
            //fetch assign users
            this.usersCollection.each (function (user) {
                var users = user.toJSON().users;
                for (var i in users) {
                    $('#assigned-users').append('<option value="'
                        + users[i].username +'">'
                        + users[i].username + '</option>');
                }
            }, this);
        },

        /**
         * renders the view template, and updates this.el with the new HTML
         */
        render: function () {
            var _this = this;

            //fetch an specific order
            this.orderModel.fetch ({
                success: function (model, response, options) {
                    // passes data to the template
                    _this.$el.html (_this.template ({
                        order: model.toJSON(),
                        statuses: _this.statusesCollection.models,
                    }));

                    //fetch files via order number
                    var order_number = model.get('order_number');
                    _this.loadFiles(order_number);
                    _this.addAssignUsers();

                    // append pdf template to the view
                    _this.$el.append(_this.pdfTemplate({
                        order: model.toJSON(),
                    }));

                    //mask date input formart
                    $("#date_in").mask("99/99/9999 99:99");
                    $("#date_approved").mask("99/99/9999 99:99");
                    $("#date_required").mask("99/99/9999 99:99");
                }
            });
            return this;
        },

        onClose: function () {},
    });

    return EditOrdersView;
});

