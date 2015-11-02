define([
    'dojo/_base/declare',
    "dojo/dom",
    "dojo/dom-style",
    'calclab/core/Workbench'
], function (declare, dom, domStyle, Workbench) {

    return declare(null, {

        overlayNode: null,

        workbench: null,

        init: function() {
            this.overlayNode = dom.byId("gears-preloader");
            this.workbench = new Workbench();

            this.endLoading();
        },

        endLoading:function(){
            domStyle.set(this.overlayNode,'display','none');
        }

    })();

});