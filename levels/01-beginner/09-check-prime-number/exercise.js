/**
 * Verifica si un número es primo
 * 
 * @param {number} num - Número a verificar
 * @returns {boolean} - true si es primo, false en caso contrario
 * 
 * Ejemplos:
 * isPrime(17) => true
 * isPrime(15) => false
 * isPrime(2) => true
 * isPrime(1) => false
 */

let num = 40
function isPrime(num) {
    if (num <= 1) {
        return false;
    } else if (num === 2) {
        return true
    } else if (num % 2 != 0) {
        let count = 0
        for (let i = 1; i <= num; i++) {
            // console.log(i)
            if (num % i === 0) {
                count++
            }
            // console.log(count)
            if (count >= 3) {
                return false
            }
        }
        if (count === 2) {
            return true
        }else { 
            return false
        }
    }
    
    
    return false
}

function result(){
for(let i = 0 ; i<= num; i++){
    let result=  isPrime(i)
     console.log(`${i} es primo ? ${result}`)
 }
}
result()
isPrime(num)
module.exports = isPrime;
