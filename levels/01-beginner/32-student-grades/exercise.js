/**
 * Sistema de Calificaciones para Estudiante (Student Grades System)
 *
 * Descripción: Implementa una clase básica `Student` para practicar
 * constructores, métodos de instancia, manejo de objetos anidados, y cálculos
 * complejos sobre estructuras de datos.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 * - Uso de métodos de arrays y objetos: reduce, Object.keys, etc.
 */

/**
 * Representa un estudiante con sus calificaciones en múltiples materias.
 * Traducción: Estudiante
 * @class
 */
class Student {
    /**
     * Constructor de la clase Student
     * Traducción: Constructor de Estudiante
     *
     * Crea un nuevo estudiante con nombre e ID, y inicializa un objeto vacío
     * para almacenar las calificaciones por materia.
     *
     * @param {string} name - Nombre del estudiante (no puede estar vacío)
     * @param {string} studentId - ID del estudiante (no puede estar vacío)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Student name is required" si el nombre es inválido
     * - Valida que studentId sea un string no vacío (después de trim)
     * - Lanza error "Student ID is required" si el ID es inválido
     * - Asigna los valores validados a this.name y this.studentId
     * - Inicializa this.gradess como un objeto vacío {}
     */
    constructor(name, studentId) {
        if (typeof name !== 'string') throw new Error('Student name is required')
        const nameFixed = name.trim()
        if (nameFixed === '') throw new Error('Student name is required')

        if (typeof studentId !== 'string') throw new Error('Student ID is required')
        const studentIdFixed = studentId.trim()
        if (studentIdFixed === '') throw new Error('Student ID is required')

        this.name = nameFixed
        this.studentId = studentIdFixed
        this.grades = {}

    }

    /**
     * Agrega una calificación a una materia específica.
     * Traducción: Agregar Calificación
     *
     * Este método agrega una calificación al array de calificaciones de la materia especificada.
     * Si la materia no existe, crea un nuevo array para esa materia.
     * Valida que la materia y la calificación sean válidas antes de agregar.
     *
     * @param {string} subject - Nombre de la materia (no puede estar vacío)
     * @param {number} grade - Calificación (debe estar entre 0 y 100)
     * @returns {number} El número total de calificaciones de esa materia después de agregar
     *
     * TODO:
     * - Valida que subject sea un string no vacío (después de trim)
     * - Lanza error "Subject name is required" si el subject es inválido
     * - Valida que grade sea un número entre 0 y 100 (inclusive)
     * - Lanza error "Grade must be a number between 0 and 100" si la calificación es inválida
     * - Si this.gradess[subject] no existe, créalo como un array vacío
     * - Agrega la calificación al array de esa materia usando push()
     * - Retorna el número total de calificaciones de esa materia (length del array)
     */
    addGrade(subject, grade) {
        if (typeof subject !== 'string') throw new Error('Subject name is required')
        if (subject.trim() === '') throw Error('Subject name is required')
        if (!(grade >= 0 && grade <= 100)) throw new Error('Grade must be a number between 0 and 100')



        if (Object.keys(this.grades).length === 0) {
            this.grades[subject] = [grade]
            return this.grades[subject].length
        }
        if (Object.keys(this.grades).includes(subject)) return this.grades[subject].push(grade)
        else this.grades[subject] = [grade]


        return this.grades[subject].length
    }

    /**
     * Calcula el promedio general de todas las calificaciones usando reduce().
     * Traducción: Obtener Promedio General
     *
     * Este método calcula el promedio de todas las calificaciones de todas las materias.
     * Debe usar el método reduce() para calcular la suma total.
     * Retorna un número con 2 decimales.
     *
     * @returns {number} El promedio general (0-100) con 2 decimales
     *
     * TODO:
     * - Si no hay calificaciones (this.gradess está vacío o todos los arrays están vacíos), retorna 0
     * - Obtén todos los arrays de calificaciones usando Object.values(this.gradess)
     * - Aplana los arrays usando flat() para tener un solo array con todas las calificaciones
     * - Usa reduce() para sumar todas las calificaciones
     * - Calcula el promedio: suma / cantidad de calificaciones
     * - Usa toFixed(2) y parseFloat() para formatear a 2 decimales
     * - Retorna el promedio calculado
     */
    getAverage() {
        const validationScope = Object.keys(this.grades)
        if (validationScope.length === 0) return 0
        const average = parseFloat((Object.values(this.grades).flat().reduce((a, b) => a + b) / Object.values(this.grades).flat().length).toFixed(2))

        return average
    }

