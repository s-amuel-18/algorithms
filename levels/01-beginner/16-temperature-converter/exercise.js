/**
 * Convertidor de Temperaturas
 * 
 * Descripción: Convierte temperaturas entre las escalas Celsius, Fahrenheit y Kelvin.
 * Aplica las fórmulas matemáticas correctas y valida las entradas.
 * Dificultad: BEGINNER
 * 
 * @param {number} temperature - La temperatura a convertir
 * @param {string} fromScale - Escala de origen ('celsius', 'fahrenheit', 'kelvin')
 * @param {string} toScale - Escala de destino ('celsius', 'fahrenheit', 'kelvin')
 * @returns {number|null} Temperatura convertida redondeada a 2 decimales, o null si es inválida
 * 
 * Ejemplo:
 * convertTemperature(32, 'celsius', 'fahrenheit') // 89.6
 */

let temperature = -273.15
let fromScale = 'celsius'
let toScale = 'kelvin'

function convertTemperature(temperature, fromScale, toScale) {
    // TODO: Implementar la solución aquí

    // Pista 1: Normaliza las escalas a minúsculas para comparaciones case-insensitive
    fromScale = fromScale.toLowerCase()
    toScale = toScale.toLowerCase()

    // console.log(fromScale)
    // console.log(toScale)
    // Pista 2: Valida que las escalas sean válidas ('celsius', 'fahrenheit', 'kelvin')
    if (fromScale == 'celsius' || fromScale == 'fahrenheit' || fromScale == 'kelvin') {

    } else {
        return null

    }
    if (toScale == 'celsius' || toScale == 'fahrenheit' || toScale == 'kelvin') {

    } else {
        return null

    }
    // Pista 3: Si las escalas son iguales, retorna la temperatura original
    if (toScale === fromScale) {
        return temperature
    }
    // Pista 4: Para Kelvin, valida que la temperatura no sea negativa
    if (fromScale === 'kelvin' && temperature < 0) {
        return null
    }

    let retFinal
    // Pista 5: Aplica las fórmulas matemáticas correctas según la conversión:
    //          Celsius a Fahrenheit: F = (C × 9/5) + 32
    if (fromScale === 'celsius' && toScale === 'fahrenheit') {
        retFinal = temperature * (9 / 5) + 32
        console.log(retFinal)
        return  Math.round(retFinal * 100) / 100
    }
    //          Fahrenheit a Celsius: C = (F - 32) × 5/9
    if (fromScale === 'fahrenheit' && toScale === 'celsius') {
        retFinal = (temperature - 32) * (5 / 9)
        console.log(retFinal)
        return  Math.round(retFinal * 100) / 100
    }
    //          Celsius a Kelvin: K = C + 273.15
    if (fromScale === 'celsius' && toScale === 'kelvin') {
        retFinal = temperature + 273.15
        console.log(retFinal)
        return  Math.round(retFinal * 100) / 100
    }
    //          Kelvin a Celsius: C = K - 273.15
    if (fromScale === 'kelvin' && toScale === 'celsius') {
        retFinal = temperature - 273.15
        console.log(retFinal)
        return  Math.round(retFinal * 100) / 100
    }
    //          Fahrenheit a Kelvin: K = (F - 32) × 5/9 + 273.15
    if (fromScale === 'fahrenheit' && toScale === 'kelvin') {
        retFinal = (temperature - 32) * (5/9) + 273.15
        console.log(retFinal)
        return  Math.round(retFinal * 100) / 100
    }
    //          Kelvin a Fahrenheit: F = (K - 273.15) × 9/5 + 32
    if (fromScale === 'kelvin' && toScale === 'fahrenheit') {
        retFinal = (temperature - 273.15) * (9/5) + 32 
        console.log(retFinal)
        return  Math.round(retFinal * 100) / 100

    }


    // Pista 6: Redondea el resultado a 2 decimales usando Math.round(result * 100) / 100

    // throw new Error('Función no implementada');
}

console.log(convertTemperature(temperature, fromScale, toScale)
)
convertTemperature(temperature, fromScale, toScale)

module.exports = convertTemperature;
