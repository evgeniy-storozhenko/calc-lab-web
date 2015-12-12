define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/xhr',
    'calclab/core/job/Job'
], function (declare, lang, xhr, Job) {

    return declare('CalcConfiguration', [], {

        url: "rs/calculationService/execute",

        constructor: function (args) {
            lang.mixin(this, args);
        },

        execute: function(name, input) {

            var request = xhr.post({
                url: this.url,
                handleAs: "json",
                content: { input: input }
            });

            var job = new Job(name, request);
            job.then(function(data) {
                console.log("final action")
            });
        }

    })();
});