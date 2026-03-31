/**
 * Encuentra el segundo número más grande en un array
 * 
 * @param {number[]} nums - Array de números enteros
 * @returns {number|null} - El segundo número más grande o null si no existe
 * 
 * Ejemplos:
 * findSecondLargest([3, 7, 2, 9, 1]) => 7
 * findSecondLargest([5, 5, 4, 2]) => 4
 * findSecondLargest([9, 9, 9]) => null
 * findSecondLargest([42]) => null
 */

let numbers = [-3, -7, -2, -9, -1]

function sameNum(arr) {
    let count = 0
    let firstValue = arr[0]
    for (num of arr) {
        if (num === firstValue) {
            count++
        }
    }
    // console.log('valor de count ' + count)
    if (count === arr.length) {
        return null
    } 
    return true
}
// console.log(sameNum(numbers))



function findSecondLargest(nums) {
    if(sameNum(nums)===null){
        return null
    }else if (nums.length=== 1){
        return null
        
    }

    let bigNum = nums[0]
    let secondNum = nums[0]

    for (let i=1; i<nums.length; i++) {
        if (bigNum < nums[i]) {
            bigNum = nums[i]
        }
    }
    for (let i=1; i<nums.length; i++) {
        if (nums[i] != bigNum) {
            if (secondNum < nums[i] || secondNum === bigNum) {
                secondNum = nums[i]
            }
        }
    }


    return secondNum
}



// TODO: Implementa la función aquí

// Pista: Mantén dos variables para el máximo y segundo máximo
// Inicializa con 1valores muy pequeños para manejar números negativos
// Itera sobre el array y actualiza las variables según correspo
console.log(findSecondLargest(numbers))
findSecondLargest(numbers)
module.exports = findSecondLargest;
