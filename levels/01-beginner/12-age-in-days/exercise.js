/**
 * Calculadora de Edad en Días
 * 
 * Descripción: Calcula cuántos días ha vivido una persona desde su nacimiento hasta hoy.
 * Dificultad: BEGINNER
 * 
 * @param {number} birthYear - Año de nacimiento
 * @returns {number} Número total de días vividos
 * 
 * Ejemplo:
 * calculateAgeInDays(1990) // Aproximadamente 12410 días (depende del año actual)
 */

let date = 2000

function calculateAgeInDays(birthYear) {
    let thisYear = new Date().getFullYear()
    let years = thisYear -  birthYear
    let daysWOvi = years * 365
    let count = 0
    for(let i = birthYear; i < thisYear; i++){
        if(i % 4 === 0 && i % 100 !== 0 || i % 400 === 0){
            count ++
        }
    }

    let daysComplete = daysWOvi + count

    console.log(daysComplete, count, daysWOvi)
    

       return daysComplete
    
    // TODO: Implementar la solución aquí
    
    // Pista 1: Obtén el año actual usando new Date().getFullYear()
    
    // Pista 2: Calcula la diferencia en años
    
    // Pista 3: Multiplica por 365 y agrega días extra por años bisiestos
    
    // Pista 4: Un año es bisiesto si es divisible por 4, excepto si es divisible por 100 pero no por 400
    
    // throw new Error('Función no implementada');
}

calculateAgeInDays(date)


module.exports = calculateAgeInDays;
