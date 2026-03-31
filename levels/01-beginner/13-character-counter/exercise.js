/**
 * Contador de Caracteres en Texto
 * 
 * Descripción: Cuenta cuántas veces aparece cada letra en un texto dado.
 * Dificultad: BEGINNER
 * 
 * @param {string} text - Texto a analizar
 * @returns {Object} Objeto con el conteo de cada letra
 * 
 * Ejemplo:
 * countCharacters("Hola mundo") // {h: 1, o: 2, l: 1, a: 1, m: 1, u: 1, n: 1, d: 1}
 */
let caracter = 'Hola 123 Mundo!'

function countCharacters(text) {

    text = text.replaceAll(' ', '')
    text = text.replaceAll(',', '')
    text = text.replaceAll('.', '')
    text = text.replaceAll('?', '')
    text = text.replaceAll('¿', '')
    text = text.replaceAll('¡', '')
    text = text.replaceAll('!', '')
    text = text.replaceAll( /[^a-zA-Z\s]/g, '')
    text = text.toLowerCase()
    console.log(text)

    let countCaracte = {}
    let count = 0
    for (let i = 0; i < text.length; i++){
        for (let j = 0; j< text.length; j++){
            if(text[i] === text[j]){
                console.log(text[i], text[j])
                count ++

            }
            countCaracte[text[i]] = count
        }
        count = 0
    }
    console.log(countCaracte)

    return countCaracte


    // TODO: Implementar la solución aquí

    // Pista 1: Convierte el texto a minúsculas usando toLowerCase()

    // Pista 2: Crea un objeto vacío para almacenar los conteos

    // Pista 3: Usa un bucle para iterar sobre cada carácter del texto

    // Pista 4: Verifica si el carácter es una letra (entre 'a' y 'z')

    // Pista 5: Si es una letra, incrementa su contador en el objeto

    // throw new Error('Función no implementada');
}

countCharacters(caracter)

module.exports = countCharacters;
