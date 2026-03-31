/**
 * Conversor de Sistemas Numéricos
 * 
 * Descripción: Implementa funciones para convertir números entre diferentes bases numéricas
 * (decimal, binario, hexadecimal, octal). Los sistemas numéricos son fundamentales
 * en programación y matemáticas.
 * Dificultad: BEGINNER
 * 
 * Funciones requeridas:
 * - decimalToBinary(decimal): Convierte decimal a binario
 * - binaryToDecimal(binary): Convierte binario a decimal
 * - decimalToHex(decimal): Convierte decimal a hexadecimal
 * - hexToDecimal(hex): Convierte hexadecimal a decimal
 * - validateNumberInBase(number, base): Valida número en una base específica
 */

/**
 * Convierte un número decimal a binario
 * @param {number} decimal - Número decimal a convertir
 * @returns {string|null} Número en binario o null si es inválido
 * 
 * 
 * 
 * 
 * Ejemplos:
 * decimalToBinary(5) → "101"
 * decimalToBinary(10) → "1010"
 * decimalToBinary(0) → "0"
 * decimalToBinary(255) → "11111111"
 */


const decimal = 4

function decimalToBinary(decimal) {
    // TODO: Implementar conversión decimal a binario
    // Pista 1: Validar que decimal sea un número entero no negativo
    if (decimal < 0 || Number.isFinite(decimal) === false || decimal % 1 !== 0) {
        return null
    } else if (decimal === 0) {
        console.log('0')
        return '0'
    }
    // Pista 2: Caso especial: 0 debe retornar "0"
    // Pista 3: Usar el algoritmo de división repetida por 2

    let residuo = []


    do {
        residuo.push(decimal % 2)
        decimal = Math.floor(decimal / 2)
        console.log(residuo, decimal)
    } while (decimal >= 1)

    residuo.reverse()
    let resFinal = residuo.join('')
    console.log(resFinal)
    console.log('//////////////')
    console.log('')

    return resFinal
    // Pista 4: Tomar los restos y construir el número binario
    // Pista 5: El resultado se construye de derecha a izquierda
    // Pista 6: Retornar null si el número es inválido

    // throw new Error('Función decimalToBinary no implementada');
}

decimalToBinary(decimal)



/**
 * Convierte un número binario a decimal
 * @param {string} binary - Número binario a convertir
 * @returns {number|null} Número decimal o null si es inválido
 * 
 * Ejemplos:
 * binaryToDecimal("101") → 5
 * binaryToDecimal("1010") → 10
 * binaryToDecimal("0") → 0
 * binaryToDecimal("11111111") → 255
 */

const binary = ''

function binaryToDecimal(binary) {
    // TODO: Implementar conversión binario a decimal
    // Pista 1: Validar que binary sea un string válido
    if (typeof binary !== 'string' || binary === '') {
        console.log('lo ingresado no es un string ')
        return null
    }

    for (let i = 0; i < binary.length; i++) {
        if (binary[i] !== '0' && binary[i] !== '1') {
            console.log('el string ingresado tiene datas incorrectos')
            return null
        }

    }
    binary = binary.split('').reverse().join('')
    console.log(binary)

    let resulArry = []
    for (let i = 0; i < binary.length; i++) {
        resulArry.push((2 ** i) * binary[i])


    }

    console.log(resulArry)

    let final = resulArry.reduce((a, b) => a + b)
    console.log(final)
    console.log('////////////////////')
    return final
    // Pista 2: Validar que solo contenga 0s y 1s
    // Pista 3: Usar el método de posiciones: cada dígito vale 2^n
    // Pista 4: Empezar desde la derecha (posición 0)
    // Pista 5: Sumar 2^posición * dígito para cada posición
    // Pista 6: Retornar null si el número es inválido

    // throw new Error('Función binaryToDecimal no implementada');
}

binaryToDecimal(binary)

/**
 * Convierte un número decimal a hexadecimal
 * @param {number} decimal - Número decimal a convertir
 * @returns {string|null} Número en hexadecimal o null si es inválido
 * 
 * Ejemplos:
 * decimalToHex(10) → "A"
 * decimalToHex(15) → "F"
 * decimalToHex(255) → "FF"
 * decimalToHex(0) → "0"
 */

