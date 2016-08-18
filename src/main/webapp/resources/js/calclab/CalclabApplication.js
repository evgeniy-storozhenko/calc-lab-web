define([
    'dojo/_base/declare',
    "dojo/dom",
    "dojo/dom-style",
    'calclab/ui/common/Workbench'
], function (declare, dom, domStyle, Workbench) {

    return declare('CalclabApplication', [], {

        overlayNode: null,

        workbench: null,

        init: function() {
            this.overlayNode = dom.byId("gears-preloader");
            this.workbench = new Workbench();
            this.workbench.startup();
            this.endLoading();
        },

        endLoading:function(){
            domStyle.set(this.overlayNode,'display','none');
        }

    })();

});