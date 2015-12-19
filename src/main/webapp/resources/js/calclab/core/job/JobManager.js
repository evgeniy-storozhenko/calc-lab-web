define([
    'dojo/_base/declare',
    'dojo/_base/lang'
], function (declare, lang) {

    return declare('JobManager', [], {

        pool: [],

        constructor: function (args) {
            lang.mixin(this, args);
        },

        push: function(job) {
            var self = this;
            this.pool.push(job);

            job.deferred.then(function () {
                console.log(job.name + " finished");
                // todo remove from pool
            });
        }

    })();
});