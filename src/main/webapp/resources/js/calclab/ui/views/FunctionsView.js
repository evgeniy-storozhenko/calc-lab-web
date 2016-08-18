define([
    'dojo/_base/declare',
    'dijit/layout/ContentPane',
    'dojo/store/Memory',
    'dojo/store/Observable',
    'dojo/_base/xhr',
    'calclab/core/job/Job'
], function (declare, ContentPane, Memory, Observable, xhr, Job) {

    return declare("FunctionsView", [ContentPane], {

        title: "Functions",

        url: "rs/calculationService/functions",

        store: null,

        startup: function () {
            this.inherited(arguments);
            this.initStore();
        },

        initStore: function() {
            var self = this;
            this.getFunctions().then(function (functions) {
                this.self = Observable(new Memory({data: functions}));
            });
        },

        getFunctions: function() {
            var request = xhr.get({
                url: this.url,
                handleAs: "json"
            });
            return new Job("Get functions list", request);
        }

    });
});