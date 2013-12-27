define ([

    'underscore',
    'backbone',
    'syphon',
    'common',
    'models/order',
    'collections/statuses',
    'text!/templates/orders/edit.html'

], function (_, Backbone, Syphon, Common, OrderModel, StatusesCollection, EditOrdersTemplate) {
    'use strict';

    var EditOrdersView = Backbone.View.extend ({

        template: _.template (EditOrdersTemplate),

        initialize: function (options) {
            _.bindAll (this, 'updateOrder');
            this.order = new OrderModel ({id: options.id});
        },

        events: {
            'submit': 'updateOrder'
        },

        updateOrder: function (e) {

            e.preventDefault();

            var input = Backbone.Syphon.serialize (this);
            var _this = this;
            this.order.save (input, {
                beforeSend: function () {
                    console.log ('beforeSend');
                },
                success: function () {
                    _this.render();
                    alert ('Updated');
                }
            });

            var data = {
                username : "foo",
                is_creator : true,
                number_of_orders: "1",
                subscribers: ["bill"]
            };

            $.ajax ({
                url: Common.ApiUrl + '/push',
                data: JSON.stringify(data),
                dataType: 'json',
                type: 'post'
            });
        },

        render: function () {

            var _this = this;

            this.order.fetch ({
                success: function (model, response, options) {
                    var statuses = new StatusesCollection ();
                    statuses.fetch ({
                        success: function () {
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

