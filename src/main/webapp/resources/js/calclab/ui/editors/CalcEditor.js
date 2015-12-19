define([
    'dojo/_base/declare',
    'dojo/window',
    'dojo/_base/lang',
    'dojo/dom-class',
    'calclab/ui/editors/BaseEditor',
    'calclab/core/launch/CalcConfiguration',
    'dijit/layout/ContentPane',
    'dijit/form/Button',
    'cm/lib/codemirror',
    'cm/mode/calclab/calclab',
    'dojo/domReady!'
], function (declare, win, lang, domClass, BaseEditor, CalcConfiguration, ContentPane, Button, CodeMirror) {

    var CalcEditor = declare('CalcEditor', [BaseEditor], {

        sourceButton: null,

        resultButton: null,

        constructor: function (args) {
            lang.mixin(this, args);
        },

        init: function () {
            this.setContent(this.content);
            this.createButtons();
            this.createEditor();
        },

        run: function() {
            var self = this;
            this.setResult("");
            var name = "New calculation 1"; // todo remove hardcode
            var input = this.editor.getValue();
            CalcConfiguration.execute(name, input).then(function(responce) {
                self.setResult(responce.result);
            });
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

        createButtons: function () {
            this.sourceButton = new Button({
                label: "Source",
                class: "sourceButton dijitToggleButtonChecked",
                iconClass: "dijitEditorIcon icon-code",
                onClick: lang.hitch(this, this.onClickSource)
            }, "sourceButton" + this.id);

            this.resultButton = new Button({
                label: "Result",
                class: "resultButton btn-success",
                iconClass: "dijitEditorIcon icon-play",
                onClick: lang.hitch(this, this.onClickResult)
            }, "resultButton" + this.id);

            this.sourceButton.startup();
            this.resultButton.startup();
        },

        setDefaultValue: function () {
            var defaultValue = '\n';
            for (var i = 0; i < 5; i++) {
                defaultValue += defaultValue;
            }
            this.editor.setValue(defaultValue);
        },

        setResult: function(value) {
            var resultPane = document.getElementById("CalcResultTab" + this.id);
            resultPane.innerHTML = "<pre>" + value + "</pre>";
        },

        onClickSource: function () {
            this.selectSourceButton();
            this.showEditor();
        },

        onClickResult: function () {
            this.run();
            this.selectResultButton();
            this.showResult();
        },

        selectSourceButton: function() {
            domClass.add(this.sourceButton.domNode, "dijitToggleButtonChecked");
            domClass.remove(this.resultButton.domNode, "dijitToggleButtonChecked");
            domClass.add("CalcResultTab" + this.id, "displayNone");
            domClass.remove("CalcResultTab" + this.id, "displayBlock");
        },

        selectResultButton: function() {
            domClass.add(this.resultButton.domNode, "dijitToggleButtonChecked");
            domClass.remove(this.sourceButton.domNode, "dijitToggleButtonChecked");
            domClass.remove("CalcResultTab" + this.id, "displayNone");
            domClass.add("CalcResultTab" + this.id, "displayBlock");
        },

        showEditor: function() {
            domClass.add(this.editor.getWrapperElement(), "displayBlock");
            domClass.remove(this.editor.getWrapperElement(), "displayNone");
        },

        showResult: function() {
            domClass.remove(this.editor.getWrapperElement(), "displayBlock");
            domClass.add(this.editor.getWrapperElement(), "displayNone");
        }

    });

    CalcEditor.getInitialContent = function (input) {
        var sourceButton = '<button id="sourceButton' + input.id + '" type="button"></button>';
        var resultButton = '<button id="resultButton' + input.id + '" type="button"></button>';
        var editor = '<textarea id="CalcEditor' + input.id + '"></textarea>';
        var result = '<div id="CalcResultTab' + input.id + '" class="displayNone"></div>';
        return sourceButton + resultButton + editor + result;
    };
    return CalcEditor;
});