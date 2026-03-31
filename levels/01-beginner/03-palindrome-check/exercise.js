/**
 * Palindrome Check
 * 
 * Descripción: Determina si una string es un palíndromo, ignorando caracteres no alfanuméricos y capitalización.
 * Dificultad: BEGINNER
 * 
 * @param {string} s - String a verificar
 * @returns {boolean} true si es palíndromo, false en caso contrario
 * 
 * Ejemplo:
 * isPalindrome("A man a plan a canal Panama") // true
 */

function isPalindrome(s) {
        let sinEspacios = s.replaceAll(' ', '').replaceAll('.', '').replaceAll(',', '').replaceAll(/'/g, '').toLowerCase()

       
        console.log({sinEspacios})
        let resultado = ''



        for (let i = sinEspacios.length-1; i >= 0; i-- ){
            resultado += sinEspacios[i]
        }

        if (resultado === sinEspacios ){
            return true
        } else {
            return false
        }


        // let textInvert = sinEspacios
  
  
    // // TODO: Implementar la solución aquí
    
    // // Pista: Primero limpia la string removiendo caracteres no alfanuméricos y convirtiendo a minúsculas
    
    // throw new Error('Función no implementada');
}

let palabra = "Madam, I'm Adam"

isPalindrome(palabra)
// console.log(palabra[0])

// let palabra = 'casa sola'
// let sinEspacio = palabra.replace(' ', '')
// console.log(sinEspacio)

module.exports = isPalindrome;