function addition(x, y) {
    return x + y;
}

function subtraction(x, y) {
    return x - y;
}

function division(x, y) {
    return x / y;
}

function multiplication(x, y) {
    return x * y;
}

function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case 'addition':
            return addition(arg1, arg2);
        case 'subtraction':
            return subtraction(arg1, arg2);
        case 'division':
            return division(arg1, arg2);
        case 'multiplication':
            return multiplication(arg1, arg2);
    }
}