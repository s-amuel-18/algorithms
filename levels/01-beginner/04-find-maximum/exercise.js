/**
 * Find Maximum
 *
 * Descripción: Encuentra el número máximo en un array de números enteros
 * Dificultad: BEGINNER
 *
 * @param {number[]} nums - Array de números enteros
 * @returns {number} El número máximo del array
 *
 * Ejemplo:
 * findMaximum([3, 7, 2, 9, 1]) // retorna 9
 */

function findMaximum(nums) {
  let mayor = nums[0]
  for (let i = 1; i < nums.length; i++) {
    console.log(nums[i] + '  este es el numero comparado con el actual ' + mayor
    )
    if (mayor < nums[i]) {
      mayor = nums[i]

    }

  }
  return mayor

  // TODO: Implementar la solución aquí

  // Pista: Puedes usar un bucle para iterar sobre el array y mantener
  // el valor máximo encontrado hasta el momento

  // throw new Error('Función no implementada');
}
numeros = [3, 7, 2, 9, 1]
findMaximum(numeros)


module.exports = findMaximum;
