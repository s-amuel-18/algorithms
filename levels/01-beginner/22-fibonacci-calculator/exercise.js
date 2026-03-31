/**
 * Calculadora de Fibonacci
 * 
 * Descripción: Implementa funciones para calcular y analizar la secuencia de Fibonacci.
 * La secuencia de Fibonacci es: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...
 * donde cada número es la suma de los dos anteriores.
 * Dificultad: BEGINNER
 * 
 * Funciones requeridas:
 * - fibonacci(n): Calcula el n-ésimo número de Fibonacci
 * - fibonacciSequence(n): Genera los primeros n números de Fibonacci
 * - isFibonacci(num): Verifica si un número es de Fibonacci
 * - fibonacciSum(n): Calcula la suma de los primeros n Fibonacci
 * - getFibonacciIndex(num): Encuentra el índice de un número de Fibonacci
 */

/**
 * Calcula el n-ésimo número de Fibonacci
 * @param {number} n - Posición en la secuencia (0-based)
 * @returns {number|null} El n-ésimo número de Fibonacci o null si es inválido
 * 
 * Ejemplos:
 * fibonacci(0) → 0
 * fibonacci(1) → 1
 * fibonacci(5) → 5
 * fibonacci(10) → 55
 * 
 * Secuencia: F(0)=0, F(1)=1, F(2)=1, F(3)=2, F(4)=3, F(5)=5, ...
 */


let number = '3'
function fibonacci(n) {
    // TODO: Implementar cálculo de Fibonacci

    let bloqueo = [null, undefined, 'string']
    if (bloqueo.includes(n) || typeof n === 'string') {
        console.log('te volviste como loquita por que los valores ingresados esta mal')
        return null
    }

    if (Math.floor(n) !== n) {
        console.log('el numero ingresado es un decimal')
        return null
    }

    if (n === 0) {
        console.log('0')
        return 0
    } else if (n === 1) {
        console.log('1')
        return 1
    }

    if (n < 0) {
        console.log('te volviste como loquita por que el numero ingresado es negativo')
        return null
    }
    // Pista 2: Casos base: F(0) = 0, F(1) = 1
    // Pista 3: F(n) = F(n-1) + F(n-2)
    // Pista 4: Puedes usar recursión o iteración 
    // Pista 5: Retornar null si n es inválido
    let penultimo = 0
    let ultimo = 1
    let resulFinal = 0
    for (let i = 0; i < n - 1; i++) {
        let resultado = penultimo + ultimo
        console.log(penultimo, resultado)
        penultimo = ultimo
        ultimo = resultado
        resulFinal = resultado
    }

    console.log(resulFinal)
    return resulFinal

    // throw new Error('Función fibonacci no implementada');
}

fibonacci(number)


/**
 * Genera los primeros n números de la secuencia de Fibonacci
 * @param {number} n - Cantidad de números a generar
 * @returns {Array|null} Array con los primeros n Fibonacci o null si es inválido
 * 
 * Ejemplos:
 * fibonacciSequence(5) → [0, 1, 1, 2, 3]
 * fibonacciSequence(10) → [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 */


let numberSecuence = 5

function fibonacciSequence(n) {
    let bloqueo = [null, undefined, 'string']
    if (bloqueo.includes(n) || typeof n === 'string') {
        console.log('te volviste como loquita por que los valores ingresados esta mal')
        return null
    }

    if (Math.floor(n) !== n) {
        console.log('el numero ingresado es un decimal')
        return null
    }

    if (n === 0) {
        console.log('0')
        return null
    } else if (n === 1) {
        console.log('1')
        return [0]
    }

    if (n < 0) {
        console.log('te volviste como loquita por que el numero ingresado es negativo')
        return null
    }
    // TODO: Implementar generación de secuencia
    // Pista 1: Validar que n sea un número positivo

    // Pista 2: Generar un array con los primeros n números
    let penultimo = 0
    let ultimo = 1
    let resulFinal = 0

    let arrySecuence = [0, 1]
    for (let i = 0; i < n - 1; i++) {
        if (arrySecuence.length === n) {
            return arrySecuence
        }
        let resultado = penultimo + ultimo
        console.log(penultimo, resultado)
        penultimo = ultimo
        ultimo = resultado
        resulFinal = resultado

        arrySecuence.push(resultado)
        if (arrySecuence.length === n) {
            return arrySecuence
        }
    }

    console.log(arrySecuence)
    return arrySecuence

    // Pista 3: Usar fibonacci() o implementar con bucle
    // Pista 4: Retornar null si n es inválido

    // throw new Error('Función fibonacciSequence no implementada');
}
fibonacciSequence(numberSecuence)


