define([
    'dojo/_base/declare',
    'dijit/Toolbar',
    'dijit/form/Button',
    'dijit/ToolbarSeparator'
], function (declare, Toolbar, Button, ToolbarSeparator) {

    return declare(null, {

        toolbar: null,

        constructor: function () {
            this.toolbar = new Toolbar({});
            this.createFileIcons();
            this.createSeparator();
            this.createEditIcons();
            this.createSeparator();
            this.createRunIcons();

            this.createLangIcons();
        },

        createSeparator: function () {
            this.toolbar.addChild(new ToolbarSeparator({}));
        },

        addToToolbar: function (buttons) {
            buttons.forEach(function (button) {
                this.toolbar.addChild(button);
            }, this);
        },

        createFileIcons: function () {
            var buttons = [
                new Button({
                    showLabel: false,
                    label: "New",
                    iconClass: "dijitEditorIcon dijitEditorIconNewPage",
                    onClick: function() {
                        var window = app.workbench.getActiveWindow();
                        window.openDefaultPage();
                    }
                }),
                new Button({
                    showLabel: false,
                    label: "Open",
                    iconClass: "dijitEditorIcon dijitIconFolderOpen"
                }),
                new
                    Button({
                    showLabel: false,
                    label: "Save",
                    iconClass: "dijitEditorIcon dijitEditorIconSave"
                }),
                new Button({
                    showLabel: false,
                    label: "Share",
                    iconClass: "dijitEditorIcon dijitEditorIconCreateLink"
                })
            ];

            this.addToToolbar(buttons);
        },

        createEditIcons: function () {
            var buttons = [
                new Button({
                    showLabel: false,
                    label: "Undo",
                    iconClass: "dijitEditorIcon dijitEditorIconUndo"
                }),
                new Button({
                    showLabel: false,
                    label: "Redo",
                    iconClass: "dijitEditorIcon dijitEditorIconRedo"
                }),
                new Button({
                    showLabel: false,
                    label: "Cut",
                    iconClass: "dijitEditorIcon dijitEditorIconCut"
                }),
                new Button({
                    showLabel: false,
                    label: "Copy",
                    iconClass: "dijitEditorIcon dijitEditorIconCopy"
                }),
                new Button({
                    showLabel: false,
                    label: "Paste",
                    iconClass: "dijitEditorIcon dijitEditorIconPaste"
                })
            ];
            this.addToToolbar(buttons);
        },

        createRunIcons: function() {
            var buttons = [
                new Button({
                    showLabel: false,
                    label: "Calculate",
                    iconClass: "dijitEditorIcon icon-play"
                })
            ];
            this.addToToolbar(buttons);
        },

        createLangIcons: function() {
            var langPane = new Toolbar({
                'class': 'floatRight topPane'
            });
            langPane.addChild(new Button({
                showLabel: false,
                iconClass: "dijitEditorIcon enLang"
            }));
            langPane.addChild(new Button({
                showLabel: false,
                iconClass: "dijitEditorIcon frLang"
            }));
            langPane.addChild(new Button({
                showLabel: false,
                iconClass: "dijitEditorIcon deLang"
            }));
            langPane.addChild(new Button({
                showLabel: false,
                iconClass: "dijitEditorIcon chLang"
            }));
            langPane.addChild(new Button({
                showLabel: false,
                iconClass: "dijitEditorIcon ruLang"
            }));
            this.toolbar.addChild(langPane);
        }
    });
});