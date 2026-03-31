/**
 * Generador de Contraseñas Seguras
 * 
 * Descripción: Genera contraseñas aleatorias seguras con criterios configurables.
 * Dificultad: BEGINNER
 * 
 * @param {number} length - Longitud de la contraseña (mínimo 8, máximo 128)
 * @param {Object} options - Opciones de configuración de la contraseña
 * @param {boolean} options.includeUppercase - Incluir letras mayúsculas (A-Z)
 * @param {boolean} options.includeLowercase - Incluir letras minúsculas (a-z)
 * @param {boolean} options.includeNumbers - Incluir números (0-9)
 * @param {boolean} options.includeSpecialChars - Incluir caracteres especiales (!@#$%^&*)
 * @returns {string} Contraseña generada aleatoriamente
 * 
 * Ejemplo:
 * generatePassword(12, {includeUppercase: true, includeLowercase: true, includeNumbers: true, includeSpecialChars: true})
 * // Retorna una contraseña de 12 caracteres con todos los tipos de caracteres
 */

function generatePassword(length, options = {}) {
    // TODO: Implementar la solución aquí

    // Pista 1: Valida que length sea un número entre 8 y 128
    if (length < 8 || length > 128) throw new Error("Length must be an integer between 8 and 128");

    // Pista 2: Valida que al menos una opción esté habilitada (includeUppercase, includeLowercase, includeNumbers, includeSpecialChars)
    const validation = Object.values(options).includes(true)

    // Pista 3: Define los conjuntos de caracteres disponibles:
    const Mayúsculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const Minúsculas = "abcdefghijklmnopqrstuvwxyz"
    const Números = "0123456789"
    const Especiales = "!@#$%^&*"

    // Pista 4: Construye un string con todos los caracteres permitidos según las opciones
    let passCharacter = ''
    if (options.includeUppercase) passCharacter += Mayúsculas
    if (options.includeLowercase) passCharacter += Minúsculas
    if (options.includeNumbers) passCharacter += Números
    if (options.includeSpecialChars) passCharacter += Especiales


    // Pista 5: Asegúrate de que la contraseña incluya al menos un carácter de cada tipo habilitado
    let passwordArray = []

    while (passwordArray.length < length) {

        if (options.includeUppercase) {
            let valor = parseFloat((Math.random() * (Mayúsculas.length - 1)).toFixed(0))
            passwordArray.push(Mayúsculas[valor])
        }

        if (passwordArray.length >= length) break
        if (options.includeLowercase) {
            let valor = parseFloat((Math.random() * (Minúsculas.length - 1)).toFixed(0))
            passwordArray.push(Minúsculas[valor])
        }

        if (passwordArray.length >= length) break
        if (options.includeNumbers) {
            let valor = parseFloat((Math.random() * (Números.length - 1)).toFixed(0))
            passwordArray.push(Números[valor])
        }
        if (passwordArray.length >= length) break

        if (options.includeSpecialChars) {
            let valor = parseFloat((Math.random() * (Especiales.length - 1)).toFixed(0))
            passwordArray.push(Especiales[valor])
        }
        if (passwordArray.length > length) break
        console.log(passwordArray.length)
    }

    console.log(passwordArray, 'antes')
    // Pista 6: Genera caracteres aleatorios usando Math.random() y el string de caracteres permitidos
    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }
    console.log(passwordArray, 'despues')
    // Pista 7: Mezcla los caracteres para que no estén en orden predecible
    return passwordArray.join('')
}



console.log(generatePassword(15, {
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: true
}))

module.exports = generatePassword;