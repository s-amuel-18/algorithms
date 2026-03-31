/**
 * Calculadora Asíncrona con Operaciones Simuladas (Async Calculator with Simulated Operations)
 *
 * Descripción: Este ejercicio enseña a trabajar con operaciones matemáticas asíncronas,
 * comparando ejecución secuencial vs paralela y midiendo tiempos de ejecución.
 * Dificultad: BEGINNER
 *
 * Conceptos clave:
 * - Crear funciones asíncronas que simulan operaciones con delays
 * - Encadenar operaciones secuencialmente con async/await
 * - Ejecutar operaciones en paralelo con Promise.all()
 * - Medir tiempo de ejecución de funciones asíncronas
 */

/**
 * Simula una suma asíncrona con un delay de 200ms.
 * Traducción: Suma Asíncrona
 *
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {Promise<number>} Promesa que se resuelve con a + b después de 200ms
 *
 * TODO:
 * - Valida que a sea un número
 * - Lanza error "First number must be a number" si no es número
 * - Valida que b sea un número
 * - Lanza error "Second number must be a number" si no es número
 * - Retorna una nueva Promise
 * - Dentro de la promesa, usa setTimeout con 200ms de delay
 * - Después del delay, resuelve con a + b
 */
async function asyncAdd(a, b) {
    if (typeof a !== 'number') return Promise.reject(new Error('First number must be a number'))
    if (typeof b !== 'number') return Promise.reject(new Error('Second number must be a number'))


    return new Promise(resolve => {
        setTimeout(() => {
            resolve(a + b)
        }, 200);
    })


}

/**
 * Simula una multiplicación asíncrona con un delay de 300ms.
 * Traducción: Multiplicación Asíncrona
 *
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {Promise<number>} Promesa que se resuelve con a * b después de 300ms
 *
 * TODO:
 * - Valida que a sea un número
 * - Lanza error "First number must be a number" si no es número
 * - Valida que b sea un número
 * - Lanza error "Second number must be a number" si no es número
 * - Retorna una nueva Promise
 * - Dentro de la promesa, usa setTimeout con 300ms de delay
 * - Después del delay, resuelve con a * b
 */
async function asyncMultiply(a, b) {
    if (typeof a !== 'number') return Promise.reject(new Error('First number must be a number'))
    if (typeof b !== 'number') return Promise.reject(new Error('Second number must be a number'))

    return new Promise(resolve => {
        setTimeout(() => {
            resolve(a * b)
        }, 300);
    })
}

/**
 * Calcula una secuencia de operaciones matemáticas de forma secuencial.
 * Traducción: Calcular Asíncrono
 *
 * @param {Array} operations - Array de objetos {type: 'add'|'multiply', a: number, b: number}
 * @returns {Promise<number>} Promesa que se resuelve con el resultado final
 *
 * TODO:
 * - Valida que operations sea un array
 * - Lanza error "Operations must be an array" si no es array
 * - Valida que el array no esté vacío
 * - Lanza error "Operations array cannot be empty" si está vacío
 * - Valida cada operación:
 *   - Debe tener type, a y b
 *   - type debe ser 'add' o 'multiply'
 * - Inicializa resultado con operations[0].a
 * - Itera sobre operations usando for...of
 * - Para cada operación:
 *   - Si type === 'add': resultado = await asyncAdd(resultado, op.b)
 *   - Si type === 'multiply': resultado = await asyncMultiply(resultado, op.b)
 * - Retorna el resultado final
 */
async function asyncCalculate(operations) {
    if (!(Array.isArray(operations))) return Promise.reject(new Error('Operations must be an array'))
    if (operations.length === 0) return Promise.reject(new Error(`Operations array cannot be empty`))



    const standartKey = ['type', 'a', 'b']
    const standartType = ['add', 'multiply']
    // const validationKeys = 

    let resultado = operations[0].a
    for (const element of operations) {
        // if (!(Object.keys(element).every(num => standartKey))) return Promise.reject(new Error('Operation must have type, a, and b'))
        if (!(element.hasOwnProperty('type')) || !(element.hasOwnProperty('a')) || !(element.hasOwnProperty('b'))) return Promise.reject(new Error('Operation must have type, a, and b'))
        if (!(standartType.includes(element.type))) return Promise.reject(new Error("Operation type must be 'add' or 'multiply'"))


        const elementb = element.b

        if (element.type === 'add') resultado = await asyncAdd(resultado, elementb)
        else if (element.type === 'multiply') resultado = await asyncMultiply(resultado, elementb)


    }
    return resultado
}

/**
 * Calcula múltiples operaciones independientes en paralelo y suma los resultados.
 * Traducción: Calcular Asíncrono en Paralelo
 *
 * @param {Array} operations - Array de objetos {type: 'add'|'multiply', a: number, b: number}
 * @returns {Promise<number>} Promesa que se resuelve con la suma de todos los resultados
 *
 * TODO:
 * - Mismas validaciones que asyncCalculate()
 * - Crea un array de promesas usando .map() sobre operations
 *   - Para cada op, si type === 'add' → asyncAdd(op.a, op.b)
 *   - Si type === 'multiply' → asyncMultiply(op.a, op.b)
 * - Usa Promise.all() con el array de promesas
 * - Suma todos los resultados usando reduce()
 * - Retorna la suma total
 */

async function asyncCalculateParallel(operations) {
    if (!(Array.isArray(operations))) Promise.reject(new Error('Operations must be an array'))
    if (operations.lenght === 0) Promise.reject(new Error('Operations array cannot be empty'))

    const arryPromise = operations.map(op => {
        if (op.type === 'add') return asyncAdd(op.a, op.b)
        else if (op.type === 'multiply') return asyncMultiply(op.a, op.b)

    })

    const arryPromiseResolve = await Promise.all(arryPromise)

    return arryPromiseResolve.reduce((a, b) => a + b)
}

/**
 * Mide el tiempo de ejecución de una función asíncrona.
 * Traducción: Medir Tiempo de Ejecución
 *
 * @param {Function} asyncFn - Función asíncrona a medir
 * @returns {Promise<number>} Promesa que se resuelve con el tiempo en milisegundos
 *
 * TODO:
 * - Valida que asyncFn sea una función
 * - Lanza error "Function must be a function" si no es función
 * - Registra tiempo inicial con Date.now()
 * - Ejecuta asyncFn() con await
 * - Registra tiempo final con Date.now()
 * - Retorna diferencia (tiempoFinal - tiempoInicial)
 */
async function measureExecutionTime(asyncFn) {
    if (typeof asyncFn !== 'function') return Promise.reject(new Error('Function must be a function'))

    const tiempoInicial = Date.now()
    await asyncFn()

    const tiempoFinal = Date.now()

    return tiempoFinal - tiempoInicial
}

const operations = [
    { type: 'add', a: 5, b: 3 },
    { type: 'multiply', a: 8, b: 2 },
    { type: 'add', a: 16, b: 4 }
];

// console.log(await asyncAdd(2, 4))
// console.log(await asyncMultiply(2, 4))
// console.log(await asyncCalculate(operations))
//  asyncCalculateParallel(operations).then(a => console.log(a))
 (async () => {
    const calc = await asyncCalculateParallel(operations)
    console.log(calc)
 })();
// console.log(await measureExecutionTime(asyncAdd)) 
// asyncCalculate([])

// console.log(await asyncCalculate([{type: 'add', a: 1, b: 2 }]))

module.exports = {
    asyncAdd,
    asyncMultiply,
    asyncCalculate,
    asyncCalculateParallel,
    measureExecutionTime
};

