/**
 * Operaciones con Matrices
 * 
 * Descripción: Implementa funciones para realizar operaciones básicas con matrices.
 * Las matrices se representan como arrays bidimensionales (array de arrays).
 * Dificultad: BEGINNER
 * 
 * Funciones requeridas:
 * - createMatrix(rows, cols, defaultValue): Crea una matriz con valores por defecto
 * - getMatrixDimensions(matrix): Obtiene las dimensiones de una matriz
 * - getElement(matrix, row, col): Obtiene un elemento específico de la matriz
 * - setElement(matrix, row, col, value): Establece un elemento específico de la matriz
 * - addMatrices(matrix1, matrix2): Suma dos matrices
 * - multiplyMatrixByScalar(matrix, scalar): Multiplica una matriz por un escalar
 * - transposeMatrix(matrix): Transpone una matriz
 * - isSquareMatrix(matrix): Verifica si una matriz es cuadrada
 * - getMatrixTrace(matrix): Calcula la traza de una matriz cuadrada
 */

/**
 * Crea una matriz con las dimensiones especificadas y un valor por defecto
 * @param {number} rows - Número de filas
 * @param {number} cols - Número de columnas
 * @param {*} defaultValue - Valor por defecto para llenar la matriz
 * @returns {Array} Matriz creada
 */
let rows = 4
let cols = 4
let defaul = 4


function ArryOrNot(matrix) {
    if (Array.isArray(matrix) === false) {
        console.log('la funcion no recibio un objeto')
        return false
    }
    return true
}

function createMatrix(rows, cols, defaultValue = 0) {
    // TODO: Implementar creación de matriz
    // Pista 1: Validar que rows y cols sean números positivos
    if (cols < 0 && rows < 0 || cols < 0 || rows < 0) {
        console.log('error en los inputs')
        return {}
    }
    // Pista 2: Crear un array de filas usando Array(rows)
    let arrynew = Array(rows)
    // Pista 3: Para cada fila, crear un array de columnas usando Array(cols)
    for (let i = 0; i < arrynew.length; i++) {
        arrynew[i] = Array(cols)
    }

    // Pista 4: Llenar cada celda con el defaultValue
    for (let i = 0; i < arrynew.length; i++) {
        for (let j = 0; j < arrynew[i].length; j++) {
            arrynew[i][j] = defaultValue
        }
    }

    console.log(arrynew)

    // Pista 5: Retornar la matriz creada
    return arrynew
    // throw new Error('Función createMatrix no implementada');
}

let matrixOfFun = createMatrix(rows, cols, defaul)
console.log(matrixOfFun)

/**
 * Obtiene las dimensiones de una matriz
 * @param {Array} matrix - Matriz a analizar
 * @returns {Object} Objeto con propiedades rows y cols
 */
function getMatrixDimensions(matrix) {
    // TODO: Implementar obtención de dimensiones
    // Pista 1: Validar que matrix sea un array válido

    console.log(matrix)

    if (Array.isArray(matrix) === false) {
        console.log('la funcion no recibio un objeto')
        return {}
    }

    // Pista 2: Verificar que todas las filas tengan la misma longitud
    if (matrix.length === 0) {
        let ceroError = {
            rows: 0,
            cols: 0
        }
        console.log('esto se jodio por que el array esta vacio')
        console.log(ceroError)
        return ceroError
    }
    let protocol = matrix[0].length
    for (ro of matrix) {
        if (ro.length != protocol) {
            console.log('los datos de el array son invalidos')
            return {}
        }
    }
    // Pista 3: Retornar {rows: número_de_filas, cols: número_de_columnas}
    let data = {
        rows: matrix.length,
        cols: matrix[0].length
    }
    console.log(data)
    // Pista 4: Retornar {rows: 0, cols: 0} si la matriz está vacía
    return data
    // throw new Error('Función getMatrixDimensions no implementada');
}

getMatrixDimensions(matrixOfFun)




/**
 * Obtiene un elemento específico de la matriz
 * @param {Array} matrix - Matriz
 * @param {number} row - Índice de la fila (0-based)
 * @param {number} col - Índice de la columna (0-based)
 * @returns {*} Elemento en la posición especificada
 */
let searchRow = 2
let searchcol = 2


