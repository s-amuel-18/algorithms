/**
 * Ejercicio: Búsqueda de Palabras en Texto
 * 
 * Implementa un sistema de búsqueda de palabras en texto que cuenta
 * ocurrencias, maneja diferentes casos y proporciona estadísticas
 * de búsqueda.
 * 
 * Complejidad temporal: O(n*m) donde n es la longitud del texto y m la longitud de la palabra
 * Complejidad espacial: O(1) para la búsqueda básica
 */

/**
 * Busca una palabra en un texto y cuenta cuántas veces aparece
 * 
 * @param {string} text - Texto donde buscar
 * @param {string} word - Palabra a buscar
 * @param {boolean} caseSensitive - Si la búsqueda es sensible a mayúsculas/minúsculas
 * @returns {number} - Número de veces que aparece la palabra
 */

const myFilter = [1,2,3].filter(function(num, idx){
    console.log("idx",idx)
    return num % 2=== 0
})
console.log("myFilter",myFilter)
// [1,2,3].filter(()=> true)
        // new MyArmando]'´-Class()
// const myText = "gato perro galeria"
// const myPatter = "*ga"
// const myRegex = new RegExp(`\\bga\\w*`, "gi")´

// console.log("______",  myText.match(myRegex))
// const sampleText = "El gato negro está, en el jardín. El gato es muy inteligente y el jardín es hermoso.";
// const word = 'El'
// const trueORFalse = true
// const wordsExample = ['el', 'gato', 'muy', 'es']
// const patter = 'in'



function searchWord(text, word, caseSensitive = false ) {
    let words = []
    let countWords
    let key = word
    if (caseSensitive === false) {
        text = text.toLowerCase()
        word = word.toLowerCase()
        // console.log(text)
    }

    text = text.replace(/[.]/g, '')
    text = text.replace(/[,]/g, '')
    text = text.replace(/[!]/g, '')
    text = text.replace(/[¡]/g, '')
    text = text.replace(/[¿]/g, '')
    text = text.replace(/[?]/g, '')
    // console.log(text)


    words = text.split(' ')
    // console.log(words)

    // countWords = words.filter(word => word === key)
    let count = 0
    for(w of words){
        if(word === w){
            count ++
        }
    }
    console.log(count)
    // console.log(word)
    // console.log(countWords)
    // console.log('------------------------------------------')
    // console.log(countWords.length)
    // console.log(' ')

    return count

    // TODO: Implementar búsqueda de palabra
    // 
    // Pasos:
    // 1. Normalizar texto y palabra según caseSensitive
    // 2. Dividir el texto en palabras
    // 3. Contar cuántas veces aparece la palabra exacta
    // 4. Retornar el conteo
    // 
    // Pista: Usa split() para dividir el texto y filter() para contar

    // throw new Error('Función no implementada');
}






/**
 * Busca una palabra en un texto y retorna información detallada
 * 
 * @param {string} text - Texto donde buscar
 * @param {string} word - Palabra a buscar
 * @param {boolean} caseSensitive - Si la búsqueda es sensible a mayúsculas/minúsculas
 * @returns {Object} - Objeto con información detallada de la búsqueda
*/
function searchWordDetailed(text, word, caseSensitive = false) {
    let numbOcurrences = searchWord(sampleText, word, trueORFalse)
    let detailed = {}
    let positions = []


    if (caseSensitive === false) {
        text = text.toLowerCase()
        // console.log(text)
    }
    text = text.replace(/[.]/g, '')
    text = text.replace(/[,]/g, '')


    words = text.split(' ')
    // console.log(words)
    for (let i = 0; i < words.length; i++) {
        if (words.indexOf(word, i) >= 0) {
            positions.push(words.indexOf(word, i))
            i = words.indexOf(word, i)
            // console.log(i +' '+ positions)
        }
    }
    if (positions.length === 0) {
        lastPosition = -1
        firstPosition = -1
    } else {
        lastPosition = positions[positions.length - 1]
        firstPosition = positions[0]
    }
    positions[positions.length - 1]
    wordLength = word.length

    detailed = {
        count: numbOcurrences,
        positions: positions,
        firstPosition: firstPosition,
        lastPosition: lastPosition,
        wordLength: wordLength
    }

    console.log(detailed)
    console.log('////////////////////////////////////')
    console.log(' ')
    return detailed

    // TODO: Implementar búsqueda detallada
    // 
    // Retornar objeto con:
    // - count: número de ocurrencias
    // - positions: array con las posiciones donde aparece
    // - firstPosition: posición de la primera ocurrencia (-1 si no se encuentra)
    // - lastPosition: posición de la última ocurrencia (-1 si no se encuentra)
    // - wordLength: longitud de la palabra buscada
    // 
    // Pista: Usa indexOf() en un bucle para encontrar todas las posiciones

    // throw new Error('Función no implementada');
}
searchWordDetailed(sampleText, word, trueORFalse)

