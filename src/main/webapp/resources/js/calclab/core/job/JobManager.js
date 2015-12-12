define([
    'dojo/_base/declare',
    'dojo/_base/lang'
], function (declare, lang) {

    return declare('JobManager', {

        constructor: function (args) {
            lang.mixin(this, args);
        }

    })();
});