    /**
     * Calcula el promedio de una materia específica usando reduce().
     * Traducción: Obtener Promedio por Materia
     *
     * Este método calcula el promedio de las calificaciones de una materia específica.
     * Debe usar el método reduce() para calcular la suma.
     * Retorna un número con 2 decimales.
     *
     * @param {string} subject - Nombre de la materia
     * @returns {number} El promedio de esa materia (0-100) con 2 decimales
     *
     * TODO:
     * - Verifica si this.gradess[subject] existe
     * - Si no existe o el array está vacío, retorna 0
     * - Usa reduce() para sumar todas las calificaciones de esa materia
     * - Calcula el promedio: suma / cantidad de calificaciones
     * - Usa toFixed(2) y parseFloat() para formatear a 2 decimales
     * - Retorna el promedio calculado
     */
    getAverageBySubject(subject) {
        const validationArry = Object.keys(this.grades)
        if (!(validationArry.includes(subject))) return 0

        const lengthArry = this.grades[subject].length
        if (lengthArry >= 2) {
            const average = parseFloat((this.grades[subject].reduce((a, b) => a + b) / lengthArry).toFixed(2))
            return average

        } else if (lengthArry === 1) return this.grades[subject][0]
        else return 0

    }

    /**
     * Obtiene todas las calificaciones de una materia específica.
     * Traducción: Obtener Calificaciones por Materia
     *
     * Este método retorna un nuevo array con todas las calificaciones de la materia especificada.
     * No debe mutar el array original.
     *
     * @param {string} subject - Nombre de la materia
     * @returns {number[]} Array con las calificaciones de esa materia (nuevo array)
     *
     * TODO:
     * - Verifica si this.gradess[subject] existe
     * - Si no existe, retorna un array vacío []
     * - Si existe, retorna una copia del array usando [...array] o slice()
     * - No debe mutar el array original
     */
    getGradesBySubject(subject) {
        const subjects = Object.keys(this.grades).includes(subject)
        if (!subjects) return []

        const copyArry = [...this.grades[subject]]

        return copyArry
    }

    /**
     * Determina si el estudiante ha aprobado basándose en su promedio general.
     * Traducción: Ha Aprobado
     *
     * Este método calcula el promedio general y lo compara con la nota mínima requerida.
     * El comportamiento esperado es retornar true si el promedio es mayor o igual a minGrade.
     *
     * @param {number} [minGrade=70] - Nota mínima para aprobar (default: 70)
     * @returns {boolean} true si el promedio >= minGrade, false en caso contrario
     *
     * TODO:
     * - Si no hay calificaciones, retorna false
     * - Calcula el promedio general usando getAverage()
     * - Compara el promedio con minGrade
     * - Retorna true si promedio >= minGrade, false en caso contrario
     */
    hasPassed(minGrade = 70) {
        const validationCalifications = Object.keys(this.grades).length
        if (validationCalifications === 0) return false

        const average = this.getAverage()
        if (average >= minGrade) return true
        else return false
    }

    /**
     * Obtiene la materia con el mejor promedio usando Object.keys().
     * Traducción: Obtener Mejor Materia
     *
     * Este método encuentra la materia que tiene el promedio más alto.
     * Debe usar Object.keys() para iterar sobre las materias.
     * Si hay empate, retorna la primera materia encontrada.
     *
     * @returns {string|null} El nombre de la materia con mejor promedio, o null si no hay calificaciones
     *
     * TODO:
     * - Obtén todas las materias usando Object.keys(this.gradess)
     * - Si no hay materias (array vacío), retorna null
     * - Itera sobre las materias y calcula el promedio de cada una usando getAverageBySubject()
     * - Encuentra la materia con el promedio más alto
     * - Si hay empate, retorna la primera materia encontrada
     * - Retorna el nombre de la mejor materia
     */
    getBestSubject() {
        const subjets = Object.keys(this.grades)
        if (subjets.length === 0) return null

        let count = 0
        let bestSubjet = ''
        for (let nameSubjet of subjets) {
            let averageSubjet = this.getAverageBySubject(nameSubjet)
            if (averageSubjet > count) {
                count = averageSubjet
                bestSubjet = nameSubjet 
            }
        }

        return bestSubjet

    }

    /**
     * Cuenta el número de materias distintas en las que el estudiante tiene calificaciones.
     * Traducción: Obtener Cantidad de Materias
     *
     * Este método retorna el número de materias diferentes que tienen al menos una calificación.
     * Debe usar Object.keys() para obtener las materias.
     *
     * @returns {number} El número de materias distintas
     *
     * TODO:
     * - Obtén todas las materias usando Object.keys(this.gradess)
     * - Retorna el número de materias (length del array)
     */
    getSubjectCount() {
        const allSubjets = Object.keys(this.grades).length
        return allSubjets
    }
}


const armando = new Student('Armando Graterol', '12186')
console.log(armando)
armando.addGrade('Matematicas', 10)
// armando.addGrade('Matematicas', 5)
// armando.addGrade('Matematicas', 12)

armando.addGrade('Poker', 90)
// armando.addGrade('Poker', 12)
// armando.addGrade('Poker', 14)
// armando.addGrade('Poker', 44)

armando.addGrade('Fisica', 40)
// armando.addGrade('Fisica', 8)
// armando.addGrade('Fisica', 82)

console.log(armando.getAverage())
console.log(armando.getAverageBySubject('Fisica'))
console.log(armando.getGradesBySubject('Fisica'))
console.log(armando.hasPassed())
console.log(armando.getBestSubject())
console.log(armando.getSubjectCount())






module.exports = {
    Student
};

