define([
    'dojo/_base/declare',
    'dijit/layout/ContentPane',
    'dijit/form/TextBox',
    'dijit/form/ValidationTextBox',
    'dijit/form/Button'
], function (declare, ContentPane, TextBox, ValidationTextBox, Button) {

    return declare(null, {

        pane: null,

        constructor: function() {
            this.pane = new ContentPane({
                'class': 'floatRight topPane'
            });
            var login = new TextBox({
                placeholder: "login",
                style: "width: 100px",
                'class': "auth"
            });
            var pass = new ValidationTextBox({
                type: "password",
                placeholder: "password",
                style: "width: 100px",
                'class': "auth"
            });

            var loginBtn = new Button({
                label: "Sign in",
                'class': "auth"
            });
            var regBtn = new Button({
                label: "Registration",
                'class': "auth"
            });

            this.pane.addChild(login);
            this.pane.addChild(pass);
            this.pane.addChild(loginBtn);
            this.pane.addChild(regBtn);
        }

    });

});