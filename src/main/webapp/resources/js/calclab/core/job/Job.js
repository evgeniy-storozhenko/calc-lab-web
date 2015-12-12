define([
    'dojo/_base/declare'
], function (declare) {

    return declare('Job', [], {

        name: null,

        deferred: null,

        constructor: function (name, deferred) {
            console.log(name + " started");
            this.deferred = deferred;
            this.deferred.then(function () {
                console.log(name + " finished");
            });
        },

        then: function (func) {
            return this.deferred.then(func);
        }

    });
});