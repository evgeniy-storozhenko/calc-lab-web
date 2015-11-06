define([
    'dojo/_base/declare',
    'dijit/layout/TabContainer',
    'dojo/_base/lang',
    'calclab/ui/editors/CalcEditor',
    'dijit/layout/ContentPane'
], function (declare, TabContainer, lang, CalcEditor, ContentPane) {

    return declare('Window', [TabContainer], {

        incId: 0,
        region: "center",
        id: "contentTabs",
        tabPosition: "top",
        class: "centerPanel",

        pages: [],
        extensions: [
            {
                ext: 'clb',
                editor: CalcEditor
            }
        ],

        constructor: function (args) {
            lang.mixin(this, args);
        },

        openDefaultPage: function () {
            this.openPage({
                id: --this.incId,
                ext: this.extensions[0].ext,
                isDirty: true,
            });
        },

        openPage: function (input) {
            var extension = this.findExtension(input);
            if (extension == null) {
                console.error("Extension not found for:", input);
            }
            input.content = extension.editor.getInitialContent(input);
            var editor = new extension.editor(input);
            this.addChild(editor);
            editor.init();
        },

        findExtension: function (input) {
            for (var i = 0; i < this.extensions.length; i++) {
                if (this.extensions[i].ext == input.ext) {
                    return this.extensions[i];
                }
            }
            return null;
        }
    })

});