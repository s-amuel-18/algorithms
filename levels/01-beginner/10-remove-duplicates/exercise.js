/**
 * Elimina elementos duplicados de un array manteniendo el orden
 * 
 * @param {number[]} nums - Array de números
 * @returns {number[]} - Nuevo array sin duplicados
 * 
 * Ejemplos:
 * removeDuplicates([1, 2, 2, 3, 4, 4, 5]) => [1, 2, 3, 4, 5]
 * removeDuplicates([5, 5, 5, 5]) => [5]
 * removeDuplicates([1, 2, 3]) => [1, 2, 3]
 */
let arry = [5, 5.0, 5.5, 5, 6]

function removeDuplicates(nums) {
    let newArry = []
    for (let i = 0; i < nums.length; i++) {
        const element= nums[i]
        if(!newArry.includes(nums[i] ))[
            newArry.push(element)
        ]
    }
return newArry



    // TODO: Implementa la función aquí

    // Pista 1: Crea un nuevo array vacío para almacenar elementos únicos
    // Pista 2: Itera sobre el array original
    // Pista 3: Usa includes() para verificar si el elemento ya existe
    // Pista 4: Solo agrega elementos que no estén ya en el resultado
    // Pista 5: Para optimización, considera usar un Set
    console.log('el valor del array es ' + newArry)

    return newArry;
}
    //dasdsd
    
// removeDuplicates(arry)
module.exports = removeDuplicates;