/**
 * Busca múltiples palabras en un texto
 * 
 * @param {string} text - Texto donde buscar
 * @param {Array} words - Array de palabras a buscar
 * @param {boolean} caseSensitive - Si la búsqueda es sensible a mayúsculas/minúsculas
 * @returns {Object} - Objeto con el conteo de cada palabra
 */
function searchMultipleWords(text, words, caseSensitive = false) {
    let objetFunction = {}

    for (let i = 0; i < words.length; i++) {
        objetFunction[words[i]] = searchWord(text, words[i], trueORFalse)
    }
    console.log(objetFunction)
    console.log('//////////////////////////////')
    // TODO: Implementar búsqueda de múltiples palabras
    // 
    // Pasos:
    // 1. Crear un objeto para almacenar resultados
    // 2. Para cada palabra, usar searchWord() para contar
    // 3. Almacenar el resultado en el objeto
    // 4. Retornar el objeto con todos los conteos
    // 
    // Pista: Usa reduce() o forEach() para iterar sobre las palabras

    // throw new Error('Función no implementada');
    return objetFunction
}
searchMultipleWords(sampleText, wordsExample, trueORFalse)

/**
 * Busca palabras que contengan un patrón específico
 * 
 * @param {string} text - Texto donde buscar
 * @param {string} pattern - Patrón a buscar (puede contener * como comodín)
 * @param {boolean} caseSensitive - Si la búsqueda es sensible a mayúsculas/minúsculas
 * @returns {Array} - Array de palabras que coinciden con el patrón
 */
function searchPattern(text, pattern, caseSensitive = false) {
    let pat = RegExp(pattern)
    console.log(pat)
    text = text.toLowerCase()
    // let words = 'gato'
    let words = text.split(' ')
    console.log(words)




    // let a = words.includes(pattern)
    // console.log(a)
    let coincidense = []
    for (let i = 0; i < words.length; i++) {
        if (words[i].includes(pattern) === true) {

            coincidense.push(words[i])
        }
    }
    console.log(coincidense)
    console.log('               //////             ')

    return coincidense

    // TODO: Implementar búsqueda por patrón
    // 
    // Pasos:
    // 1. Convertir el patrón a expresión regular
    // 2. Dividir el texto en palabras
    // 3. Filtrar palabras que coincidan con el patrón
    // 4. Retornar array de palabras encontradas
    // 
    // Pista: Usa new RegExp() para crear la expresión regular

    // throw new Error('Función no implementada');
}
searchPattern(sampleText, patter, trueORFalse)

/**
 * Encuentra la palabra más frecuente en un texto
 * 
 * @param {string} text - Texto a analizar
 * @param {boolean} caseSensitive - Si el análisis es sensible a mayúsculas/minúsculas
 * @returns {Object} - Objeto con la palabra más frecuente y su conteo
 */
