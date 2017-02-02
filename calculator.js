'use strict';

function Calculator() {
    //default operators
    this.OPERATORS = {
        '+': function(a, b) { return a + b; },
        '-': function(a, b) { return a - b; },
        '*': function(a, b) { return a * b; },
        '/': function(a, b) { return a / b; }
    };
    
    //operators that require precedence when doing the calculation
    this.PRECEDENCE = ['*', '/'];
    
    //allow user to add an operator and its functionality. 
    //if the operator has precedence it should be handled here too.
    this.add_operator = function(operator, operation_func) {
        if (this.OPERATORS[operator]) {
            return new Error(`operator already exists: ${operator}`);
        }

        var defined_operator;

        for(var key in this.OPERATORS) {
            if (this.OPERATORS[key].toString() == operation_func.toString()) {
                defined_operator = operation_func;
            }
        }

        if (defined_operator) {
            return new Error(`existing operator already performs operation: ${operation_func}`);
        }

        this.OPERATORS[operator] = operation_func;
        
        return true;
    };
    
    //validate operation - ran out of time, but it would do things like 
    //check for non-existent operators, non-number operands, empty string, etc.
    this._validate_operation = function(operation) {
       return true;
    };
    
    //parse the operation string and return and ordered array (ex. 1+4*3 would be [4,3,1,'*','+''])
    this._parse_operation = function(operation) {
        var validated = this._validate_operation(operation);

        if (validated instanceof Error) {
            return validated;
        }

        var parsed_operands = [];
        var parsed_operators = [];
        var operand = '';
        var last_operation;

        for (var i = 0; i < operation.length; i++) {
            if (this.OPERATORS[operation[i]]) {
                last_operation = operation[i];

                if (this.PRECEDENCE.indexOf(last_operation) !== -1) {
                    parsed_operators.unshift(last_operation);
                    if ( operand) { 
                        parsed_operands.unshift(operand); 
                    }
                } else {
                    parsed_operators.push(last_operation);
                    if ( operand) { 
                        parsed_operands.push(operand); 
                    }
                }

                operand = '';
            } else {
                operand = parseFloat(operation[i], 10);
                if (operation.length === (i + 1)) {//last one?
                    if (operand) {
                        if (this.PRECEDENCE.indexOf(last_operation) !== -1) {
                            parsed_operands.unshift(operand); 
                        } else {
                            parsed_operands.push(operand); 
                        }
                    }
                }
            }
        }

        var parsed_operation = parsed_operands.concat(parsed_operators);

        return parsed_operation;
    };

    //meant to be called recursively. not sure this really works. the thought is to 
    //traverse the ordered array, perform the first operation on the first two operands, 
    //and remove those elements from the array. when the array has one element left, 
    //it's the final result. 
    this.process_parsed_operation = function(parsed_operation) {
        //should probably do some validation here too
        for (var i = 0; i < parsed_operation.length; i++) {
            if (this.OPERATORS[parsed_operation[i]]) {
                var operation_func = this.OPERATORS[parsed_operation[i]];
                var first_operand = parsed_operation[0];
                var second_operand = parsed_operation[1];
                var result = operation_func(second_operand, first_operand);
                parsed_operation.splice(0, 2, result);//replace first two operands with operation result
                parsed_operation.splice(i - 1, 1);//get rid of the operator
                return parsed_operation;
            } 
        }

        return parsed_operation;
    };

    this.calculate = function(operation) {
        operation = operation.replace(/\s/g, '');
       
        var parsed_operation = this._parse_operation(operation);

        if (parsed_operation instanceof Error) {
            return parsed_operation;
        }

        while (parsed_operation.length > 1) {
            this.process_parsed_operation(parsed_operation)
        }

        var result = parsed_operation[0];

        return result;
    };
};

module.exports = Calculator;