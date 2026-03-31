/**
 * Gestor de Tareas (Task Manager)
 *
 * Descripción: Implementa dos clases básicas (`Task` y `TaskManager`) para practicar
 * constructores, métodos de instancia, y el uso de métodos de arrays como find, filter,
 * map y reduce dentro de clases.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - Usar métodos de arrays (find, filter, map, reduce) en lugar de bucles
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 */

/**
 * Representa una tarea individual.
 * Traducción: Tarea
 * @class
 */
class Task {
    /**
     * Constructor de la clase Task
     * Traducción: Constructor de Tarea
     *
     * Crea una nueva tarea con descripción, prioridad y estado de completado.
     * Valida que la descripción no esté vacía y que la prioridad sea válida.
     *
     * @param {string} description - Descripción de la tarea (no puede estar vacío)
     * @param {string} [priority='medium'] - Prioridad ('low', 'medium', 'high')
     * @param {boolean} [completed=false] - Estado de completado
     *
     * TODO:
     * - Valida que description sea un string no vacío (después de trim)
     * - Lanza error "Task description is required" si la descripción es inválida
     * - Valida que priority sea 'low', 'medium' o 'high'
     * - Lanza error "Priority must be 'low', 'medium', or 'high'" si la prioridad es inválida
     * - Asigna los valores validados a this.description, this.priority y this.completed
     */
    constructor(description, priority = 'medium', completed = false) {
        let DescriptionModify = description
        if (typeof DescriptionModify === 'string') DescriptionModify = DescriptionModify.trim()
        else throw new Error('Task description is required')

        if (DescriptionModify === '') throw new Error('Task description is required')

        if (!(priority === 'low' || priority === 'medium' || priority === 'high')) throw new Error(`'Priority must be 'low', 'medium', or 'high'`)

        this.description = DescriptionModify
        this.priority = priority
        this.completed = completed
    }

    /**
     * Alterna el estado de completado de la tarea.
     * Traducción: Alternar Completado
     *
     * Este método cambia el estado completed de true a false o viceversa.
     * El comportamiento esperado es que si la tarea está completada, la marca como pendiente,
     * y si está pendiente, la marca como completada.
     *
     * @returns {boolean} El nuevo valor de completed después de alternar
     *
     * TODO:
     * - Cambia this.completed al valor opuesto (si es true, ponlo en false, y viceversa)
     * - Retorna el nuevo valor de this.completed
     */
    toggleComplete() {
        if (this.completed === false) this.completed = true
        else this.completed = false

        return this.completed
    }
}



/**
 * Gestiona una colección de tareas.
 * Traducción: Gestor de Tareas
 * @class
 */
class TaskManager {
    /**
     * Constructor de la clase TaskManager
     * Traducción: Constructor de Gestor de Tareas
     *
     * Crea un nuevo gestor de tareas con un array vacío para almacenar las tareas.
     *
     * TODO:
     * - Inicializa this.tasks como un array vacío []
     */
    tasks = []

    constructor() {

    }

    /**
     * Agrega una nueva tarea al gestor.
     * Traducción: Agregar Tarea
     *
     * Este método crea una nueva instancia de Task y la agrega al array de tareas.
     * El comportamiento esperado es que la tarea se agregue al final del array.
     *
     * @param {string} description - Descripción de la tarea
     * @param {string} [priority='medium'] - Prioridad de la tarea
     * @returns {Task} La nueva tarea creada
     *
     * TODO:
     * - Crea una nueva instancia de Task con los parámetros recibidos
     * - Agrega la tarea al array this.tasks usando push()
     * - Retorna la tarea creada
     */
    addTask(description, priority = 'medium') {
        const newTask = new Task(description, priority)

        this.tasks.push(newTask)

        return newTask
    }

    /**
     * Busca una tarea por su descripción.
     * Traducción: Buscar Tarea
     *
     * Este método busca una tarea cuyo description coincida exactamente con el parámetro recibido.
     * La búsqueda es case-sensitive (distingue entre mayúsculas y minúsculas).
     * Debe usar el método find() del array para realizar la búsqueda.
     *
     * @param {string} description - Descripción de la tarea a buscar
     * @returns {Task|null} La tarea encontrada o null si no existe
     *
     * TODO:
     * - Usa this.tasks.find() para buscar una tarea cuyo description coincida exactamente
     * - Retorna la tarea encontrada o null si no se encuentra
     */
    findTask(description) {
        const foundOrNot = this.tasks.find(descroptionOfSearch => descroptionOfSearch.description === description)
        if (foundOrNot) return foundOrNot
        else return null
    }

    /**
     * Obtiene todas las tareas pendientes (no completadas).
     * Traducción: Obtener Tareas Pendientes
     *
     * Este método retorna un nuevo array con todas las tareas que tienen completed === false.
     * Debe usar el método filter() del array para filtrar las tareas.
     *
     * @returns {Task[]} Array con las tareas pendientes
     *
     * TODO:
     * - Usa this.tasks.filter() para filtrar tareas con completed === false
     * - Retorna el nuevo array filtrado
     */
    getPendingTasks() {
        const taskPending = this.tasks.filter(foundTask => foundTask.completed === false)
        return taskPending
    }

    /**
     * Obtiene todas las tareas completadas.
     * Traducción: Obtener Tareas Completadas
     *
     * Este método retorna un nuevo array con todas las tareas que tienen completed === true.
     * Debe usar el método filter() del array para filtrar las tareas.
     *
     * @returns {Task[]} Array con las tareas completadas
     *
     * TODO:
     * - Usa this.tasks.filter() para filtrar tareas con completed === true
     * - Retorna el nuevo array filtrado
     */
    getCompletedTasks() {
        const taskComplete = this.tasks.filter(taskDone => taskDone.completed === true)
        return taskComplete
    }

