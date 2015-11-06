define([
    'dojo/_base/declare',
    "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "calclab/ui/menus/MainMenu",
    "calclab/ui/menus/Toolbar",
    "calclab/ui/common/Window",
    "calclab/ui/views/FileManagerView",
    "calclab/ui/user/Auth",
    "dojo/domReady!"
], function (declare, BorderContainer, TabContainer, ContentPane, MainMenu, Toolbar, WorkbenchWindow, FileManagerView,
             Auth) {

    return declare(null, {

        workbench: null,
        mainMenu: null,
        windows: [],

        constructor: function () {
            this.initWorkbench();
            this.initTopContentPane();
            this.initToolbar();
            this.initLeftContentPane();
            this.initRightContentPane();
            this.initCenterContentPane();
            this.initStatusBar();

            this.workbench.startup();
        },

        initWorkbench: function () {
            this.workbench = new BorderContainer({
                design: "headline"
            }, "workbench");
        },

        initTopContentPane: function () {
            var topPane = new ContentPane({
                region: "top",
                "class": "edgePanel topPane"
            });
            var menu = new MainMenu();
            var auth = new Auth();
            topPane.addChild(menu.menuBar);
            topPane.addChild(auth.pane);

            this.workbench.addChild(topPane);
        },

        initToolbar: function () {
            var toolbar = new Toolbar({});
            var pane = new ContentPane({
                region: "top",
                "class": "edgePanel toolbarPane"
            });
            pane.addChild(toolbar.toolbar);
            this.workbench.addChild(pane);
        },

        initLeftContentPane: function () {
            var pane = new ContentPane({
                region: "left",
                id: "leftColumn", "class": "edgePanel",
                splitter: true
            });

            var tabContainer1 = new TabContainer({style: "height: 50%; width: 100%;"});
            var tabContainer2 = new TabContainer({style: "height: 50%; width: 100%;"});

            var pane1 = new ContentPane({
                title: "Files Explorer"
            });
            pane1.addChild(new FileManagerView().tree);
            tabContainer1.addChild(pane1);

            tabContainer2.addChild(
                new ContentPane({
                    content: "Center",
                    title: "Variables"
                })
            );

            pane.addChild(tabContainer1);
            pane.addChild(tabContainer2);

            this.workbench.addChild(pane);
        },

        initRightContentPane: function () {
            var pane = new ContentPane({
                region: "right",
                id: "rightColumn", "class": "edgePanel",
                splitter: true
            });

            var tabContainer1 = new TabContainer({style: "height: 50%; width: 100%;"});
            var tabContainer2 = new TabContainer({style: "height: 50%; width: 100%;"});

            tabContainer1.addChild(
                new ContentPane({
                    content: "Center",
                    title: "Functions"
                })
            );

            tabContainer2.addChild(
                new ContentPane({
                    content: "Center",
                    title: "Constants"
                })
            );

            pane.addChild(tabContainer1);
            pane.addChild(tabContainer2);

            this.workbench.addChild(pane);
        },

        initCenterContentPane: function () {
            var win = new Window();
            this.windows.push(win);
            this.workbench.addChild(win);
            win.openDefaultPage();
        },

        initStatusBar: function () {
            this.workbench.addChild(
                new ContentPane({
                    region: "bottom",
                    id: "bottomColumn", "class": "edgePanel",
                    content: "Sidebar content (bottom)"
                })
            );
        },

        getActiveWindow: function () {
            return this.windows[0];
        }
    });

});
