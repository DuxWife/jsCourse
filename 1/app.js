'use strict';

function numberToObject(n) {
    if (!Number.isInteger(n) || n < 0 || n > 999) {
        console.log('Ошибка! Нужно ввести целое число от 0 до 999');
        return {};
    }
    return {
        units: n % 10,
        tens: Math.floor(n / 10 % 10),
        hundreds: Math.floor(n / 100)
    }
}

let num = prompt('Введите целое число от 0 до 999');
console.log(numberToObject(num));
