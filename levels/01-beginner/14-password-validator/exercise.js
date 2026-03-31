/**
 * Validador de Contraseñas
 * 
 * Descripción: Valida si una contraseña cumple con los requisitos de seguridad básicos.
 * Dificultad: BEGINNER
 * 
 * @param {string} password - Contraseña a validar
 * @returns {Object} Objeto con información detallada sobre la validez
 * 
 * Ejemplo:
 * validatePassword("Password123!") // {isValid: true, length: true, hasUppercase: true, ...}
 */

    let password = 'Coco23*3'

function validatePassword(password) {
    let passObj = {
        isValid: false,
        length: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumbers: false,
        hasSpecialChars: false,
    }


    let reGex = /[A-Z]/g
    let reGexMin = /[a-z]/g
    let reGexNum = /[0-9]/g
    let reGexSpecial = /[^\w\s]/g


    if(password.length >= 8){
        passObj.length = true
    }

    if(reGex.test(password)){
        // console.log('si funciona loco')
        passObj.hasUppercase = true
    }


    if(reGexMin.test(password)){
        // console.log('si funciona loco')
        passObj.hasLowercase = true
    }

    if(reGexNum.test(password)){
        // console.log('si funciona loco')
        passObj.hasNumbers = true
    }

    if(reGexSpecial.test(password)){
        // console.log('si funciona loco')
        passObj.hasSpecialChars = true
    }
    
    let countValidation = 0
    for(validation in passObj){
        console.log(validation)
        if(passObj[validation] === true){
            countValidation++
        }
        // console.log(countValidation)

        if(countValidation === 5){
            passObj['score'] = countValidation
            passObj['isValid'] = true
        }else{
            passObj['score'] = countValidation
            passObj['isValid'] = false

        }
    }





    
    console.log(passObj)

    return passObj
    // TODO: Implementar la solución aquí
    
    // Pista 1: Crea un objeto para almacenar los resultados de cada validación
    
    // Pista 2: Verifica la longitud mínima (>= 8 caracteres)
    
    // Pista 3: Verifica si tiene al menos una letra mayúscula (A-Z)
    
    // Pista 4: Verifica si tiene al menos una letra minúscula (a-z)
    
    // Pista 5: Verifica si tiene al menos un número (0-9)
    
    // Pista 6: Verifica si tiene al menos un carácter especial (!@#$%^&*)
    
    // Pista 7: Calcula el score sumando los criterios cumplidos (máximo 5)
    
    // Pista 8: Determina si es válida (todos los criterios cumplidos)
    
    // throw new Error('Función no implementada');
}

validatePassword(password)

module.exports = validatePassword;
