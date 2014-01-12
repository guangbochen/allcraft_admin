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
    'text!/templates/orders/edit.html',
    'text!/templates/orders/pdf.html',
    // dependency for fileupload
    'widget',
    'iframe_transport',
    'fileupload',

], function (_, Backbone, Syphon, Common, Modal, Transition, OrderModel, StatusesCollection, FilesCollection, EditOrdersTemplate, pdfTemplate) {

    'use strict';

    var EditOrdersView = Backbone.View.extend ({

        template: _.template (EditOrdersTemplate),
        pdfTemplate: _.template (pdfTemplate),

        // constructor
        // ====================================================
        initialize: function (options) {
            _.bindAll (this, 'updateOrder');
            this.order = new OrderModel ({id: options.id});
        },

        events: {
            'submit': 'updateOrder',
            'click #redirect-to-orders': 'redirectToOrders',
            'change .fileUpload'    : 'displayFileUpload',
            // 'click #submit-upload-files': 'redirectToOrders',
        },

        /**
         * returnToAllOrders function dismiss the dialog and redirect all orders page
         */
        displayFileUpload: function () {

            console.log('hi');
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

        // updateOrder function updates the order via put method
        // ====================================================
        updateOrder: function (e) {

            e.preventDefault();

            var input = Backbone.Syphon.serialize (this);
            var _this = this;
            this.order.save (input, {
                success: function (model) {

                    // update pdf template to the view
                    _this.$('#job-bag-pdf').empty();
                    _this.$el.append(_this.pdfTemplate({
                        order: model.toJSON(),
                    }));

                    //display modal dialog
                    _this.$('#edit-submit-dialog').modal('show');
                },
            });
        },

        // renders the view template, and updates this.el with the new HTML
        // ====================================================
        render: function () {

            var _this = this;
            var statuses = new StatusesCollection ();

            //fetch an specific order
            this.order.fetch ({
                success: function (model, response, options) {
                    //fetch all statuses
                    statuses.fetch ({
                        success: function () {
                            //passing data to the template
                            _this.$el.html (_this.template ({
                                order: model.toJSON(),
                                statuses: statuses.models
                            }));

                            // append pdf template to the view
                            _this.$el.append(_this.pdfTemplate({
                                order: model.toJSON(),
                            }));

                            //fetch files via order number
                            var order_number = model.get('order_number');
                            _this.loadFiles(order_number);
                        }
                    });
                }
            });


            return this;
        },

        /**
         * loadFiles function load a list of files belongs to specific order
         */
        loadFiles: function (order_number) {

            var _this = this;
            var filesCollection = new FilesCollection ();

            filesCollection.fetchFiles(order_number);
            filesCollection.fetch ({
                success: function (models, response, options) {
                    //remove no-files if it has
                    if(models.length != 0) _this.$('#no-files').empty();
                    for (var i in response) {
                        var row = '<tr>'
                            +'<td><a href="'+ Common.ApiUrl + response[i].download_url + '" target="_blank">'
                            +response[i].name+'</a></td>'
                            +'<td>'+response[i].size+'</td>'
                            +'<td>'+response[i].uploaded_at+'</td>'
                            //TODO need to add delete file function
                            // +'<td><button class="btn btn-inverse">Delete</button</td>' 
                            +'</tr>';

                        _this.$('#uploaded-file-list table tbody').append(row);
                    }
                }
            });
        },


        onClose: function () {
        },
    });

    return EditOrdersView;
});