function getElement(matrix, row, col) {
    // TODO: Implementar obtención de elemento
    // Pista 1: Validar que matrix sea un array válido
    if (Array.isArray(matrix) === false) {
        console.log('la funcion no recibio un objeto')
        return {}
    }
    // Pista 2: Validar que row y col sean índices válidos
    if (matrix.length === 0) {
        console.log('la matris tiene 0 de longitud')
        return undefined

    }
    if (row > matrix[0].length || col > matrix.length || row < 0 || col < 0) {
        console.log('el valor a buscar no puede ser conseguido por que es mayor el indice es mayor que el de la matris')
        return undefined
    }


    console.log(matrix[row][col])
    return matrix[row][col]

    // Pista 3: Retornar el elemento en matrix[row][col]
    // Pista 4: Retornar undefined si los índices están fuera de rango

    // throw new Error('Función getElement no implementada');
}

getElement(matrixOfFun, searchRow, searchcol)




/**
 * Establece un elemento específico de la matriz
 * @param {Array} matrix - Matriz
 * @param {number} row - Índice de la fila (0-based)
 * @param {number} col - Índice de la columna (0-based)
 * @param {*} value - Valor a establecer
 * @returns {boolean} true si se estableció correctamente, false si no
 */

let valueNew = 3
function setElement(matrix, row, col, value) {
    // TODO: Implementar establecimiento de elemento
    // Pista 1: Validar que matrix sea un array válido
    if (Array.isArray(matrix) === false) {
        console.log('la funcion no recibio un objeto')
        return undefined
    }
    // Pista 2: Validar que row y col sean índices válidos
    if (row > matrix[0].length || col > matrix.length || row < 0 || col < 0) {
        console.log('el valor a buscar no puede ser conseguido por que es mayor el indice es mayor que el de la matris')
        return false
    }

    // Pista 3: Establecer matrix[row][col] = value
    matrix[row][col] = valueNew

    console.log(valueNew, 'si se integro')
    // console.log(matrixOfFun)
    // Pista 4: Retornar true si se estableció, false si los índices están fuera de rango

    return true
    throw new Error('Función setElement no implementada');
}

setElement(matrixOfFun, searchRow, searchcol, valueNew)




/**
 * Suma dos matrices del mismo tamaño
 * @param {Array} matrix1 - Primera matriz
 * @param {Array} matrix2 - Segunda matriz
 * @returns {Array|null} Matriz resultante o null si no se pueden sumar
 */


let mat1 = createMatrix(4, 4, 5)
let mat2 = createMatrix(4, 4, 4)

function addMatrices(matrix1, matrix2) {
    // TODO: Implementar suma de matrices
    // Pista 1: Validar que ambas matrices sean arrays válidos
    if (Array.isArray(matrix1 === false || matrix2 === false)) {
        console.log('las matrices no se pueden sumar ')
        return undefined
    }


    // Pista 2: Verificar que ambas matrices tengan las mismas dimensiones
    if (matrix1.length != matrix2.length || matrix1[0].length != matrix2[0].length) {
        console.log('las matrices no son iguales')
        return undefined
    }


    // Pista 3: Crear una nueva matriz con las mismas dimensiones
    let matNew = Array(matrix1.length)

    for (let i = 0; i < matNew.length; i++) {
        matNew[i] = Array(matrix1[0].length);

    }

    console.log(matNew, 'matris final')
    // Pista 4: Sumar elemento por elemento: result[i][j] = matrix1[i][j] + matrix2[i][j]
    for (let i = 0; i < matNew.length; i++) {
        for (let j = 0; j < matNew.length; j++) {
            matNew[i][j] = mat1[i][j] + mat2[i][j]

        }

    }

    console.log(matNew, 'matris resultado de suma')

    // throw new Error('Función addMatrices no implementada');
}

addMatrices(mat1, mat2)
/**
 * Multiplica una matriz por un escalar
 * @param {Array} matrix - Matriz a multiplicar
 * @param {number} scalar - Escalar por el cual multiplicar
 * @returns {Array|null} Matriz resultante o null si la matriz no es válida
 */

