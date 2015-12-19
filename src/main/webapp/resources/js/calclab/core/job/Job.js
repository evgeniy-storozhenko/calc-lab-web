define([
    'dojo/_base/declare',
    'calclab/core/job/JobManager'
], function (declare, JobManager) {

    return declare('Job', [], {

        name: null,

        deferred: null,

        constructor: function (name, deferred) {
            this.name = name;
            this.deferred = deferred;
            JobManager.push(this);
        },

        then: function (func) {
            return this.deferred.then(func);
        }

    });
});