/**
 * Verifica si un número pertenece a la secuencia de Fibonacci
 * @param {number} num - Número a verificar
 * @returns {boolean} true si es un número de Fibonacci, false en caso contrario
 * 
 * Ejemplos:
 * isFibonacci(0) → true
 * isFibonacci(5) → true
 * isFibonacci(4) → false
 * isFibonacci(55) → true
 */


let num = 2
function isFibonacci(num) {
    let bloqueo = [null, undefined, 'string']
    if (bloqueo.includes(num) || typeof num === 'string') {
        console.log('te volviste como loquita por que los valores ingresados esta mal')
        return false
    }

    if (Math.floor(num) !== num) {
        console.log('el numero ingresado es un decimal')
        return false
    }

    if (num === 0) {
        console.log('0')
        return true
    } else if (num === 1) {
        console.log('1')
        return true
    }
    // TODO: Implementar verificación de número de Fibonacci
    // Pista 1: Validar que num sea un número entero no negativo
    if (num < 0) {
        console.log('el numero ingresado es negativo')
        return false
    }
    // Pista 2: Puedes generar la secuencia hasta encontrar el número
    let penultimo = 0
    let ultimo = 1
    let resulFinal = 0
    for (let i = 0; i < num; i++) {
        let resultado = penultimo + ultimo
        console.log(penultimo, resultado)
        penultimo = ultimo
        ultimo = resultado
        resulFinal = resultado

        if (resultado === num) {
            console.log('se encontro el numero correctamente')
            return true
        } else if (resultado > num) {
            console.log('no se encontro el numero en la secuencia')
            return false

        }
    }
    // Pista 3: O verificar con fórmula: 5*num² ± 4 es cuadrado perfecto
    // Pista 4: Retornar false si num es inválido

    // throw new Error('Función isFibonacci no implementada');
}


isFibonacci(num)


/**
 * Calcula la suma de los primeros n números de Fibonacci
 * @param {number} n - Cantidad de números a sumar
 * @returns {number|null} Suma de los primeros n Fibonacci o null si es inválido
 * 
 * Ejemplos:
 * fibonacciSum(3) → 2 (0 + 1 + 1)
 * fibonacciSum(5) → 7 (0 + 1 + 1 + 2 + 3)
 */

let numIndex = 6

function fibonacciSum(n) {
    // TODO: Implementar suma de Fibonacci
    let arryFun = fibonacciSequence(n)
    console.log(arryFun)
    if (arryFun === null) {
        return null
    }


    let sumFinal = arryFun.reduce((a, b) => a + b)

    console.log(sumFinal)
    return sumFinal
    // Pista 1: Validar que n sea un número positivo
    // Pista 2: Generar la secuencia y sumar
    // Pista 3: O calcular directamente sin almacenar la secuencia
    // Pista 4: Retornar null si n es inválido

    // throw new Error('Función fibonacciSum no implementada');
}

fibonacciSum(numIndex)


/**
 * Encuentra el índice de un número en la secuencia de Fibonacci
 * @param {number} num - Número de Fibonacci
 * @returns {number|null} Índice del número o null si no es Fibonacci
 * 
 * Ejemplos:
 * getFibonacciIndex(0) → 0
 * getFibonacciIndex(5) → 5
 * getFibonacciIndex(55) → 10
 * getFibonacciIndex(4) → null
 */

let numFibo = 3


function getFibonacciIndex(num) {
    if (num === 0) {
        return 0
    }

    console.log(isFibonacci(num), 'chequeo')
    if (isFibonacci(num)) {
        let secuenseBig = fibonacciSequence(numIndex + 10)
        let result = secuenseBig.indexOf(num)
        return result
    } else {
        return null

    }
    // TODO: Implementar búsqueda de índice
    // Pista 1: Validar que num sea un número entero no negativo
    // Pista 2: Verificar primero si es Fibonacci usando isFibonacci()
    // Pista 3: Generar secuencia hasta encontrar el número
    // Pista 4: Retornar el índice (posición 0-based)
    // Pista 5: Retornar null si no es Fibonacci

    // throw new Error('Función getFibonacciIndex no implementada');
}

getFibonacciIndex(numFibo)

module.exports = {
    fibonacci,
    fibonacciSequence,
    isFibonacci,
    fibonacciSum,
    getFibonacciIndex
};

