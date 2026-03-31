/**
 * Calculadora de Notas
 * 
 * Descripción: Calcula el promedio de un conjunto de notas y determina la calificación correspondiente.
 * También valida que las notas estén en el rango válido (0-100).
 * Dificultad: BEGINNER
 * 
 * @param {number[]} grades - Array de notas (0-100)
 * @returns {Object} Objeto con average, grade e isValid
 * 
 * Ejemplo:
 * calculateGrade([85, 92, 78, 96]) // {average: 87.75, grade: 'B', isValid: true}
 */

let notes = [85, 92, 78, 96]

function calculateGrade(grades) {
    let objFin = {
        average: false,
        grade: false,
        isValid: false
    }
    let purge = []


    if (grades.length <= 0) {
        objFin = {
            average: null,
            grade: null,
            isValid: false
        }

        return objFin
    }



    for (let i = 0; i < grades.length; i++) {
        if (grades[i] >= 0 && grades[i] <= 100) {
            purge.push(grades[i])
            console.log(grades[i])
        }else {
            console.log(grades[i], 'se corto el beta')
            objFin = {
                average: null,
                grade: null,
                isValid: false
            }
            return objFin
        }
    }
    objFin.isValid = true
    console.log(objFin)

    let addition = 0
    for (element of purge) {
        addition += element
        // console.log(addition)
    }

    let average = addition / purge.length
    objFin.average = average


    console.log(average)
    console.log(average >= 60)


    if (average >= 90) {
        objFin.grade = 'A'
    } else if (average < 90 && average >= 80) {
        objFin.grade = 'B'
    }else if (average <= 79 && average >= 70){
        objFin.grade = 'C'
    }else if(average <= 69 && average >= 60){
        objFin.grade = 'D'
    }else if (average <= 59 && average >= 0){
        objFin.grade = 'F'
    }

    console.log(objFin)

return objFin

    // TODO: Implementar la solución aquí

    // Pista 1: Primero valida que el array no esté vacío
    // Pista 2: Valida que todas las notas estén en el rango 0-100
    // Pista 3: Calcula el promedio sumando todas las notas y dividiendo por la cantidad
    // Pista 4: Determina la calificación basada en el promedio:
    //          A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: 0-59

    // throw new Error('Función no implementada');
}

calculateGrade(notes)

module.exports = calculateGrade;
