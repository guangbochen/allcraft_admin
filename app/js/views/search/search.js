
define ([
    'underscore',
    'backbone',
    'collections/orders',
    'collections/searchs',
    'text!/templates/search/search.html',

], function (_, Backbone, OrdersCollection, SearchsCollection, SearchTemplate) {

    'use strict';

    var SearchView = Backbone.View.extend({

        template: _.template (SearchTemplate),

        // Constructor
        // ==================
        initialize: function () {
        },

        events: {
            'submit': 'searchOrders',
        },

        // search orders by customer, order numbers and status
        // ====================================================
        searchOrders: function (e) {
            e.preventDefault();

            //get input searching value
            var value = this.$('#orders-search-query').val();
            var _this = this;

            //validate searching input
            if(!value) return;

            //initalise search collection
            var searchCollection = new SearchsCollection();
            searchCollection.searchOrdersBy(value);
            searchCollection.fetch ({
                success: function (models, response, options) {
                    if(models.length == 0) 
                    {
                        _this.$('#searched-orders table tbody').empty();
                        _this.$('#searching-result').html(
                            '<section class="my-search-result"> <h2>' +
                            'No orders found for <Strong>' + value +
                            '. </strong></h2> </section>');
                    }
                    else{
                        // console.log(models.toJSON());
                        _this.display(models);
                    }
                },
                error: function () {
                    alert('no relevant searching result is provided');
                },
            });
        },

        // display function add the loaded orders to the html
        // ==========================
        display: function (collection) {

            var _this = this;
            _this.$el.html (_this.template);
            collection.each (function (order) {
                var row = '<tr>' + '<td> <a href="#/orders/' + order.get('id') + '/edit' +
                            '" class="btn btn-default" id="edit-order">Edit</a> </td>' +
                            '<td> <a href="#/orders/' + order.get('id') + '/copy' +
                            '" class="btn btn-warning" id="edit-order">Copy</a> </td>' +
                            '<td>' + order.get('order_number') + '</td>' +
                            '<td>' + order.get('created_at') + '</td>' +
                            '<td>' + order.get('customer') + '</td>' +
                            '<td>' + order.get('job') + '</td>'+
                            '<td>' + order.get('job_title') + '</td>'+
                            _this.statusColor (order.get('status')) + '</tr>';
                
                // collection.selector.append (row);
                _this.$('#searched-orders table tbody').append(row);
            });
        },

        // statusColor function set the bgcolor of the status column upon its status
        // ==========================
        statusColor: function (status) {
            switch (status) 
            {
                case 'a': return '<td class="red">' + status + '</td>'; 
                case 'b': return '<td class="blue">' + status + '</td>';
                case 'c': return '<td class="green">' + status + '</td>';
            }
            return '<td class="white">' + status + '</td>';
        },

        // renders the view template, and updates this.el with the new HTML
        // ==========================
        render: function () {
            this.$el.html (this.template);
            return this;
        },
    });

    return SearchView;
});