    /**
     * Obtiene todas las tareas de una prioridad específica.
     * Traducción: Obtener Tareas por Prioridad
     *
     * Este método retorna un nuevo array con todas las tareas que tienen la prioridad especificada.
     * Debe usar el método filter() del array para filtrar las tareas.
     *
     * @param {string} priority - Prioridad a filtrar ('low', 'medium', 'high')
     * @returns {Task[]} Array con las tareas de esa prioridad
     *
     * TODO:
     * - Usa this.tasks.filter() para filtrar tareas con priority igual al parámetro recibido
     * - Retorna el nuevo array filtrado
     */
    getTasksByPriority(priority) {
        const priori = this.tasks.filter(filter => filter.priority === priority)
        return priori
    }

    /**
     * Obtiene un array con solo las descripciones de todas las tareas.
     * Traducción: Obtener Descripciones de Tareas
     *
     * Este método transforma el array de tareas en un array de strings con solo las descripciones.
     * Debe usar el método map() del array para transformar cada tarea en su descripción.
     *
     * @returns {string[]} Array con las descripciones de todas las tareas
     *
     * TODO:
     * - Usa this.tasks.map() para transformar cada tarea en su propiedad description
     * - Retorna el nuevo array de strings
     */
    getTaskDescriptions() {
        const arryDescription = this.tasks.map(descriptions => descriptions.description)
        return arryDescription
    }

    /**
     * Marca una tarea como completada.
     * Traducción: Completar Tarea
     *
     * Este método busca una tarea por descripción y la marca como completada si no lo estaba.
     * Usa findTask() para buscar la tarea y toggleComplete() para cambiar su estado.
     *
     * @param {string} description - Descripción de la tarea a completar
     * @returns {boolean} true si se completó la tarea, false si no se encontró o ya estaba completada
     *
     * TODO:
     * - Usa findTask() para buscar la tarea por descripción
     * - Si la tarea existe y no está completada, usa toggleComplete() para marcarla
     * - Retorna true si se completó, false si no se encontró o ya estaba completada
     */
    completeTask(description) {
        let descriptionFound = this.findTask(description)
        console.log(descriptionFound && !descriptionFound.completed, 'chequeo')
        if (descriptionFound && !descriptionFound.completed) return descriptionFound.toggleComplete()
        return false
    }

    /**
     * Calcula el porcentaje de tareas completadas.
     * Traducción: Obtener Porcentaje de Completado
     *
     * Este método calcula qué porcentaje del total de tareas están completadas.
     * Debe usar el método reduce() del array para contar las tareas completadas.
     * Retorna un número entre 0 y 100 con 2 decimales.
     *
     * @returns {number} Porcentaje de completado (0-100) con 2 decimales
     *
     * TODO:
     * - Si no hay tareas, retorna 0
     * - Usa this.tasks.reduce() para contar cuántas tareas tienen completed === true
     * - Calcula el porcentaje: (completadas / total) * 100
     * - Usa toFixed(2) para formatear a 2 decimales y parseFloat() para convertirlo a número
     * - Retorna el porcentaje calculado
     */
    getCompletionPercentage() {
        if (this.tasks.length === 0) return 0
        const TaskNumberCompleted = this.tasks.filter(complete => complete.completed === true).length
        const porcent = Number.parseFloat(((TaskNumberCompleted / this.tasks.length) * 100).toFixed(2))
        return porcent
    }

    /**
     * Cuenta el número total de tareas.
     * Traducción: Obtener Cantidad de Tareas
     *
     * Este método retorna el número total de tareas en el gestor.
     * Debe usar el método reduce() del array para contar (aunque length sería más simple,
     * el ejercicio requiere usar reduce para práctica).
     *
     * @returns {number} Número total de tareas
     *
     * TODO:
     * - Usa this.tasks.reduce() para contar el número total de tareas
     * - Retorna el conteo total
     */
    getTaskCount() {
        return this.tasks.reduce((count) => count + 1, 0);

    }

    /**
     * Cuenta las tareas por cada prioridad.
     * Traducción: Obtener Conteo por Prioridad
     *
     * Este método retorna un objeto con el conteo de tareas para cada nivel de prioridad.
     * Debe usar el método reduce() del array para acumular los conteos por prioridad.
     *
     * @returns {Object} Objeto con formato { low: X, medium: Y, high: Z }
     *
     * TODO:
     * - Usa this.tasks.reduce() para acumular conteos por prioridad
     * - El acumulador inicial debe ser un objeto { low: 0, medium: 0, high: 0 }
     * - Por cada tarea, incrementa el contador correspondiente según su prioridad
     * - Retorna el objeto con los conteos finales
     */
    getPriorityCounts() {
        const low = this.tasks.filter(low => low.priority === 'low').length
        const medium = this.tasks.filter(low => low.priority === 'medium').length
        const high = this.tasks.filter(low => low.priority === 'high').length

        const all = {
            low: low,
            medium: medium,
            high: high
        }
        return all
    }
}

const task1 = new TaskManager()
task1.addTask('carlos', 'low')
console.log(task1)
console.log(task1.completeTask('carlos'))
console.log(task1)
// task1.addTask('arreglar', 'low')
// task1.addTask('casa', 'medium')
// task1.addTask('cambio', 'medium')
// task1.tasks[0].toggleComplete()
// task1.tasks[1].toggleComplete()
// console.log(task1.getTasksByPriority('low'))
// console.log(task1.getTaskDescriptions())
// console.log(task1.getCompletionPercentage())
console.log(task1.getPriorityCounts())



module.exports = {
    Task,
    TaskManager
};

