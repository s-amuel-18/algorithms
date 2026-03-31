/**
 * Calculadora de Factoriales
 * 
 * Descripción: Implementa funciones para calcular, validar y analizar factoriales.
 * El factorial de un número n (escrito como n!) es el producto de todos los números positivos
 * menores o iguales a n. Por ejemplo: 5! = 5 × 4 × 3 × 2 × 1 = 120
 * Dificultad: BEGINNER
 * 
 * Funciones requeridas:
 * - calculateFactorial(n): Calcula el factorial de un número
 * - isFactorialOf(n, factorial): Verifica si un número es factorial de otro
 * - findFactorialDigits(n): Calcula el número de dígitos de n!
 * - factorialRange(start, end): Calcula factoriales en un rango
 * - countTrailingZeros(n): Cuenta ceros finales en n!
 */

/**
 * Calcula el factorial de un número n
 * @param {number} n - Número cuyo factorial se desea calcular
 * @returns {number|null} Factorial de n o null si n es inválido
 */

factorial = 5

function calculateFactorial(n) {
    // TODO: Implementar cálculo de factorial
    // Pista 1: Validar que n sea un número entero no negativo
    if (Number.isFinite(n) === false || n < 0 || Number.isInteger(n) === false) {
        console.log('hay un error con el numero ingresado en la funcion')
        return null
    }

    console.log(n)
    let valueFinal = []
    if (n === 0 || n === 1) {
        return 1
    } else {
        for (let i = n; i > 0; i--) {
            valueFinal.push(i)

        }
        console.log(valueFinal)
    }
    let fac = 1
    for (e of valueFinal) {
        fac *= e

    }

    console.log(fac)
    // Pista 2: 0! = 1 y 1! = 1 (casos base)
    // Pista 3: n! = n × (n-1)! (fórmula recursiva)
    // Pista 4: Puedes usar recursión o un bucle
    // Pista 5: Retornar null si n es negativo o no es entero

    return fac
}

calculateFactorial(factorial)



/**
 * Verifica si un número dado es el factorial de otro número
 * @param {number} n - Número a verificar
 * @param {number} factorial - Posible factorial de n
 * @returns {boolean} true si n! == factorial, false en caso contrario
 */

let valueToVerify = -5
let factorN = 120

function isFactorialOf(n, factorial) {
    // TODO: Implementar verificación de factorial
    // Pista 1: Validar que ambos parámetros sean números
    if (Number.isFinite(n) === false && Number.isFinite(factorial) === false) {
        console.log('los valores ingresados no son validos', null)
        return null
    }
    if (n < 0 || factorial < 0) {
        return false
    }
    console.log(Number.isFinite(n) === false, 'aqui')
    // Pista 2: Calcular el factorial de n usando calculateFactorial
    let fac = calculateFactorial(n)

    if (fac === factorial) {
        console.log('el numero conincide con el factorioal')
        return true
    } else {
        console.log('el numero NO conincide con el factorioal')
        return false
    }
    // Pista 3: Comparar el resultado con el factorial dado
    // Pista 4: Retornar true si coinciden, false en caso contrario
    // Pista 5: Considerar casos edge (números negativos, números grandes)

    // throw new Error('Función isFactorialOf no implementada');
}

isFactorialOf(factorN, valueToVerify)



/**
 * Calcula el número de dígitos del factorial de n
 * @param {number} n - Número cuyo factorial se analiza
 * @returns {number|null} Número de dígitos de n! o null si n es inválido
 */


let num = 5


function findFactorialDigits(n) {
    // TODO: Implementar conteo de dígitos del factorial
    // Pista 1: Validar que n sea un número válido
    if (Number.isFinite(n) === false || n < 0) {
        console.log('el numero no es valido')
        return null
    }
    // Pista 2: Calcular el factorial usando calculateFactorial
    let factInner = calculateFactorial(n)

    // Pista 3: Convertir a string para contar dígitos
    let factToString = factInner.toString()
    let calculateOfString = factToString.length
    // Pista 4: Retornar null si n es inválido
    // Pista 5: Considerar usar logaritmos para números muy grandes
    return calculateOfString
    // throw new Error('Función findFactorialDigits no implementada');
}

findFactorialDigits(num)

/**
 * Calcula los factoriales de todos los números en un rango
 * @param {number} start - Número inicial del rango (incluido)
 * @param {number} end - Número final del rango (incluido)
 * @returns {Array|null} Array de objetos {number, factorial} o null si el rango es inválido
 */

let start = 3
let end = 7

function factorialRange(start, end) {
    // TODO: Implementar cálculo de factoriales en rango
    // Pista 1: Validar que start y end sean números válidos
    if (Number.isFinite(start) === false || Number.isFinite(end) === false || start < 0 || end < 0) {
        console.log('los datos ingresados no son validos')
        return null
    }

    // Pista 2: Validar que start <= end
    if (start > end) {
        console.log('start es menor o igual a end')
        return null
    }

    // Pista 3: Iterar desde start hasta end (incluyendo ambos)
    let count = start
    let arryOfFact = []
    let objInner = {}
    while (count <= end) {
        let factorial = calculateFactorial(count)

        arryOfFact.push({
            number: count,
            factorial: factorial

        })
        count++
    }

    console.log(arryOfFact)

    return arryOfFact
    // Pista 4: Para cada número, calcular su factorial
    // Pista 5: Retornar array de objetos {number, factorial}
    // Pista 6: Retornar null si el rango es inválido

    // throw new Error('Función factorialRange no implementada');
}

factorialRange(start, end)


/**
 * Cuenta los ceros finales en el factorial de n
 * @param {number} n - Número cuyo factorial se analiza
 * @returns {number|null} Número de ceros finales en n! o null si n es inválido
 */

let numCero = 25

function countTrailingZeros(n) {
    // TODO: Implementar conteo de ceros finales
    // Pista 1: Validar que n sea un número válido
    if (Number.isFinite(n) === false || n < 0) {
        return null
    }

    // let count = calculateFactorial(n)
    // let countZero = 0
    // while (count >= 2) {
    //     if (count >= 5){
    //         count /= 5
    //     }else {
    //         count /= 2
    //     }
    //     countZero++
    // }
    // console.log(countZero)
    // let numToString = count.toString()
    // let 
    // Pista 2: Los ceros finales dependen del número de factores 5 y 2
    // Pista 3: Contar cuántas veces 5 divide n
    // Pista 4: Retornar null si n es inválido
    // Pista 5: Para números grandes, contar potencias de 5


    let count = 0;
    
    // Contar cuántas veces 5 divide n
    for (let i = 5; i <= n; i *= 5) {
        count += Math.floor(n / i);
    }
    
    return count;
    // throw new Error('Función countTrailingZeros no implementada');
}

countTrailingZeros(numCero)

module.exports = {
    calculateFactorial,
    isFactorialOf,
    findFactorialDigits,
    factorialRange,
    countTrailingZeros
};

