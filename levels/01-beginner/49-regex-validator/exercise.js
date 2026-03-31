/**
 * Validador de Expresiones Regulares
 * 
 * Descripción: Valida si un texto coincide con un patrón de expresión regular específico.
 * Dificultad: BEGINNER
 * 
 * @param {string} text - Texto a validar
 * @param {string} patternType - Tipo de patrón a validar: 'email', 'phone', 'postalCode', 'url', 'date'
 * @returns {boolean} true si el texto coincide con el patrón, false en caso contrario
 * 
 * Ejemplo:
 * validateRegex("user@example.com", "email") // true
 * validateRegex("123-456-7890", "phone") // true
 * validateRegex("12345", "postalCode") // true
 */

function validateRegex(text, patternType) {
    // TODO: Implementar la solución aquí

    // Pista 1: Valida que text sea un string y patternType sea un string
    if (typeof text !== 'string') throw new Error("Text must be a string");
    if (typeof patternType !== 'string') throw new Error("patternType is required");

    // Pista 2: Define los patrones regex para cada tipo:
    //   - email: debe contener @, dominio válido, etc.
    //   - phone: formato de teléfono (puede incluir guiones, espacios, paréntesis)
    //   - postalCode: código postal (5 dígitos o formato ZIP+4)
    //   - url: debe empezar con http:// o https://, dominio válido
    //   - date: formato de fecha (MM/DD/YYYY o DD/MM/YYYY)


    const patterns = {
        email: /^[\w.-]+@[\w.-]+.[a-zA-Z]{2}$/i,
        phone: /^\+?[(]?\d{0,3}[ )/.-]?[ ]?\d{3}[ /.-]?\d{4}$/,
        postalCode: /^[a-zA-Z0-9]{5,10}$|^[a-zA-Z0-9]{5}-[a-zA-Z0-9]{4}$/,
        url: /^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        date: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d$/
    }
    // Pista 3: Usa el método test() de la expresión regular para validar el texto
    // console.log()
    // console.log(patterns[patternType])
    // Pista 4: Retorna true si coincide, false si no coincide
    console.log(patterns[patternType])
    return patterns[patternType].test(text)
}

console.log(validateRegex('(123) 456-7890', 'phone'))
// console.log(validateRegex('+58.424.195.1431', 'phone'))
// console.log(validateRegex('+584241951431', 'phone'))


module.exports = validateRegex;

