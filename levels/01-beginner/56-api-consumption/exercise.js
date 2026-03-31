/**
 * @file exercise.js
 * @description Ejercicio de consumo de API usando fetch y async/await.
 */
// candela
/**
 * Obtiene los detalles de un usuario desde la API.
 * 
 * Endpoint: https://jsonplaceholder.typicode.com/users/{id}
 * 
 * @param {number} id - El ID del usuario.
 * @returns {Promise<Object>} Promesa que resuelve al objeto usuario.
 * @throws {Error} Si la petición falla o el usuario no existe (404).
 */
async function fetchUser(id) {
  // Tu código aquí
  // 1. Definir URL base: https://jsonplaceholder.typicode.com

  const url = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  if (!url.ok) throw new Error("no se encontro lo solicitado POR EROOR " + url.status)

  return await url.json()
  // 2. Hacer petición fetch a URL + /users/{id}
  // 3. Verificar si la respuesta es exitosa (response.ok)
  // 4. Si no es exitosa, lanzar un error
  // 5. Retornar el JSON de la respuesta
}

/**
 * Obtiene los posts de un usuario desde la API.
 * 
 * Endpoint: https://jsonplaceholder.typicode.com/posts?userId={id}
 * 
 * @param {number} id - El ID del usuario.
 * @returns {Promise<Array>} Promesa que resuelve al array de posts.
 */
async function fetchUserPosts(id) {
  // Tu código aquí
  // 1. Hacer petición fetch a URL + /posts?userId={id}
  const url = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
  // 2. Verificar si la respuesta es exitosa
  if (!url.ok) throw new Error("hubo un error " + url.status);

  // 3. Retornar el JSON (array de posts)
  return await url.json()
}

/**
 * Obtiene un resumen formateado del perfil del usuario.
 * 
 * Debe combinar la información del usuario y sus posts.
 * 
 * Estructura de retorno:
 * {
 *   id: number,
 *   fullName: string,       // Usuario.name
 *   email: string,          // Usuario.email
 *   addressSummary: string, // "Calle, Ciudad" (ej. "Kulas Light, Gwenborough")
 *   totalPosts: number      // Cantidad de posts del usuario
 * }
 * 
 * @param {number} id - El ID del usuario.
 * @returns {Promise<Object>} Promesa que resuelve al perfil formateado.
 * @throws {Error} Si el usuario no existe.
 */
async function getFormattedUserProfile(id) {
  // Tu código aquí
  // 1. Llamar a fetchUser(id)
  const user = await fetchUser(id)
  // 2. Llamar a fetchUserPosts(id)
  const posts = await fetchUserPosts(id)
  // 3. Extraer los datos necesarios
  return {
    id: id,
    fullName: user.name,       // Usuario.name
    email: user.email,          // Usuario.email
    addressSummary: `${user.address.street}, ${user.address.city}`, // "Calle, Ciudad" (ej. "Kulas Light, Gwenborough")
    totalPosts: posts.length      // Cantidad de posts del usuario
  }
  // 4. Retornar el objeto con la estructura requerida
}

module.exports = {
  fetchUser,
  fetchUserPosts,
  getFormattedUserProfile
};


// fetchUser(1).then((c) => console.log(c, '1'))
// fetchUserPosts(1).then((c) => console.log(c.slice(0, 3), '2'))
// getFormattedUserProfile(1).then((c) => console.log(c, '3'))