/**
 * Calculadora Científica Básica (Basic Scientific Calculator)
 *
 * Descripción: Implementa una clase básica `Calculator` para practicar
 * constructores, métodos de instancia, manejo de estado interno y validaciones.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 * - Estado interno: mantener el valor acumulado en this.value
 */

/**
 * Representa una calculadora con operaciones matemáticas básicas.
 * Traducción: Calculadora
 * @class
 */
class Calculator {
    /**
     * Constructor de la clase Calculator
     * Traducción: Constructor de Calculadora
     *
     * Crea una nueva calculadora con un valor inicial opcional.
     * Si no se proporciona un valor inicial, se usa 0 por defecto.
     *
     * @param {n¡umber} [initialValue=0] - Valor inicial de la calculadora (default: 0)
     *
     * TODO:
     * - Asigna el parámetro initialValue a this.value
     * - Si no se proporciona initialValue, usa 0 como valor por defecto
     */
    constructor(initialValue = 0) {
        this.value = initialValue
    }

    /**
     * Suma un número al valor acumulado.
     * Traducción: Sumar
     *
     * Este método incrementa el valor acumulado sumando el número proporcionado.
     * El comportamiento esperado es que el valor interno se incremente y se retorne el nuevo valor.
     *
     * @param {number} number - Número a sumar al valor acumulado
     * @returns {Calculator} Retorna this para permitir encadenamiento
     *
     * TODO:
     * - Suma el parámetro number a this.value
     * - Retorna this (la instancia) para permitir encadenamiento
     */
    add(number) {
        this.value += number
        return this
    }

    /**
     * Resta un número del valor acumulado.
     * Traducción: Restar
     *
     * Este método decrementa el valor acumulado restando el número proporcionado.
     * El comportamiento esperado es que el valor interno se decremente y se retorne el nuevo valor.
     *
     * @param {number} number - Número a restar del valor acumulado
     * @returns {Calculator} Retorna this para permitir encadenamiento
     *
     * TODO:
     * - Resta el parámetro number de this.value
     * - Retorna this (la instancia) para permitir encadenamiento
     */
    subtract(number) {
        this.value -= number
        return this
    }

    /**
     * Multiplica el valor acumulado por un número.
     * Traducción: Multiplicar
     *
     * Este método multiplica el valor acumulado por el número proporcionado.
     * El comportamiento esperado es que el valor interno se multiplique y se retorne el nuevo valor.
     *
     * @param {number} number - Número por el cual multiplicar el valor acumulado
     * @returns {Calculator} Retorna this para permitir encadenamiento
     *
     * TODO:
     * - Multiplica this.value por el parámetro number
     * - Retorna this (la instancia) para permitir encadenamiento
     */
    multiply(number) {
        this.value *= number
        return this
    }

    /**
     * Divide el valor acumulado por un número.
     * Traducción: Dividir
     *
     * Este método divide el valor acumulado por el número proporcionado.
     * Debe validar que no se intente dividir por cero antes de realizar la operación.
     * El comportamiento esperado es que si el divisor es cero, se lance un error,
     * de lo contrario, el valor interno se divida y se retorne el nuevo valor.
     *
     * @param {number} number - Número por el cual dividir el valor acumulado
     * @returns {Calculator} Retorna this para permitir encadenamiento
     * @throws {Error} Lanza error si number es 0
     *
     * TODO:
     * - Valida que number no sea 0
     * - Si number es 0, lanza un error con el mensaje exacto: "Division by zero is not allowed"
     * - Divide this.value por el parámetro number
     * - Retorna this (la instancia) para permitir encadenamiento
     */
    divide(number) {
        if (number === 0) throw new Error('Division by zero is not allowed')
        this.value /= number
        return this
    }

    /**
     * Resetea el valor acumulado a cero.
     * Traducción: Limpiar
     *
     * Este método establece el valor acumulado en 0, permitiendo empezar de nuevo.
     * El comportamiento esperado es que this.value se establezca en 0.
     *
     * @returns {Calculator} Retorna this para permitir encadenamiento
     *
     * TODO:
     * - Establece this.value en 0
     * - Retorna this (la instancia) para permitir encadenamiento
     */
    clear() {
        this.value = 0
        return this
    }

    /**
     * Obtiene el valor acumulado actual sin modificarlo.
     * Traducción: Obtener Valor
     *
     * Este método retorna el valor acumulado sin realizar ninguna modificación.
     * Es un método de solo lectura que permite consultar el estado actual.
     *
     * @returns {number} El valor acumulado actual
     *
     * TODO:
     * - Retorna el valor de this.value sin modificarlo
     */
    getValue() {
        return this.value
    }
}

const numero = new Calculator(20)
console.log(numero)
numero.add(5)
console.log(numero)
numero.getValue()
console.log(numero)



module.exports = {
    Calculator
};