let dec = 155
function decimalToHex(decimal) {
    // TODO: Implementar conversión decimal a hexadecimal
    // Pista 1: Validar que decimal sea un número entero no negativo
    if (decimal < 0 || decimal % 1 !== 0 || typeof decimal === 'string' || decimal === null || decimal === undefined) {
        console.log('ingreso parametros erroneos')
        return null
    } else if (decimal === 0) {
        return '0'
    }


    // Pista 2: Caso especial: 0 debe retornar "0"
    // Pista 3: Usar el algoritmo de división repetida por 16
    let reciduo = []

    console.log(decimal % 16, '%')
    console.log(decimal / 16, '/')
    console.log(reciduo)
    console.log(' ')

    for (let i = 0; decimal >= 1; i++) {
        let valid = Math.floor(decimal % 16)
        switch (valid) {
            case 10:
                reciduo.push('A')
                break;

            case 11:
                reciduo.push('B')
                break;

            case 12:
                reciduo.push('C')
                break;


            case 13:
                reciduo.push('D')
                break;

            case 14:
                reciduo.push('E')
                break;

            case 15:
                reciduo.push('F')
                break;


            default:
                reciduo.push(valid.toString())

                break;
        }
        // if (decimal % 16 < 9) {
        //     reciduo.push(decimal % 16)

        // }
        decimal = decimal / 16

        console.log(decimal % 16, '%')
        console.log(decimal / 16, '/')

    }
    console.log(toString('5'), 'string ')
    console.log(reciduo)
    let finalEnt = reciduo.reverse().join('')
    console.log(reciduo, finalEnt, 'reverse')

    return finalEnt
    // Pista 4: Mapear dígitos mayores a 9 a letras A-F
    // Pista 5: 10→A, 11→B, 12→C, 13→D, 14→E, 15→F
    // Pista 6: Retornar null si el número es inválido

    // throw new Error('Función decimalToHex no implementada');
}

decimalToHex(dec)




/**
 * Convierte un número hexadecimal a decimal
 * @param {string} hex - Número hexadecimal a convertir
 * @returns {number|null} Número decimal o null si es inválido
 * 
 * Ejemplos:
 * hexToDecimal("A") → 10
 * hexToDecimal("F") → 15
 * hexToDecimal("FF") → 255
 * hexToDecimal("0") → 0
 */
let hex = '9B'


function hexToDecimal(hex) {
    // Validar que hex sea un string válido
    if (typeof hex !== 'string' || hex.length === 0) {
        return null;
    }

    // Convertir a mayúsculas y validar formato
    const upperHex = hex.toUpperCase();
    if (!/^[0-9A-F]+$/.test(upperHex)) {
        return null;
    }

    // Mapeo de caracteres a valores
    const getHexValue = (char) => {
        if (char >= '0' && char <= '9') {
            return char.charCodeAt(0) - '0'.charCodeAt(0);
        } else {
            return char.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
        }
    };

    // Algoritmo de posiciones: cada dígito vale 16^n
    let result = 0;
    const len = upperHex.length;

    for (let i = 0; i < len; i++) {
        const char = upperHex[len - 1 - i]; // Leer de derecha a izquierda
        const value = getHexValue(char);
        result += value * Math.pow(16, i);
    }

    return result;
    // TODO: Implementar conversión hexadecimal a decimal
    // Pista 1: Validar que hex sea un string válido
    // if (typeof hex !== 'string') {
    //     console.log('hay errores en la funcion por que no es un string')
    //     return null
    // }
    // // Pista 2: Validar que solo contenga 0-9 y A-F (case insensitive)
    // if (/[G-Za-z]/g.test(hex)) {
    //     console.log('tiene datos incorrectos')
    //     return null
    // }

    // // Pista 3: Mapear letras a valores: A→10, B→11, C→12, D→13, E→14, F→15
    // let arryHex = hex.split('')
    // console.log(arryHex)
    // for (let i = 0; i < hex.length; i++) {
    //     console.log(arryHex[i])
    //     console.log(Number.isFinite(arryHex[i]))

    //     switch (arryHex[i]) {
    //         case 'A':
    //             arryHex[i] = 10
    //             break;

    //         case 'B':
    //             arryHex[i] = 11
    //             break;

    //         case 'C':
    //             arryHex[i] = 12
    //             break;

    //         case 'D':
    //             arryHex[i] = 13
    //             break;

    //         case 'E':
    //             arryHex[i] = 14
    //             break;

    //         case 'F':
    //             arryHex[i] = 15
    //             break;


    //         default:
    //             arryHex[i] = parseInt(arryHex[i])


    //             break;
    //     }
    // }
    // console.log(arryHex)

    // for (let i = 0; i < arryHex.length; i++) {
    //     arryHex[i] = Math.floor(16**i) * arryHex[i]

    // }
    // console.log(arryHex)
    // Pista 4: Usar el método de posiciones: cada dígito vale 16^n

    // Pista 5: Convertir cada dígito a su valor decimal
    // Pista 6: Sumar 16^posición * valor_dígito para cada posición
    // Pista 7: Retornar null si el número es inválido

    // throw new Error('Función hexToDecimal no implementada');
}

