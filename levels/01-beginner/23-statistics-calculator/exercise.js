/**
 * Calculadora de Estadísticas
 * 
 * Descripción: Implementa funciones para analizar arrays de números con estadísticas básicas
 * y medidas de tendencia central. Este ejercicio cubre conceptos fundamentales de estadística
 * descriptiva aplicados a programación.
 * Dificultad: BEGINNER
 * 
 * Funciones requeridas:
 * - calculateMean(numbers): Calcula la media aritmética
 * - calculateMedian(numbers): Calcula la mediana
 * - calculateMode(numbers): Calcula la moda
 * - calculateRange(numbers): Calcula el rango
 * - calculateStandardDeviation(numbers): Calcula la desviación estándar
 */

/**
 * Calcula la media aritmética de un array de números
 * @param {number[]} numbers - Array de números
 * @returns {number|null} Media aritmética o null si es inválido
 * 
 * Ejemplos:
 * calculateMean([1, 2, 3, 4, 5]) → 3
 * calculateMean([10, 20, 30]) → 20
 * calculateMean([5, 5, 5, 5]) → 5
 */

function filterError(posiblesErrores) {



    let errores = [null, undefined, '']
    if (errores.includes(posiblesErrores)) {
        console.log('hay error')
        return true
    }



    for (element of posiblesErrores) {
        if (errores.includes(element) || Number.isFinite(element) === false) {
            console.log('hay error')
            return true
        }

    }
    if (posiblesErrores.length === 0) {
        console.log('hay error el array esta vacio')
        return true
    }
    return false
}

let arryMean = undefined


function calculateMean(numbers) {
    if (filterError(numbers) === true) {

        console.log('hay errores')
        console.log('............')
        return null
    }
    let mean = (numbers.reduce((a, b) => a + b)) / numbers.length
    console.log(mean)
    console.log('............')

    return mean
    // TODO: Implementar cálculo de media
    // Pista 1: Validar que numbers sea un array válido
    // Pista 2: Verificar que el array no esté vacío
    // Pista 3: Verificar que todos los elementos sean números
    // Pista 4: Sumar todos los números usando reduce o bucle
    // Pista 5: Dividir la suma por la cantidad de elementos
    // Pista 6: Retornar null si hay error

    // throw new Error('Función calculateMean no implementada');
}


calculateMean(arryMean)


/**
 * Calcula la mediana de un array de números
 * @param {number[]} numbers - Array de números
 * @returns {number|null} Mediana o null si es inválido
 * 
 * Ejemplos:
 * calculateMedian([1, 2, 3, 4, 5]) → 3
 * calculateMedian([1, 2, 3, 4]) → 2.5 (promedio de 2 y 3)
 * calculateMedian([5, 10, 15]) → 10
*/

const arryMedian = [1, 2, 3, 4]


function calculateMedian(numbers) {
    // TODO: Implementar cálculo de mediana
    if (filterError(numbers)) {
        console.log('calcularmediana tiene un error')
        console.log('............')
        return null
    }

    numbers = numbers.sort((a, b) => a - b)
    console.log(numbers)
    if (numbers.length % 2 === 0) {
        let medioArr = (numbers.length / 2)
        let medioAba = numbers.length / 2 - 1

        let mediumA = (numbers[medioAba] + numbers[medioArr]) / 2
        console.log(mediumA)
        console.log('............')
        return mediumA
    } else {
        let medio = Math.floor(numbers.length / 2)
        console.log(numbers[medio])
        console.log('............')
        return numbers[medio]
    }

    // Pista 1: Validar que numbers sea un array válido
    // Pista 2: Verificar que el array no esté vacío
    // Pista 3: Ordenar el array de menor a mayor
    // Pista 4: Si la cantidad es impar, tomar el elemento del medio
    // Pista 5: Si la cantidad es par, promediar los dos elementos centrales
    // Pista 6: Retornar null si hay error

    // throw new Error('Función calculateMedian no implementada');?
}


calculateMedian(arryMedian)

/**
 * Calcula la moda de un array de números
 * @param {number[]} numbers - Array de números
 * @returns {Array|null} Array con valores modales o null si es inválido
 * 
 * Ejemplos:
 * calculateMode([1, 2, 2, 3]) → [2]
 * calculateMode([1, 1, 2, 2, 3]) → [1, 2]
 * calculateMode([1, 2, 3, 4]) → []
 */

const arrymode = [1, 2, 2, 4, 4]

