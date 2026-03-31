/**
 * Funciones Asíncronas con Delays Simples (Async Functions with Simple Delays)
 *
 * Descripción: Este ejercicio introduce los conceptos fundamentales de programación asíncrona
 * en JavaScript usando Promesas, async/await, y simulaciones de delays.
 * Dificultad: BEGINNER
 *
 * Conceptos clave:
 * - Crear promesas con new Promise()
 * - Usar setTimeout() para simular delays
 * - Encadenar operaciones con .then() y .catch()
 * - Usar async/await para código más legible
 * - Ejecutar promesas en paralelo con Promise.all()
 */

/**
 * Crea una promesa que se resuelve después de un número específico de milisegundos.
 * Traducción: Retraso
 *
 * Esta función es la base para simular operaciones que toman tiempo.
 *
 * @param {number} ms - Milisegundos a esperar (debe ser mayor o igual a 0)
 * @returns {Promise<string>} Promesa que se resuelve con "Delay completed" después del tiempo especificado
 *
 * Ejemplo:
 * delay(1000).then(message => console.log(message)); // Imprime "Delay completed" después de 1 segundo
 *
 * TODO:
 * - Valida que ms sea un número
 * - Lanza error "Delay must be a number" si no es número
 * - Valida que ms sea mayor o igual a 0
 * - Lanza error "Delay must be greater than or equal to 0" si es negativo
 * - Retorna una nueva Promise
 * - Dentro de la promesa, usa setTimeout() para esperar ms milisegundos
 * - Después del delay, llama resolve("Delay completed")
 */
function delay(ms) {
    // return console.log(Number.isFinite(ms))
    if (!(Number.isFinite(ms))) return Promise.reject(new Error('Delay must be a number'))
    if (ms < 0) return Promise.reject(new Error('Delay must be greater than or equal to 0'))


    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Delay completed')
            console.log('Delay completed')
        }, ms);
    },)





}

/**
 * Simula obtener datos de un usuario desde una "API" con un delay de 500ms.
 * Traducción: Obtener Datos de Usuario
 *
 * Esta función simula una llamada a una API que tarda 500ms en responder.
 *
 * @param {string|number} userId - ID del usuario
 * @returns {Promise<Object>} Promesa que se resuelve con objeto {id, name, email} después de 500ms
 *
 * Ejemplo:
 * fetchUserData(123).then(user => console.log(user));
 * // Después de 500ms: { id: 123, name: "User 123", email: "user123@example.com" }
 *
 * TODO:
 * - Valida que userId no sea null, undefined o string vacío
 * - Lanza error "User ID is required" si userId es inválido
 * - Retorna una nueva Promise
 * - Dentro de la promesa, usa setTimeout() con 500ms de delay
 * - Después del delay, resuelve con objeto: { id: userId, name: "User " + userId, email: "user" + userId + "@example.com" }
 */
function fetchUserData(userId) {
    const notViable = [null, undefined, '']
    if (notViable.includes(userId)) return Promise.reject(new Error('User ID is required'))

    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve('Delay completed')
    //         console.log('Delay completed')
    //     }, 500);
    // },)

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                { id: userId, name: "User " + userId, email: "user" + userId + "@example.com" }
            )
            // console.log(
            //     { id: userId, name: "User " + userId, email: "user" + userId + "@example.com" }
            // )
        }, 500);
    }, 500)
}

/**
 * Simula procesar datos con un delay de 300ms.
 * Traducción: Procesar Datos
 *
 * Esta función simula una operación de procesamiento que toma tiempo.
 *
 * @param {any} data - Datos a procesar
 * @returns {Promise<string>} Promesa que se resuelve con "Processed: " + String(data) después de 300ms
 *
 * Ejemplo:
 * processData("Hello").then(result => console.log(result)); // "Processed: Hello" después de 300ms
 *
 * TODO:
 * - Valida que data no sea null o undefined
 * - Lanza error "Data is required" si data es inválido
 * - Retorna una nueva Promise
 * - Dentro de la promesa, usa setTimeout() con 300ms de delay
 * - Después del delay, resuelve con "Processed: " + String(data)
 */
function processData(data) {
    const validation = [null, undefined]
    if (validation.includes(data)) return Promise.reject(new Error('Data is required'))

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Processed: ' + String(data))
            console.log('Processed: ' + String(data))
        }, 300);
    })
}

/**
 * Encadena operaciones asíncronas usando .then():
 * 1. Obtiene datos del usuario con fetchUserData()
 * 2. Procesa los datos del usuario con processData()
 * 3. Retorna el resultado procesado
 * Traducción: Manejar Operación Asíncrona
 *
 * Esta función demuestra cómo encadenar múltiples operaciones asíncronas.
 *
 * @param {string|number} userId - ID del usuario
 * @returns {Promise<string>} Promesa que se resuelve con los datos procesados del usuario
 *
 * Ejemplo:
 * handleAsyncOperation(456).then(result => console.log(result));
 * // Después de ~800ms (500ms + 300ms): "Processed: User 456"
 *
 * TODO:
 * - Llama a fetchUserData(userId) y encadena con .then()
 * - En el .then(), recibe userData y llama a processData(userData.name)
 * - Retorna la promesa de processData (puedes encadenar otro .then() o retornar directamente)
 * - Opcional: Agrega .catch() para manejar errores y re-lanzarlos con throw error
 */