let mult = 3
function multiplyMatrixByScalar(matrix, scalar) {
    // TODO: Implementar multiplicación por escalar
    // Pista 1: Validar que matrix sea un array válido
    if (!ArryOrNot(matrix)) {
        console.log('la matrix no es valida')
        return null
    }
    // Pista 2: Validar que scalar sea un número
    if (!Number.isFinite(scalar)) {
        console.log('el parametro SCALAR no es un numero')
        return null
    }

    // Pista 3: Crear una nueva matriz con las mismas dimensiones
    let newArry = Array(matrix.length)
    for (let i = 0; i < newArry.length; i++) {
        newArry[i] = Array(matrix[0].length)

    }

    console.log(newArry)
    // Pista 4: Multiplicar cada elemento por el escalar: result[i][j] = matrix[i][j] * scalar

    for (let i = 0; i < newArry.length; i++) {
        for (let j = 0; j < newArry[0].length; j++) {
            newArry[i][j] = matrix[i][j] * scalar

        }

    }
    console.log(newArry)
    return newArry
    // Pista 5: Retornar la matriz resultante o null si la matriz no es válida

    // throw new Error('Función multiplyMatrixByScalar no implementada');
}


multiplyMatrixByScalar(matrixOfFun, mult)

/**
 * Transpone una matriz (intercambia filas por columnas)
 * @param {Array} matrix - Matriz a transponer
 * @returns {Array|null} Matriz transpuesta o null si la matriz no es válida
 */
function transposeMatrix(matrix) {
    // TODO: Implementar transposición de matriz
    // Pista 1: Validar que matrix sea un array válido
    if (!ArryOrNot(matrix)) {
        console.log('la matris no es valida ..')
        return null
    }
    // Pista 2: Obtener las dimensiones de la matriz original
    let row = matrix.length
    let col = matrix[0].length

    console.log(row, col)
    // Pista 3: Crear una nueva matriz con dimensiones invertidas (cols x rows)
    let arryInvert = Array(col)

    for (let i = 0; i < arryInvert.length; i++) {
        arryInvert[i] = Array(row)
    }

    console.log(arryInvert)

    // Pista 4: Copiar elementos: result[j][i] = matrix[i][j]

    for (let i = 0; i < arryInvert.length; i++) {
        for (let j = 0; j < arryInvert[0].length; j++) {
            arryInvert[i][j] = matrix[j][i]
        }
    }
    console.log(arryInvert)
    // Pista 5: Retornar la matriz transpuesta o null si la matriz no es válida
    return arryInvert
    // throw new Error('Función transposeMatrix no implementada');
}

let inverArry = transposeMatrix(matrixOfFun)

/**
 * Verifica si una matriz es cuadrada (mismo número de filas y columnas)
 * @param {Array} matrix - Matriz a verificar
 * @returns {boolean} true si es cuadrada, false en caso contrario
 */
function isSquareMatrix(matrix) {
    // TODO: Implementar verificación de matriz cuadrada
    // Pista 1: Validar que matrix sea un array válido
    if (!ArryOrNot(matrix)) {
        console.log('no es una matris')
        return null
    }
    // Pista 2: Obtener las dimensiones de la matriz
    let row = matrix.length
    let col = matrix[0].length
    // Pista 3: Verificar que rows === cols
    if (col === row) {
        console.log('Es cuadrada la matris')
        return true
    } else {
        console.log('No es cuadrada la matris')
        return false

    }
    // Pista 4: Retornar true si es cuadrada, false en caso contrario

    // throw new Error('Función isSquareMatrix no implementada');
}

isSquareMatrix(inverArry)


/**
 * Calcula la traza de una matriz cuadrada (suma de elementos en la diagonal principal)
 * @param {Array} matrix - Matriz cuadrada
 * @returns {number|null} Traza de la matriz o null si no es cuadrada
 */
function getMatrixTrace(matrix) {
    // TODO: Implementar cálculo de traza
    // Pista 1: Validar que matrix sea un array válido
    if (!ArryOrNot(matrix)) {
        console.log('No es una matris')
        return null
    }
    // Pista 2: Verificar que la matriz sea cuadrada usando isSquareMatrix
    if (!isSquareMatrix(matrix)) {
        console.log('no es una matris cuadrada')
        return null
    }
    // Pista 3: Sumar los elementos de la diagonal principal (matrix[i][i])
    let diagonal = 0
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            diagonal += matrix[i][i]


        }
    }
    console.log(diagonal)
    // Pista 4: Retornar la suma o null si la matriz no es cuadrada

    // throw new Error('Función getMatrixTrace no implementada');
}
getMatrixTrace(matrixOfFun)
module.exports = {
    createMatrix,
    getMatrixDimensions,
    getElement,
    setElement,
    addMatrices,
    multiplyMatrixByScalar,
    transposeMatrix,
    isSquareMatrix,
    getMatrixTrace
};
