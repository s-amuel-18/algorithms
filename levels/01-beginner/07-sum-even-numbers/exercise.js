/**
 * Ejercicio: Suma de Números Pares
 * 
 * Crea una función que reciba un array de números y devuelva la suma
 * de todos los números pares en el array.
 * 
 * @param {number[]} numbers - Array de números
 * @returns {number} - Suma de todos los números pares
 * 
 * Ejemplos:
 * sumEvenNumbers([1, 2, 3, 4, 5]) => 6 (2 + 4)
 * sumEvenNumbers([2, 4, 6, 8]) => 20
 * sumEvenNumbers([1, 3, 5]) => 0
 * sumEvenNumbers([]) => 0
 * sumEvenNumbers([-2, -4, 1, 3]) => -6 (-2 + -4)
 */

// const countVowels = require("../06-count-vowels/exercise");

let numbers = [2, 4, 6, 8]

function sumEvenNumbers(numbers) {
    count = 0
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 === 0) {
            count += numbers[i]
        } else {
            continue
        }
    }
console.log(count)
    return count
    // TODO: Implementa la función aquí
    // Pista: Un número es par si numbers[i] % 2 === 0
}

sumEvenNumbers(numbers)
module.exports = sumEvenNumbers;
