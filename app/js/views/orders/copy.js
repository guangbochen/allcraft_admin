define ([

    'underscore',
    'backbone',
    'syphon',
    'common',
    'modal', //modal dialog
    'transition', //dialog transition
    'models/order',
    'collections/statuses',
    'text!/templates/orders/copy.html',
    'Session',

], function (_, Backbone, Syphon, Common, Modal, Transition, OrderModel, StatusesCollection, CopyOrdersTemplate, Session) {
    'use strict';

    var CopyOrdersView = Backbone.View.extend ({

        template: _.template (CopyOrdersTemplate),
        url: Common.ApiUrl + '/orders',

        /**
         * constructor
         */
        initialize: function (options) {
            Session.getAuth ();
            _.bindAll (this, 'copyOrder');
            this.order = new OrderModel ({id: options.id});
        },

        events: {
            'submit': 'copyOrder',
            'click #redirect-to-orders': 'redirectToOrders',
        },

        
        /**
         * copyOrder function create new order by using the existing orders
         */
        copyOrder: function (e) {

            e.preventDefault();

            //serialize the order input
            var input = Backbone.Syphon.serialize (this);
            var creator = JSON.parse($.cookie('user')).username;
            var _this = this;

            var data = {
                creator : creator,
                number_of_orders: '1',
                subscribers: [],
                orders: input
            };

            //post new order via ajax
            $.ajax ({
                url: this.url,
                data: JSON.stringify (data),
                dataType: 'json',
                type: 'post',
                success: function (response, textStatus, xhr) {

                    //get new generated order number
                    for(var i in response) var order_number = response[i].order_number;

                    //display message after complete copy action
                    _this.$("#copy-submit-message").html(" <i class='fa fa-check-square-o'></i>"
                        + " Thanks, you have generated a new order '"
                        + order_number+"' successfully.");

                    //display message dialog
                    _this.$('#copy-submit-dialog').modal({ backdrop: 'static', keyboard: false });
                    _this.$('#copy-submit-dialog').modal('show');
                }
            });
        },

        /**
         * returnToAllOrders function dismiss the dialog and redirect all orders page
         */
        redirectToOrders: function () {
            //dismiss the modal dialog
            this.$('#copy-submit-dialog').modal('hide');
            //hidden.bs.modal will wait modal transition to complete, then redirect the page
            this.$('#copy-submit-dialog').on('hidden.bs.modal', function () {
                //redirect to orders page
                window.location.hash = 'orders';
            });
        },

        /**
         * renders the view template, and updates this.el with the new HTML
         */
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

        onClose: function () {},

    });
    return CopyOrdersView;
});

