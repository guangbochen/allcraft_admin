define ([

    'underscore',
    'backbone',
    'syphon',
    'common',
    'modal', //modal dialog
    'transition', //dialog transition
    'models/order',
    'collections/statuses',
    'text!/templates/orders/edit.html',

], function (_, Backbone, Syphon, Common, Modal, Transition, OrderModel, StatusesCollection, EditOrdersTemplate) {
    'use strict';

    var EditOrdersView = Backbone.View.extend ({

        template: _.template (EditOrdersTemplate),

        // constructor
        // ====================================================
        initialize: function (options) {
            _.bindAll (this, 'updateOrder');
            this.order = new OrderModel ({id: options.id});
        },

        events: {
            'submit': 'updateOrder',
            'click #redirect-to-orders': 'redirectToOrders',
        },

        // returnToAllOrders function dismiss the dialog and redirect all orders page
        // ====================================================
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
                success: function () {
                    // _this.render();
                    _this.$('#edit-submit-dialog').modal('show');
                },
            });

            // var data = {
            //     username : "foo",
            //     is_creator : true,
            //     number_of_orders: "1",
            //     subscribers: ["bill"]
            // };

            // $.ajax ({
            //     url: Common.ApiUrl + '/push',
            //     data: JSON.stringify(data),
            //     dataType: 'json',
            //     type: 'post'
            // });
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
                        }
                    });
                }
            });
            return this;
        },

        onClose: function () {
        }
    });

    return EditOrdersView;
});

