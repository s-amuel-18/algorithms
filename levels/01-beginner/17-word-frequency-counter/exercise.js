
/**
 * Contador de Frecuencia de Palabras
 * 
 * Descripción: Implementa funciones para analizar texto y contar la frecuencia de palabras.
 * El sistema debe limpiar texto, dividirlo en palabras válidas, contar frecuencias y generar reportes.
 * Dificultad: BEGINNER
 * 
 * Funciones requeridas:
 * - countWordFrequency(text): Cuenta frecuencia de palabras
 * - getTopWords(frequencyMap, limit): Obtiene palabras más frecuentes
 * - filterCommonWords(frequencyMap, commonWords): Filtra palabras comunes
 * - generateWordReport(text, options): Genera reporte completo
 */

const { transform } = require("@babel/core");

/**
 * Cuenta la frecuencia de palabras en el texto
 * @param {string} text - Texto a analizar
 * @returns {Object} Objeto con palabras como claves y frecuencias como valores
 */

let texto = 'hello-world javascript-programming2';


function countWordFrequency(text) {


    // TODO: Implementar conteo de frecuencia de palabras
    // Pista 1: Limpiar el texto (eliminar puntuación, convertir a minúsculas)
    text = text.toLowerCase()
    text = text.replaceAll('.', '')
    text = text.replaceAll(',', '')
    text = text.replaceAll('!', '')
    text = text.replaceAll('?', '')
    text = text.replaceAll(/'/g, '')
    // console.log(text)
    // console.log(text.length)
    // console.log(text.length)
    // Pista 2: Dividir el texto en palabras válidas (mínimo 2 caracteres)

    let arryText = []
    if (text.length >= 2) {
        arryText = text.split(' ')
    } else {
        return {}
    }

    let cierre = 0
    for (let i = 0; i < arryText.length; i++) {
        if (arryText[i].includes('-')) {
            cierre++
        }

    }

    if(cierre === arryText.length){
        return {}
    }
    // console.log(arryText)

    // Pista 3: Filtrar palabras que solo contengan letras y números


    arryText = arryText.filter(cosa => cosa !== '')
    console.log(arryText, 'cosas cosas ')

    for (let i = 0; i < arryText.length; i++) {
        if (arryText[i].includes('-')) {
            let ind = arryText[i].indexOf('-')
            console.log(ind, 'ind')
            arryText.splice(i, 1)
            console.log(arryText.splice(i, 1), 'aqui se ve que paso')
        }
    }



    // Pista 4: Usar un objeto para contar frecuencias
    let count = 0
    let objFinal = {}
    for (let j = 0; j < arryText.length; j++) {
        for (let i = 0; i < arryText.length; i++) {
            if (arryText[j] === arryText[i]) {
                count++

            }
            if (arryText[j].length >= 2) {
                {
                    objFinal[arryText[j]] = count
                }
            }
            // console.log(arryText[j])
        }
        count = 0
    }

    console.log(objFinal)
    console.log('aqui termina la primera parte------------------')
    console.log(' ')
    console.log(' ')
    console.log(' ')
    // Pista 5: Retornar el objeto con las frecuencias
    return objFinal
    // throw new Error('Función countWordFrequency no implementada');
}

let frequency = countWordFrequency(texto)








/**
 * Obtiene las palabras más frecuentes ordenadas por frecuencia
 * @param {Object} frequencyMap - Mapa de frecuencias
 * @param {number} limit - Número máximo de palabras a retornar
 * @returns {Array} Array de objetos {word, frequency} ordenados por frecuencia
 */

const frequencyMap = frequency

function getTopWords(frequencyMap, limit = 10) {



    // TODO: Implementar obtención de palabras más frecuentes
    // console.log(frequencyMap, 'elemento')
    // Pista 1: Validar que frequencyMap sea un objeto válido
    if (Object.prototype.toString.call(frequencyMap) === '[object Object]') {
    } else {
        // console.log([])
        return []
    }
    // Pista 2: Convertir el objeto a array con Object.entries()
    let arryOfArrys = Object.entries(frequencyMap)
    // Pista 3: Mapear a objetos {word, frequency}
    let arryOfObj = {}

    for (let i = 0; i < arryOfArrys.length; i++) {
        arryOfArrys[i] = { word: arryOfArrys[i][0], frequency: arryOfArrys[i][1] }
    }
    // console.log(arryOfArrys)
    // Pista 4: Ordenar por frecuencia descendente (mayor a menor)

    // console.log(arryOfArrys)
    arryOfArrys.sort((a, b) => a.word.localeCompare(b.word, undefined))
    // console.log(arryOfArrys)

    arryOfArrys.sort((a, b) => b.frequency - a.frequency)
    // console.log(arryOfArrys)

    // for (let i = 0; i < arryOfArrys.length; i++) {
    //     let lastPosition = 0
    //     for (let j = 0; j < arryOfArrys.length; j++) {
    //         if (arryOfArrys[i].frequency <= arryOfArrys[j].frequency) {
    //             lastPosition = j
    //         }
    //     }
    //     let trash = arryOfArrys.splice(i, 1)
    //     arryOfArrys.splice(lastPosition, 0, trash[0])
    // }
    // console.log(arryOfArrys)
    // console.log(' aqui pasa algo')




    // Pista 5: En caso de empate, ordenar alfabéticamente


    // for (let i = 0; i < arryOfArrys.length; i++) {
    //     let nule = i
    //     for (let j = 0; j < arryOfArrys.length; j++) {
    //         if(i != j){

    //             if (arryOfArrys[i].frequency === arryOfArrys[j].frequency) {
    //                 let mod = arryOfArrys.splice(i, 2)
    //                 console.log(mod, 'elementos eiminados ')
    //                 console.log(arryOfArrys, 'asi queda despues de sacarle cosas ')
    //                 mod.sort((a,b) => a.word.localeCompare(b.word, undefined))
    //                 console.log(mod)

    //                 for(mody of mod){  
    //                     arryOfArrys.splice(nule,0,mody)
    //                     console.log(arryOfArrys, 'arreglado' )

    //                 }
    //             }
    //         }

    //         console.log('ronda ' + i)
    //     }

    // }


    // Pista 6: Limitar resultados con slice()
    if (limit >= 0) {

        arryOfArrys = arryOfArrys.slice(0, limit)
    }

    console.log(arryOfArrys, 'valor deseado')
    // Pista 7: Retornar el array ordenado
    return arryOfArrys
    // throw new Error('Función getTopWords no implementada');
}

// const arrnum = [1, 2, 3, 4]
// const newArray = arrnum.filter(e => {
//     return e>2
// })
// console.log(newArray)

let topWords = getTopWords(frequencyMap, 3)







/**
 * Filtra palabras comunes del mapa de frecuencias
 * @param {Object} frequencyMap - Mapa de frecuencias
 * @param {Array} commonWords - Array de palabras comunes a filtrar
 * @returns {Object} Nuevo mapa sin las palabras comunes
 */


const words = frequency

const commonWords = ['is', 'a', 'for', 'with']

function filterCommonWords(frequencyMap, commonWords = []) {

    // console.log(frequencyMap, "Minusculas")
    // console.log(commonWords, "Minusculas")
    // TODO: Implementar filtrado de palabras comunes
    // Pista 1: Validar que frequencyMap sea un objeto válido
    if (Object.prototype.toString.call(frequencyMap) === '[object Object]') {
    } else {
        // console.log({})
        return {}
    }

    if (Object.keys(frequencyMap).length === 0) {
        return {}
    }
    // console.log(Object.keys(frequencyMap).length, 'aqui')

    // Pista 2: Validar que commonWords sea un array
    if (Array.isArray(commonWords)) {

    } else {
        // console.log([])
        return {}
    }
    // Pista 3: Crear un nuevo objeto para el resultado
    let ObjNew = {}

    for (frequen in frequencyMap) {
        for (como of commonWords) {
            let a = frequen.toLowerCase()
            let b = como.toLowerCase()

            if (a === b) {
                console.log(frequen, 'cosas a borrar')
                delete frequencyMap[frequen]
            }
        }
    }
    ObjNew = frequencyMap
    console.log(ObjNew, 'muestra 3j')
    console.log('-------------------')

    return ObjNew
    // Pista 4: Iterar sobre las entradas del mapa de frecuencias

    // Pista 5: Verificar si cada palabra está en commonWords (case-insensitive)
    // Pista 6: Solo agregar palabras que NO estén en commonWords
    // Pista 7: Retornar el nuevo objeto filtrado

    // throw new Error('Función filterCommonWords no implementada');
}

filterCommonWords(words, commonWords)



/**
 * Genera un reporte completo de análisis de palabras
 * @param {string} text - Texto a analizar
 * @param {Object} options - Opciones del reporte
 * @returns {Object} Reporte completo con estadísticas
 */




const letras = 'JavaScript is a programming language. JavaScript is used for web development. Programming with JavaScript is fun'
const option = {
    limit: 5,
    filterCommon: true,
    commonWords: ['is', 'a', 'for', 'with', 'the', 'and', 'or', 'but'],
}

function generateWordReport(text, options = {}) {
    // TODO: Implementar generación de reporte completo
    let countW = {}

    // Pista 1: Extraer opciones con valores por defecto (limit, filterCommon, commonWords)
    // Pista 2: Contar frecuencia de todas las palabras usando countWordFrequency()
    countW = countWordFrequency(text)
    const uniqueWords = Object.keys(countW).length
    // console.log(countW, 'esto es lo que v=busco')
    let filteredWords = 0

    if (options.filterCommon === true && options.commonWords.length > 0) {

        for (e in countW) {
            // console.log(e)
            for (let i = 0; i < options.commonWords.length; i++) {

                if (e === options.commonWords[i]) {
                    delete countW[e]
                    filteredWords++
                }
            }
        }
    }



    // console.log(countW, 'AAA como termino')
    // Pista 3: Contar total de palabras y palabras únicas

    text = text.replaceAll('.', '')
    text = text.replaceAll(',', '')
    text = text.replaceAll('!', '')
    text = text.replaceAll('?', '')
    text = text.replaceAll(/'/g, '')

    let totalWords = text.split(' ')
    totalWords = totalWords.filter(a => a.length >= 2)
    totalWords = totalWords.length
    if (totalWords.length === 0) {
        totalWords = 0
    }
    console.log(totalWords, 'total words')

    // console.log(uniqueWords)
    let topWords = getTopWords(countW, options.limit)




    // console.log(topWords, 'antes que todo')
    if (topWords.length === 0) {
        topWords = []
    }

    // if (options.filterCommon === true && options.commonWords.length > 0) {
    //     filteredWords = filterCommonWords(countW, options.commonWords)
    //     console.log(filterCommonWords(countW, options.commonWords), 'primera busqueda')


    //     filteredWords = Object.keys(filteredWords).length
    //     console.log(filteredWords, 'se uso el filter')

    // }


    let averageFrequency
    if (totalWords === 0 && uniqueWords === 0) {
        averageFrequency = 0
    } else {
        averageFrequency = totalWords / uniqueWords
    }


    if (totalWords > 0 && uniqueWords > 0) {
        averageFrequency = averageFrequency.toFixed(2)
        // console.log(averageFrequency, 'frecuencia')
    }


    // if (Object.keys(averageFrequency).length === 0) {
    //     averageFrequency = 0
    // }

    // Pista 4: Aplicar filtro de palabras comunes si filterCommon es true
    // Pista 5: Obtener palabras más frecuentes usando getTopWords()
    // Pista 6: Calcular estadísticas adicionales (palabras filtradas, frecuencia promedio)
    // Pista 7: Retornar objeto con todas las estadísticas
    const objF = {
        totalWords: totalWords,
        uniqueWords: uniqueWords,
        topWords: topWords,
        filteredWords: filteredWords,
        averageFrequency: averageFrequency
    }
    console.log('    ')
    console.log('    ')
    console.log(objF)

    return objF
    // throw new Error('Función generateWordReport no implementada');
}

generateWordReport(letras, option)

module.exports = {
    countWordFrequency,
    getTopWords,
    filterCommonWords,
    generateWordReport
};

