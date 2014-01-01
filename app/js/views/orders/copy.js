define ([

    'underscore',
    'backbone',
    'syphon',
    'common',
    'modal',
    'models/order',
    'collections/statuses',
    'text!/templates/orders/copy.html',

], function (_, Backbone, Syphon, Common, Modal, OrderModel, StatusesCollection, CopyOrdersTemplate) {
    'use strict';

    var CopyOrdersView = Backbone.View.extend ({

        //define instances
        template: _.template (CopyOrdersTemplate),
        url: Common.ApiUrl + '/orders',

        // constructor
        // ==========================
        initialize: function (options) {
            _.bindAll (this, 'copyOrder');
            this.order = new OrderModel ({id: options.id});
        },

        events: {
            'submit': 'copyOrder'
        },

        // copyOrder function create new order by using the existing orders
        // ==========================
        copyOrder: function (e) {

            e.preventDefault();

            //serialize the order input
            var input = Backbone.Syphon.serialize (this);

            //post new order via ajax
            $.ajax ({
                url: this.url,
                data: JSON.stringify (input),
                dataType: 'json',
                type: 'post',
                success: function (response, textStatus, xhr) {
                    alert ('copied');
                    //redirect to orders page
                    window.location.hash = 'orders';
                }
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
                        }
                    });
                }
            });
            return this;
        },

        onClose: function () {
        }
    });

    return CopyOrdersView;
});

