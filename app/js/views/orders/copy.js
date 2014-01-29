define ([

    'underscore',
    'backbone',
    'syphon',
    'common',
    'modal', //modal dialog
    'transition', //dialog transition
    'models/order',
    'collections/statuses',
    'collections/users',
    'text!templates/orders/copy.html',
    'Session',
    'select2',
    'maskedinput',

], function (_, Backbone, Syphon, Common, Modal, Transition, OrderModel, 
    StatusesCollection, UsersCollection, CopyOrdersTemplate, Session) {
    'use strict';

    var CopyOrdersView = Backbone.View.extend ({

        template: _.template (CopyOrdersTemplate),
        url: Common.ApiUrl + '/orders',

        /**
         * constructor
         */
        initialize: function (options) {

            this.order = new OrderModel ({id: options.id});
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
            'click #copy-order': 'copyOrder',
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
            var subscribers = _this.$('#assigned-users').val();

            var data = {
                creator : creator,
                number_of_orders: '1',
                subscribers: subscribers,
                orders: input
            };

            var newOrder = new OrderModel();
            newOrder.save(data, {
                success: function (models, response) {
                    //get new generated order number
                    for(var i in response) var order_number = response[i].order_number;

                    // //display message after complete copy action
                    $("#copy-submit-message").html(" <i class='fa fa-check-square-o'></i>"
                        + " Thanks, you have generated a new order '"
                        + order_number+"' successfully.");

                    //display message dialog
                    $('#copy-submit-dialog').modal({ backdrop: 'static', keyboard: false });
                    $('#copy-submit-dialog').modal('show');
                }
            });
        },

        /**
         * returnToAllOrders function dismiss the dialog and redirect all orders page
         */
        redirectToOrders: function () {
            //dismiss the modal dialog
            $('#copy-submit-dialog').modal('hide');
            //hidden.bs.modal will wait modal transition to complete, then redirect the page
            $('#copy-submit-dialog').on('hidden.bs.modal', function () {
                //redirect to orders page
                Backbone.history.navigate('#/orders', { trigger : true });
            });
        },

        /**
         * this function add assign users to the select box
         */
        addAssignUsers : function () {
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
            var statuses = new StatusesCollection ();

            //fetch an specific order
            this.order.fetch ({
                success: function (model, response, options) {
                    //passing data to the template
                    _this.$el.html (_this.template ({
                        order: model.toJSON(),
                        statuses: _this.statusesCollection.models,
                    }));

                    _this.addAssignUsers();
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
    return CopyOrdersView;
});

