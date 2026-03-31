/**
 * Reverse String
 * 
 * Descripción: Dado un array de caracteres, revierte el string en el lugar (in-place).
 * Dificultad: BEGINNER
 * 
 * @param {character[]} s - Array de caracteres que representa un string
 * @returns {void} No devuelve nada, modifica el array en el lugar
 * 
 * Ejemplo:
 * Input: ["h","e","l","l","o"]
 * Output: ["o","l","l","e","h"]
 */
let caja = ["h", "e", "l", "l", "o"]
reverseString(caja)
console.log(caja)
function cleanArray(arr){
    for (const element of arr) {
        arr.pop()
    }
}
function reverseString(letters) {
    
    const auxLetter = [...letters]
    cleanArray(letters)
    for (let i = auxLetter.length - 1; i >= 0; i--) {
        const letter = auxLetter[i]
        letters.push(letter)
    }
    
    return letters
}
function reverseStrings(s) {
    contador = 0
    for (let i = s.length - 1; i >= 0; i--) {
        s.splice(contador, 0, s[s.length - 1])
        console.log(s)
        s.splice(s.length - 1, 1,)
        console.log(s)
        contador++
    }

    console.log(caja)

    return
    // TODO: Implementar la solución aquí

    // Pista: Usa la técnica de dos punteros, uno al inicio y otro al final del array

    // throw new Error('Función no implementada');
}



reverseString(caja)
console.log({ caja })
module.exports = reverseString;
