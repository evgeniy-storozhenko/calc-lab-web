define([
    'dojo/_base/declare',
    'dojo/window',
    "dojo/_base/lang",
    'calclab/ui/editors/BaseEditor',
    'cm/lib/codemirror',
    'cm/mode/calclab/calclab',
    'dojo/domReady!'
], function (declare, win, lang, BaseEditor, CodeMirror) {

    var CalcEditor = declare('CalcEditor', [BaseEditor], {

        constructor: function (args) {
            lang.mixin(this, args);
        },

        init: function () {
            this.setContent(this.content);
            this.createEditor();
        },

        createEditor: function () {
            var element = document.getElementById("CalcEditor" + this.id);
            this.editor = CodeMirror.fromTextArea(element, {
                lineNumbers: true,
                mode: {name: "calclab"},
                theme: 'calclab',
                undoDepth: 20,
                undoDelay: 800,
                textWrapping: true,
                matchBrackets: true
            });
            this.setDefaultValue();
        },

        setDefaultValue: function () {
            var defaultValue = '\n';
            for (var i = 0; i < 5; i++) {
                defaultValue += defaultValue;
            }
            this.editor.setValue(defaultValue);
        }

    });

    CalcEditor.getInitialContent = function(input) {
        return '<textarea id="CalcEditor' + input.id + '"></textarea>';
    };
    return CalcEditor;
});