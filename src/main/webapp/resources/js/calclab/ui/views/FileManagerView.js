define([
    'dojo/_base/declare',
    "dojo/store/Memory",
    "dijit/tree/ObjectStoreModel",
    "dijit/Tree"
], function (declare, Memory, ObjectStoreModel, Tree) {


    return declare(null, {

        tree: null,

        constructor: function() {
            var store = new Memory({
                data: [
                    { id: 0, label: "root"},
                    {id: 1, label: "hello", parent: 0},
                    {id: 2, label: "world", parent: 0},
                ],
                getChildren: function(object){
                    return this.query({parent: object.id});
                }
            });

            // Create the model
            var model = new ObjectStoreModel({
                store: store,
                query: {id: 0},
                labelAttr: "label"
            });

            // Custom TreeNode class (based on dijit.TreeNode) that allows rich text labels
            var MyTreeNode = declare(Tree._TreeNode, {
                _setLabelAttr: {node: "labelNode", type: "innerHTML"}
            });

            // Create the Tree.
            this.tree = new Tree({
                model: model,
                _createTreeNode: function(args){
                    return new MyTreeNode(args);
                }
            });
        }

    });
});