function calculateMode(numbers) {
    // TODO: Implementar cálculo de moda


    let frecuencia = []
    if (filterError(numbers)) {
        console.log('hay errores')
        return null
    }

    console.log(numbers)
    for (let i = 0; i < numbers.length; i++) {
        let count = 0
        for (let j = 0; j < numbers.length; j++) {
            if (numbers[i] === numbers[j]) {
                count++
            }

        }
        console.log(frecuencia)
        if (count >= 2) {
            if (frecuencia.length === 0) {
                frecuencia.push({
                    numero: numbers[i],
                    frecuencias: count
                })

            } else if (frecuencia.some(el => el.numero === numbers[i])) {

            } else (
                frecuencia.push({
                    numero: numbers[i],
                    frecuencias: count
                })
            )

        }
    }
    if (frecuencia.length === 0) {
        return frecuencia
    }
    let arryFinal = []
    let frecMax = 0
    for (let i = 0; i < frecuencia.length; i++) {
        if (frecuencia[i].frecuencias > frecMax) {

            frecMax = frecuencia[i].frecuencias
        }

    }
    console.log(frecMax, 'max')


    for (let i = 0; i < frecuencia.length; i++) {
        if (frecMax === frecuencia[i].frecuencias) {

            arryFinal.push(frecuencia[i].numero)
        }

    }
    console.log(arryFinal)

    return arryFinal
    // Pista 1: Validar que numbers sea un array válido
    // Pista 2: Contar frecuencia de cada número usando un objeto
    // Pista 3: Encontrar la frecuencia máxima
    // Pista 4: Retornar todos los números con frecuencia máxima
    // Pista 5: Si todos tienen frecuencia 1, retornar array vacío
    // Pista 6: Retornar null si hay error

    // throw new Error('Función calculateMode no implementada');
}

calculateMode(arrymode)


/**
 * Calcula el rango de un array de números
 * @param {number[]} numbers - Array de números
 * @returns {number|null} Rango (max - min) o null si es inválido
 * 
 * Ejemplos:
 * calculateRange([1, 2, 3, 4, 5]) → 4
 * calculateRange([10, 20, 30]) → 20
 * calculateRange([5, 5, 5]) → 0
 */

let arryNum = [1, 2, 3, 4]

function calculateRange(numbers) {
    // TODO: Implementar cálculo de rango]
    if (filterError(numbers)) {
        return null
    }
    if (Array.isArray(numbers) === false) {
        return null
    }

    let min = Math.min(...numbers)
    let max = Math.max(...numbers)
    console.log(min)
    console.log(max)

    let range = max - min
    return range
    // Pista 1: Validar que numbers sea un array válido
    // Pista 2: Verificar que el array no esté vacío
    // Pista 3: Encontrar el valor mínimo del array
    // Pista 4: Encontrar el valor máximo del array
    // Pista 5: Retornar max - min
    // Pista 6: Retornar null si hay error

    // throw new Error('Función calculateRange no implementada');
}

calculateRange(arryNum)


/**
 * Calcula la desviación estándar de un array de números
 * @param {number[]} numbers - Array de números
 * @returns {number|null} Desviación estándar o null si es inválido
 * 
 * Ejemplos:
 * calculateStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9]) ≈ 2
 * calculateStandardDeviation([1, 1, 1, 1]) → 0
 */


let loco = [2,4,7]
function calculateStandardDeviation(numbers) {
    // TODO: Implementar cálculo de desviación estándar
    // Pista 1: Validar que numbers sea un array válido
    if (Array.isArray(numbers) === false || filterError(numbers)) {
        return null
    }
    let media = calculateMean(numbers).toFixed(2)
    console.log(media)
let varianzaArry = []
    for (let i = 0; i < numbers.length; i++) {
        varianzaArry[i] = +((numbers[i] - media)**2).toFixed(2)

    }

    console.log(varianzaArry)
    let mediaVarianza = +(varianzaArry.reduce((a,b) => a+b) / numbers.length).toFixed(2)
    console.log(mediaVarianza)
    
    let desviation = Math.sqrt(mediaVarianza)
    console.log(desviation)

    return desviation
    // Pista 2: Calcular la media usando calculateMean()
    // Pista 3: Calcular la varianza: suma de (valor - media)² / cantidad
    // Pista 4: Raíz cuadrada de la varianza
    // Pista 5: Retornar null si hay error
    // Nota: Para números decimales, redondear es opcional

    // throw new Error('Función calculateStandardDeviation no implementada');
}

calculateStandardDeviation(loco)


module.exports = {
    calculateMean,
    calculateMedian,
    calculateMode,
    calculateRange,
    calculateStandardDeviation
};

