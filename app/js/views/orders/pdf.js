define ([

    'underscore',
    'backbone',
    'syphon',
    'common',
    'modal', //modal dialog
    'transition', //dialog transition
    'models/order',
    'collections/statuses',
    'text!/templates/orders/pdf.html',

], function (_, Backbone, Syphon, Common, Modal, Transition, OrderModel, StatusesCollection, OrderPDFTemplate) {
    'use strict';

    var OrderPDFView = Backbone.View.extend ({

        //define instances
        template: _.template (OrderPDFTemplate),
        // url: Common.ApiUrl + '/orders',

        // constructor
        // ==========================
        initialize: function (options) {
            _.bindAll (this, 'copyOrder');
            this.order = new OrderModel ({id: options.id});
        },

        events: {
            'submit': 'copyOrder',
            'click #redirect-to-orders': 'redirectToOrders',
        },

        // copyOrder function create new order by using the existing orders
        // ==========================
        copyOrder: function (e) {

            e.preventDefault();

            //serialize the order input
            var input = Backbone.Syphon.serialize (this);
            var _this = this;

            //post new order via ajax
            $.ajax ({
                url: this.url,
                data: JSON.stringify (input),
                dataType: 'json',
                type: 'post',
                success: function (response, textStatus, xhr) {

                    //display message after complete copy action
                    _this.$("#copy-submit-message").html(" <i class='fa fa-check-square-o'></i>"
                        + " Thanks, you have generated a new order '"
                        + response.order_number+"' successfully.");

                    //display message dialog
                    _this.$('#copy-submit-dialog').modal({ backdrop: 'static', keyboard: false });
                    _this.$('#copy-submit-dialog').modal('show');
                }
            });
        },

        // returnToAllOrders function dismiss the dialog and redirect all orders page
        // ====================================================
        redirectToOrders: function () {
            //dismiss the modal dialog
            this.$('#copy-submit-dialog').modal('hide');
            //hidden.bs.modal will wait modal transition to complete, then redirect the page
            this.$('#copy-submit-dialog').on('hidden.bs.modal', function () {
                //redirect to orders page
                window.location.hash = 'orders';
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
                                statuses: statuses.models,
                            }));
                        }
                    });
                }
            });
            return this;
        },

        onClose: function () {
        }
    });

    return OrderPDFView;
});

