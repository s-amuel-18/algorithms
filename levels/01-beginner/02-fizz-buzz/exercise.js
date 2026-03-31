/**
 * Fizz Buzz
 * 
 * Descripción: Implementa el juego clásico de Fizz Buzz para números del 1 al n.
 * Dificultad: BEGINNER
 * 
 * @param {number} n - Número hasta el cual generar la secuencia
 * @returns {string[]} Array de strings con las reglas de Fizz Buzz
 * 
 * Ejemplo:
 * fizzBuzz(3) // ["1", "2", "Fizz"]
 */

function fizzBuzz(n) {
    let valorActual = 1
    let resultado = []
    for (let i = 0; i < n; i++) {
        if (valorActual % 3 === 0 && valorActual % 5 === 0) {
            resultado.push('FizzBuzz')
        } else if (valorActual % 3 === 0) {
            resultado.push('Fizz')
        } else if (valorActual % 5 === 0) {
            resultado.push('Buzz')

        } else {
            resultado.push(valorActual.toString())

        }
        valorActual = valorActual + 1
    }
    console.log(resultado)
    return resultado



    // // TODO: Implementar la solución aquí

    // // Pista: Usa el operador módulo (%) para verificar múltiplos

    // throw new Error('Función no implementada');
}
console.log("✅✅✅✅")
module.exports = fizzBuzz;

