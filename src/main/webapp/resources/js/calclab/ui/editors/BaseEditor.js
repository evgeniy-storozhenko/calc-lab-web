define([
    'dojo/_base/declare',
    "dojo/_base/lang",
    'dijit/layout/ContentPane'
], function (declare, lang, ContentPane) {

    var BaseEditor = declare('BaseEditor', [ContentPane], {

        id: 0,
        title: "New calculation",
        isDirty: false,

        editor: null,

        constructor: function (args) {
            lang.mixin(this, args);
            if (args.id < 0) {
                this.setDefaultTitle(args);
            }
        },

        setDefaultTitle: function (args) {
            this.title += " " + (-1 * this.id) + "." + args.ext;
        },

        init: function () {
        },

        run: function() {
        }

    });

    BaseEditor.getInitialContent = function(input) {
        return '';
    };
    return BaseEditor;
});