
define ([
    'backbone',
    'common',

], function (Backbone, Common) {

    'use strict';

    // add status model
    var SearchModel = Backbone.Model.extend ({ 
        urlRoot: Common.ApiUrl + '/search'

        initialize: function(){
            this.results = new Results( this.get("results" ) );
            this.trigger( "search:ready", this );
        },
    }); 

    return StatusModel;
});
