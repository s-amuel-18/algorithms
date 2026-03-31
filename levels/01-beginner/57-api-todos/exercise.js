/**
 * @file exercise.js
 * @description Ejercicio de gestión de tareas (TODOs) consumiendo una API.
 */

// const { use } = require("react");

/**
 * Obtiene todas las tareas de un usuario específico.
 * 
 * Endpoint: https://jsonplaceholder.typicode.com/todos?userId={id}
 * 
 * @param {number} userId - El ID del usuario.
 * @returns {Promise<Array>} Promesa que resuelve al array de tareas.
 */
async function fetchTodosByUser(userId) {
  // Tu código aquí
  // 1. Obtener datos de la API
  const url = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
  // console.log(url)
  if (!url.ok) throw new Error(`hubo un error con la peticion error ${url.status}`);

  // 2. Retornar el array completo
  return await url.json()
}

/**
 * Obtiene solo las tareas completadas de un usuario.
 * 
 * @param {number} userId - El ID del usuario.
 * @returns {Promise<Array>} Promesa que resuelve al array de tareas completadas.
 */
async function getCompletedTodos(userId) {
  // Tu código aquí
  // 1. Llamar a 
  const arryTodo = await fetchTodosByUser(userId)
  // 2. Filtrar el resultado para obtener solo las tareas con completed: true
  return arryTodo.filter(todo => todo.completed === true)
}

/**
 * Obtiene solo las tareas pendientes de un usuario.
 * 
 * @param {number} userId - El ID del usuario.
 * @returns {Promise<Array>} Promesa que resuelve al array de tareas pendientes.
 */
async function getPendingTodos(userId) {
  // Tu código aquí
  // 1. Llamar a fetchTodosByUser(userId)
  const arryTodo = await fetchTodosByUser(userId)

  // 2. Filtrar el resultado para obtener solo las tareas con completed: false
  return arryTodo.filter(todo => todo.completed === false)
}

/**
 * Cuenta las tareas por estado y retorna un resumen.
 * 
 * @param {number} userId - El ID del usuario.
 * @returns {Promise<Object>} Promesa que resuelve al resumen de conteo.
 * Estructura del objeto: { total: number, completed: number, pending: number }
 */
async function countTodosByStatus(userId) {
  const todos = await fetchTodosByUser(userId);
  
  const completed = todos.filter(todo => todo.completed).length;
  const pending = todos.filter(todo => !todo.completed).length;
  
  return {
    total: todos.length,
    completed,
    pending
  };
}

/**
 * Crea una nueva tarea para un usuario.
 * 
 * Método: POST
 * Endpoint: https://jsonplaceholder.typicode.com/todos
 * Body: { userId: number, title: string, completed: false }
 * 
 * @param {number} userId - El ID del usuario.
 * @param {string} title - El título de la tarea.
 * @returns {Promise<Object>} Promesa que resuelve a la tarea creada (respuesta de la API).
 */
async function createTodo(userId, title) {
  // Tu código aquí
  // 1. Configurar la petición fetch con método POST
  const url = await fetch(`https://jsonplaceholder.typicode.com/todos`,
    {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: 'bar', // Este campo es opcional para este ejercicio, pero común en JSONPlaceholder
        userId: userId,
        completed: false // Estado inicial por defecto
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  // 2. Incluir headers y body JSON
  if (!url.ok) throw new Error(`hubo un problema del tipo ${url.status}`);

  // 3. Enviar la petición y retornar la respuesta
  return await url.json()
}

module.exports = {
  fetchTodosByUser,
  getCompletedTodos,
  getPendingTodos,
  countTodosByStatus,
  createTodo
};


// fetchTodosByUser(1).then(a => console.log(a))
// getCompletedTodos(1).then(a => console.log(a))
// getPendingTodos(1).then(a => console.log(a))
countTodosByStatus(1).then(a => console.log(a))
// createTodo(1, 'cositas candelas').then(a => console.log(a))