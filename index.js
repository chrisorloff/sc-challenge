'use strict';

//CLI - ran out of time, but here are some calls...

var Calculator = require('./calculator');

var calculator = new Calculator();

//binary
var result = calculator.calculate('5 * 6');

if (result instanceof Error) {
    console.error('calculation error:', result);
}

console.log(result);

//order of precedence
var result = calculator.calculate('1 + 4 * 4 / 2');

if (result instanceof Error) {
    console.error('calculation error:', result);
}

console.log(result);

//user-defined operator
var mod = calculator.add_operator('%', function(a, b) { return a % b; });

if (mod instanceof Error) {
    console.error('error adding operator:', mod);
}

var result = calculator.calculate('9 % 3');

if (result instanceof Error) {
    console.error('calculation error:', result);
}

console.log(result);