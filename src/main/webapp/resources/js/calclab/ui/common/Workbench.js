define([
    'dojo/_base/declare',
    "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "calclab/ui/menus/MainMenu",
    "calclab/ui/menus/Toolbar",
    "calclab/ui/user/Auth",
    "dojo/domReady!"
], function (declare, BorderContainer, TabContainer, ContentPane, MainMenu, Toolbar, Auth) {

    return declare(null, {

        workbench: null,
        mainMenu: null,
        tabContainer: null,


        constructor: function () {
            this.createWorkbench();
            this.createTopContentPane();
            this.createToolbar();
            this.createLeftContentPane();
            this.createRightContentPane();
            this.createCenterContentPane();
            this.createBottomContentPane();

            this.workbench.startup();
        },

        createWorkbench: function () {
            this.workbench = new BorderContainer({
                design: "headline"
            }, "workbench");
        },

        createTopContentPane: function() {
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

        createToolbar: function() {
            var toolbar = new Toolbar({});
            var pane = new ContentPane({
                region: "top",
                "class": "edgePanel toolbarPane"
            });
            pane.addChild(toolbar.toolbar);
            this.workbench.addChild(pane);
        },

        createLeftContentPane: function() {
            this.workbench.addChild(
                new ContentPane({
                    region: "left",
                    id: "leftColumn", "class": "edgePanel",
                    content: "Sidebar content (left)",
                    splitter: true
                })
            );
        },

        createRightContentPane: function() {
            this.workbench.addChild(
                new ContentPane({
                    region: "right",
                    id: "rightColumn", "class": "edgePanel",
                    content: "Sidebar content (right)",
                    splitter: true
                })
            );
        },

        createCenterContentPane: function () {
            this.tabContainer = new TabContainer({
                region: "center",
                id: "contentTabs",
                tabPosition: "top",
                "class": "centerPanel"
            });

            this.tabContainer.addChild(
                new ContentPane({
                    content: "Center",
                    title: "Group 1"
                })
            );

            this.workbench.addChild(this.tabContainer);
        },

        createBottomContentPane: function() {
            this.workbench.addChild(
                new ContentPane({
                    region: "bottom",
                    id: "bottomColumn", "class": "edgePanel",
                    content: "Sidebar content (bottom)",
                    splitter: true
                })
            );
        },
    });

});
