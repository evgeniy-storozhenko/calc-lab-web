define([
    'dojo/_base/declare'
], function (declare) {

    return declare('Alert', [], {

        createSuccessBox: function(title, message) {
            return '<div class="alert alert-success" role="alert"><strong>' + title + ':</strong> ' + message + '</div>';
        },

        createInfoBox: function(title, message) {
            return '<div class="alert alert-info" role="alert"><strong>' + title + ':</strong> ' + message + '</div>';
        },

        createWarningBox: function(title, message) {
            return '<div class="alert alert-warning" role="alert"><strong>' + title + ':</strong> ' + message + '</div>';
        },

        createErrorBox: function(title, message) {
            return '<div class="alert alert-danger" role="alert"><strong>' + title + ':</strong> ' + message + '</div>';
        }

    })();

});
