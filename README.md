# Sparkcentral Coding Challenge

### To run:

node ./index.js

### Usage:

    var Calculator = require('./calculator');

    var calculator = new Calculator();

    var result = calculator.calculate('5 * 6');

    if (result instanceof Error) {
        console.error('calculation error:', result);
    }

    console.log(result);