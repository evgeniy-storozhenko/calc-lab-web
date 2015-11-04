define([
    'dojo/_base/declare',
    'dijit/layout/ContentPane',
    'dijit/form/TextBox'
], function (declare, ContentPane, TextBox) {

    return declare(null, {

        pane: null,

        constructor: function() {
            this.pane = new ContentPane({
                'class': 'floatRight'
            });
            var login = new TextBox({

            });
            this.pane.addChild(login);
        }

    });

});