function findMostFrequentWord(texto, caseSensitive = false) {
    let objFinal = {}

    texto = texto.replace(/[.]/g, '')
    texto = texto.replace(/[,]/g, '')

    texto = texto.toLowerCase()

    let wordSplit = texto.split(' ')
    // console.log(texto)

    for (let i = 0; i < wordSplit.length; i++) {

        objFinal[wordSplit[i]] = searchWord(texto, wordSplit[i], trueORFalse)
        // console.log(wordSplit[i])
        // console.log(objFinal)
    }


    // console.log(objFinal)
    let dataMax = 0
    let key
    for (element in objFinal) {

        if (objFinal[element] > dataMax) {
            dataMax = objFinal[element]
            key = element
        }
        // console.log(dataMax + ' ' + key)
    }
    let result = {}
    result[key] = dataMax
    console.log(result)
    console.log('+_____________________+')

    return result

    // TODO: Implementar búsqueda de palabra más frecuente
    // 
    // Pasos:
    // 1. Dividir el texto en palabras
    // 2. Contar la frecuencia de cada palabra
    // 3. Encontrar la palabra con mayor frecuencia
    // 4. Retornar objeto con la palabra y su conteo
    // 
    // Pista: Usa reduce() para contar frecuencias y Object.entries() para encontrar el máximo

    // throw new Error('Función no implementada');
}
findMostFrequentWord(sampleText, trueORFalse)

/**
 * Genera estadísticas completas de un texto
 * 
 * @param {string} text - Texto a analizar
 * @param {boolean} caseSensitive - Si el análisis es sensible a mayúsculas/minúsculas
 * @returns {Object} - Objeto con estadísticas del texto
 */
function generateTextStats(text, caseSensitive = false) {
    text = text.replace(/[.]/g, '')
    text = text.replace(/[,]/g, '')
    text = text.toLowerCase()

    let arryWords = text.split(' ')
    let totalWords = text.split(' ').length
    let uniqueWords = []

    for (palabra of arryWords) {
        if (searchWord(text, palabra, caseSensitive) === 1) {
            uniqueWords.push(palabra)

        }

    }

    console.log(uniqueWords)

    mostFrequentWord = findMostFrequentWord(text, caseSensitive)


    let averageWordLength
    let count = 0
    for (tex of arryWords) {
        count += tex.length
    }
    averageWordLength = count / arryWords.length
    averageWordLength = averageWordLength.toFixed(2)
    console.log(averageWordLength)


    let longestWord
    let countLarges = 0
    for (large of arryWords) {
        if (countLarges < large.length) {
            countLarges = large.length
            longestWord = large
        }
    }
    console.log(longestWord)
    
    let shortestWord
    let countShort = arryWords[0]
    for(let i = 0; i<arryWords.length; i++){
        if(countShort.length < arryWords[i].length){
            shortestWord = countShort
        }
    }
    console.log(shortestWord)

    // TODO: Implementar generación de estadísticas
    // 
    // Retornar objeto con:
    // - totalWords: número total de palabras
    // - uniqueWords: número de palabras únicas
    // - mostFrequentWord: palabra más frecuente
    // - averageWordLength: longitud promedio de las palabras
    // - longestWord: palabra más larga
    // - shortestWord: palabra más corta
    // 
    // Pista: Combina las funciones anteriores para generar las estadísticas

    // throw new Error('Función no implementada');
}

generateTextStats(sampleText, trueORFalse)

/**
 * Limpia y normaliza un texto para búsqueda
 * 
 * @param {string} text - Texto a limpiar
 * @param {boolean} caseSensitive - Si mantener mayúsculas/minúsculas
 * @returns {string} - Texto limpio y normalizado
 */
function cleanText(text, caseSensitive = false) {

    if(caseSensitive === false){
        text = text.replaceAll(',', '')
        text = text.replaceAll('.', '')
        text = text.replaceAll('  ', ' ')
        text = text.toLowerCase()
        console.log(text)
    }

    return text
    // TODO: Implementar limpieza de texto
    // 
    // Pasos:
    // 1. Remover caracteres especiales (excepto espacios)
    // 2. Normalizar espacios múltiples a uno solo
    // 3. Aplicar caseSensitive según corresponda
    // 4. Retornar texto limpio
    // 
    // Pista: Usa replace() con expresiones regulares

    // throw new Error('Función no implementada');
}

cleanText(sampleText, trueORFalse)

module.exports = {
    searchWord,
    searchWordDetailed,
    searchMultipleWords,
    searchPattern,
    findMostFrequentWord,
    generateTextStats,
    cleanText
};




searchPattern(sampleText, patter, trueORFalse)