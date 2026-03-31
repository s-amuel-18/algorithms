/**
 * Two Sum
 * 
 * Descripción: Dado un array de enteros nums y un entero target, devuelve los índices de los dos números que suman target.
 * Dificultad: BEGINNER
 * 
 * @param {number[]} nums - Array de números enteros
 * @param {number} target - Número objetivo
 * @returns {number[]} Array con los índices de los dos números que suman target
 * 
 * Ejemplo:
 * twoSum([2, 7, 11, 15], 9) // [0, 1]
 */

function twoSum(nums, target) {
   for (let i = 0; i<nums.length; i++){
        let principal = nums[i]
        
        for (let J = 0; J < nums.length; J++) {
            let element = nums[J]

                if(i != J){

                let suma = (principal) + (element)
                if(suma === target){
                    let resultado = [i, J]
                    console.log(resultado)
                    return resultado
                    
                }
                }
            
        }

   }


    // throw new Error('Función no implementada');
}
let numeros = [3, 2, 4]
let resultado = 6
const result = twoSum(numeros, resultado)
console.log (result)


module.exports = twoSum;

