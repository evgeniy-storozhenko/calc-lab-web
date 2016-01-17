define([
    'dojo/_base/declare',
    "dijit/MenuBar",
    "dijit/PopupMenuBarItem",
    "dijit/Menu",
    "dijit/MenuItem",
    "dijit/DropDownMenu"
], function (declare, MenuBar, PopupMenuBarItem, Menu, MenuItem, DropDownMenu) {

    return declare(null, {

        menuBar: null,

        constructor: function (element) {
            this.menuBar = new MenuBar({'class': 'floatLeft'});
            this.createLogo();
            this.createItemFile();
            this.createItemEdit();
            this.createItemWindow();
            this.createItemRun();
            this.createItemHelp();
        },

        createItemFile: function () {
            var items = [
                new MenuItem({
                    label: "New",
                    iconClass: "dijitEditorIcon dijitEditorIconNewPage",
                    onClick: function() {
                        var window = app.workbench.getActiveWindow();
                        window.openDefaultPage();
                    }
                }),
                new MenuItem({
                    label: "Open",
                    iconClass: "dijitEditorIcon dijitIconFolderOpen"
                }),
                new MenuItem({
                    label: "Save",
                    iconClass: "dijitEditorIcon dijitEditorIconSave"
                }),
                new MenuItem({
                    label: "Save as"
                }),
                new MenuItem({
                    label: "Share",
                    iconClass: "dijitEditorIcon dijitEditorIconCreateLink"
                }),
                new MenuItem({
                    label: "Close"
                })
            ];
            this.createItem("File", items);
        },

        createItemEdit: function () {
            var items = [
                new MenuItem({
                    label: "Undo",
                    iconClass: "dijitEditorIcon dijitEditorIconUndo"
                }),
                new MenuItem({
                    label: "Redo",
                    iconClass: "dijitEditorIcon dijitEditorIconRedo"
                }),
                new MenuItem({
                    label: "Cut",
                    iconClass: "dijitEditorIcon dijitEditorIconCut"
                }),
                new MenuItem({
                    label: "Copy",
                    iconClass: "dijitEditorIcon dijitEditorIconCopy"
                }),
                new MenuItem({
                    label: "Paste",
                    iconClass: "dijitEditorIcon dijitEditorIconPaste"
                })
            ];
            this.createItem("Edit", items);
        },

        createItemWindow: function () {
            var items = [
                new MenuItem({
                    label: "Show view"
                })
            ];
            this.createItem("Window", items);
        },

        createItemRun: function () {
            var items = [
                new MenuItem({
                    label: "Calculate",
                    iconClass: "dijitEditorIcon icon-play"
                }),
                new MenuItem({
                    label: "Preferences",
                    iconClass: "dijitEditorIcon dijitIconFunction"
                })
            ];
            this.createItem("Run", items);
        },

        createItemHelp: function () {
            var items = [
                new MenuItem({
                    label: "Docs",
                    iconClass: "dijitEditorIcon dijitIconDocuments"
                }),
                new MenuItem({
                    label: "Community",
                    iconClass: "dijitEditorIcon dijitIconUsers"
                })
            ];
            this.createItem("Help", items);
        },

        createItem: function(title, items) {
            var pSubMenu = new DropDownMenu({});
            items.forEach(function (item) {
                pSubMenu.addChild(item);
            });

            this.menuBar.addChild(new PopupMenuBarItem({
                label: title,
                popup: pSubMenu
            }));
        },

        createLogo: function() {
            var items = [
                new MenuItem({
                    label: "About"
                })
            ];
            var pSubMenu = new DropDownMenu({});
            items.forEach(function (item) {
                pSubMenu.addChild(item);
            });
            this.menuBar.addChild(new PopupMenuBarItem({
                label: '<span class="calclab-logo-label"></span><div class="calclab-logo">Cl</div>',
                'class': 'calclab-logo-block',
                popup: pSubMenu
            }));
        }
    });

});
