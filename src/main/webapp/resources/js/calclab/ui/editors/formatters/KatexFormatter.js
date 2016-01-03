define([
    'dojo/_base/declare',
    'katex/katex.min'
], function (declare, katex) {

    return declare('KatexFormatter', [], {

        expSeparator: "<br/>",

        /**
         * Returns formatted html string with katex from input array
         * @param input
         * @returns {*}
         */
        format: function (input, level) {
            if (!level) {
                level = 0;
            }
            var output;
            output = input.map(function (expression) {
                return this[expression.type](expression, level);
            }, this).join(this.expSeparator);
            return output;
        },

        calculation: function(expression, level) {
            level++;
            var operand = this.format([expression.operand], level);
            var result = this.format([expression.result], level);

            var output = operand + ((expression.exact) ? "=" : "≈") + result;
            return katex.renderToString(output);
        },

        composite: function(expression, level) {
            level++;
            var a = this.format([expression.a], level);
            var b = this.format([expression.b], level);
            var operation = expression.operation;
            if (level > 2) {
                return "(" + a + operation + b + ")";
            }
            return a + operation + b;
        },

        number: function(expression, level) {
            level++;
            var value = expression.value;
            if (value < 0) {
                value = "(" + value + ")";
            }
            return value;
        },

        func: function(expression, level) {
            level++;
            var name = expression.name;
            var args = expression.args.map(function(arg) {
                return this.format([arg], level);
            }, this);

            return name + "(" + args.join(",") + ")";
        }


    })();
});