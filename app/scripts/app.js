define ([

    'router',

], function (Router) {

    String.prototype.trunc = function(n, useWordBoundary) {
        var toLong = this.length>n,
                s_ = toLong ? this.substr(0,n-1) : this;
                s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
        return  toLong ? s_ + '&hellip;' : s_;
    };

    var initialize = function () {
        var router = new Router();
        Backbone.history.start();
    };

    return { initialize: initialize };
});