function handleAsyncOperation(userId) {
    if (userId === '')return Promise.reject(new Error('User ID is required'))

        return fetchUserData(userId)
            .then((userData => {
                return processData(userData.name)
            }))
            .catch(error => {
                throw error
            })

}

/**
 * Hace lo mismo que handleAsyncOperation() pero usando async/await.
 * Traducción: Manejar Operación Asíncrona con Await
 *
 * Esta función demuestra cómo async/await hace el código más legible.
 *
 * @param {string|number} userId - ID del usuario
 * @returns {Promise<string>} Promesa que se resuelve con los datos procesados del usuario
 *
 * Ejemplo:
 * handleAsyncOperationWithAwait(789).then(result => console.log(result));
 * // Después de ~800ms: "Processed: User 789"
 *
 * TODO:
 * - Marca la función como async
 * - Usa try/catch para manejar errores
 * - Dentro del try:
 *   - Usa await para obtener userData de fetchUserData(userId)
 *   - Usa await para procesar userData.name con processData()
 *   - Retorna el resultado procesado
 * - En el catch, re-lanza el error con throw error
 */
async function handleAsyncOperationWithAwait(userId) {
    try {
        const user = await fetchUserData(userId)
        const process = await processData(user.name)
        return process
    } catch (error) {
        throw error;

    }
}

/**
 * Obtiene datos de múltiples usuarios en paralelo usando Promise.all().
 * Traducción: Obtener Múltiples Usuarios
 *
 * Esta función demuestra cómo ejecutar múltiples promesas en paralelo.
 *
 * @param {Array<string|number>} userIds - Array de IDs de usuarios
 * @returns {Promise<Array>} Promesa que se resuelve con array de objetos de usuario
 *
 * Ejemplo:
 * fetchMultipleUsers([1, 2, 3]).then(users => console.log(users));
 * // Después de ~500ms (no 1500ms, porque es en paralelo):
 * // [{id:1, name:"User 1", email:"user1@example.com"}, ...]
 *
 * TODO:
 * - Valida que userIds sea un array usando Array.isArray()
 * - Lanza error "User IDs must be an array" si no es array (usa Promise.reject())
 * - Valida que el array no esté vacío
 * - Lanza error "User IDs array cannot be empty" si está vacío
 * - Crea un array de promesas usando .map() sobre userIds
 *   - Para cada userId, llama fetchUserData(userId)
 * - Usa Promise.all() con el array de promesas
 * - Retorna el resultado de Promise.all()
 */
function fetchMultipleUsers(userIds) {
    if (!(Array.isArray(userIds))) return Promise.reject(new Error('User IDs must be an array'))
    if (userIds.length === 0) return Promise.reject(new Error('User IDs array cannot be empty'))

    const promises = userIds.map(user => fetchUserData(user))
    return Promise.all(promises)

}


///// Estados
// Promise()
// pending pendiente
// fullfield resuelto
// rejected no se resolvio
//
// Callbacks
// resolve se solventa la promesa
// rejected no se resuelve la promesa

// then()
// catch()

// const promesa = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         let operationSuccesssful = true

//         if (!operationSuccesssful) {
//             resolve('la operacion fue exitosa')
//         } else (
//             reject('fallo la operacion')
//         )
//     }, 2000);
// })

// promesa
//     .then(successfullMesage => {
//         console.log(successfullMesage)
//     })
//     .catch(errorMesage => {
//         console.log(errorMesage)
//     })




// ////
// function fetchData () {
//     fetch('https://rickandmortyapi.com/api/character')
//     .then((response) => response.json())
//     .then( data => console.log(data))
//     .catch(error => console.log(error))
// }

// const personajes = fetchData()
// console.log(personajes.results)



// const urls = [
//     "https://rickandmortyapi.com/api/character",
//     "https://rickandmortyapi.com/api/location",
//     "https://rickandmortyapi.com/api/episode",
// ];

// async function fetchNewData() {
//     try {
//         for await (let url of urls) {
//             let response = await fetch(url)
//             let data = await response.json()

//             console.log(data)
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// fetchNewData()



// console.log(delay(1200))
// console.log(fetchUserData('armando'))
// console.log(processData('hello'))
// console.log(handleAsyncOperation('armando'))


console.log(fetchMultipleUsers(['1654546', '546465', '684+8']))

module.exports = {
    delay,
    fetchUserData,
    processData,
    handleAsyncOperation,
    handleAsyncOperationWithAwait,
    fetchMultipleUsers
};

