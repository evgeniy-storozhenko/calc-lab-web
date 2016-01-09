define([
    'dojo/_base/declare',
    'katex/katex.min'
], function (declare, katex) {

    return declare('KatexFormatter', [], {

        argsInDeg: ["sind","cosd","tgd","ctgd"],

        resInDeg: ["arcsind","arccosd","arctgd","arcctgd"],

        stepsLineEndings: "\n",

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

        getSteps: function(expression) {
            var steps = "";
            if (expression.steps) {
                steps = expression.steps.map(function(step) {
                    return step.replace(/(\r\n|\n|\r)/gm, this.expSeparator);
                }, this).join(this.expSeparator);
            }
            return steps;
        },

        calculation: function(expression, level) {
            level++;
            var operand = this.format([expression.operand], level);
            var result = this.format([expression.result], level);

            var steps = this.getSteps(expression);
            var output = operand;

            if (result != "") {
                output += ((expression.exact) ? " = " : " \\approx ") + result;
            }

            if (level == 1) {
                return katex.renderToString(output) + steps;
            }
            return output + steps;
        },

        variable: function(expression, level) {
            level++;
            var value = this.format([expression.expression], level);
            var key = expression.key;
            var steps = this.getSteps(expression);

            if (level == 1) {
                var output = key;
                if (value != "") {
                    output += ((expression.exact) ? " = " : " \\approx ") + value;
                }
                return katex.renderToString(output) + steps;
            }
            return key;
        },

        composite: function(expression, level) {
            level++;
            var a = this.format([expression.a], level);
            var b = this.format([expression.b], level);
            var operation = expression.operation;
            if (operation == "^" && b.substr(0,1) == "(") {
                b = "{" + b.substr(1, b.length - 2) + "}";
            }
            var output = a + operation + b;

            if (level > 2) {
                return "(" + output + ")";
            }
            return output;
        },

        infinity: function(expression, level) {
            return "\\infty";
        },

        number: function(expression, level) {
            level++;
            var value = expression.value;
            if (value < 0) {
                value = "(" + value + ")";
            }
            return value;
        },

        unary: function(expression, level) {
            level++;
            var operand = this.format([expression.operand], level);
            var operation = expression.operation;

            var result;
            if (expression.after) {
                result = operand + operation;
            } else {
                result = operation + operand;
            }
            return result;
        },

        string:function(expression, level) {
            return expression.value;
        },

        void: function(expression, level) {
            return "";
        },

        func: function (expression, level) {
            level++;
            var name = expression.name;
            var args = expression.args.map(function (arg) {
                return this.format([arg], level);
            }, this);

            if (this.argsInDeg.indexOf(name) != -1) {
                name = name.substr(0, name.length - 1);
                var args = args.map(function (arg) {
                    return arg + "^{\\circ}";
                }, this);
            }

            return name + "(" + args.join(",") + ")";
        }

    })();
});