hexToDecimal(hex)


let number = undefined
let base = 2

/**
 * Valida si un número es válido en una base numérica específica
 * @param {string} number - Número a validar
 * @param {number} base - Base numérica (2, 8, 10, 16)
 * @returns {boolean} true si es válido, false en caso contrario
 * 
 * Ejemplos:
 * validateNumberInBase("101", 2) → true (binario válido)
 * validateNumberInBase("1012", 2) → false (tiene un 2)
 * validateNumberInBase("FF", 16) → true (hex válido)
 * validateNumberInBase("GH", 16) → false (G no es válido)
 */
function validateNumberInBase(number, base) {
    // TODO: Implementar validación de número en base


    // Pista 1: Validar que number sea string y base sea número válido
    let evitar = [null, undefined, 'string']
    
    if (evitar.includes(number) || evitar.includes(base) || Number.isFinite(number) ) {
        console.log('te volviste loco por que el number no es un string')
        return false
    }
    if(/[a-f]/g.test(number)){
        number = number.toUpperCase()
        console.log('se arreglo a mayuscula')
    }


    let noBase = [2, 8, 10, 16]
    if (!noBase.includes(base)) {
        console.log('la base no es correcta')
        return false
    }
    // Pista 2: Validar que base sea 2, 8, 10 o 16
    // Pista 3: Para base 2: solo 0-1

    switch (base) {
        case 2:
            if (!/^[01]+$/g.test(number)) {
                console.log('con base 2 no es binario el numero')
                return false
            } else {
                console.log('es correcto, el numero es un binario')
                return true
            }
            break;

        case 8:
            if (!/^[0-7]+$/g.test(number)) {
                console.log('con base 8 no es ,,,,, el numero')
                return false
            } else {
                console.log('es correcto, el numero es un ,,,,')
                return true
            }
            break;

        case 10:
            if (!/^[0-9]+$/g.test(number)) {
                console.log('con base 10 no es decimal el numero')
                return false
            } else {
                console.log('es correcto, el numero es un decimal')
                return true
            }
            break;

        case 16:
            if (!/^[0-9A-F]+$/g.test(number)) {
                console.log('con base 16 no es hex el numero')
                return false
            } else {
                console.log('es correcto, el numero es un hex')
                return true
            }
            break;
        default:
            break;
    }

    // Pista 4: Para base 8: solo 0-7
    // Pista 5: Para base 10: solo 0-9
    // Pista 6: Para base 16: 0-9 y A-F (case insensitive)
    // Pista 7: Retornar false si es inválido

    // throw new Error('Función validateNumberInBase no implementada');
}

validateNumberInBase(number, base)




module.exports = {
    decimalToBinary,
    binaryToDecimal,
    decimalToHex,
    hexToDecimal,
    validateNumberInBase
};



