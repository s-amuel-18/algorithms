/**
 * Calculadora de Interés Compuesto
 * 
 * Descripción: Calcula el interés compuesto, valor futuro y pagos de préstamos.
 * Dificultad: BEGINNER
 * 
 * @param {number} principal - Capital inicial (debe ser mayor que 0)
 * @param {number} rate - Tasa de interés anual como decimal (ej: 0.05 para 5%)
 * @param {number} time - Tiempo en años (debe ser mayor que 0)
 * @param {number} compoundFrequency - Frecuencia de capitalización por año (1=anual, 12=mensual, 365=daily)
 * @returns {number} Valor futuro con interés compuesto
 * 
 * Ejemplo:
 * calculateCompoundInterest(1000, 0.05, 5, 12) // Calcula interés compuesto mensual por 5 años
 */

function calculateCompoundInterest(principal, rate, time, compoundFrequency = 1) {
    // TODO: Implementar la solución aquí

    // Pista 1: Valida que principal, rate, time y compoundFrequency sean números positivos
    if (typeof principal !== 'number' || principal <= 0) throw new Error("Principal must be a positive number");
    if (typeof rate !== 'number' || rate < 0) throw new Error("Rate must be a non-negative number");
    if (typeof time !== 'number' || time <= 0) throw new Error("Time must be a positive number");
    if (typeof compoundFrequency !== 'number' || compoundFrequency <= 0) throw new Error("Compound frequency must be a positive number");

    // Pista 2: La fórmula del interés compuesto es:
    //   A = P * (1 + r/n)^(n*t)
    //   Donde:
    //   - A = Monto final
    //   - P = Principal (capital inicial)
    //   - r = Tasa de interés anual
    //   - n = Frecuencia de capitalización por año
    //   - t = Tiempo en años

    // Pista 3: Usa Math.pow() para calcular la potencia

    // Pista 4: Redondea el resultado a 2 decimales usando Math.round() o toFixed()
    return parseFloat((principal * Math.pow(1 + rate / compoundFrequency, compoundFrequency * time)).toFixed(2))

}

/**
 * Calcula el valor futuro de una inversión con depósitos periódicos.
 * 
 * @param {number} initialDeposit - Depósito inicial
 * @param {number} monthlyDeposit - Depósito mensual
 * @param {number} rate - Tasa de interés anual como decimal
 * @param {number} years - Número de años
 * @returns {number} Valor futuro total
 * 
 * Ejemplo:
 * calculateFutureValueWithDeposits(1000, 100, 0.05, 10) // Inversión inicial + depósitos mensuales
 */
function calculateFutureValueWithDeposits(initialDeposit, monthlyDeposit, rate, years) {
    // TODO: Implementar la solución aquí

    // Pista 1: Calcula el valor futuro del depósito inicial usando calculateCompoundInterest
    const valueFuture = calculateCompoundInterest(initialDeposit, rate, years, 12)
    // Pista 2: Calcula el valor futuro de los depósitos mensuales usando la fórmula de anualidad:
    //   FV = PMT * (((1 + r/n)^(n*t) - 1) / (r/n))
    //   Donde PMT es el pago mensual, r es la tasa anual, n es 12 (mensual), t es años
    const pv = monthlyDeposit * ((Math.pow((1 + rate / 12), (12 * years)) - 1) / (rate / 12))
    // Pista 3: Suma ambos valores para obtener el total

    return valueFuture + pv
}


console.log(calculateCompoundInterest(1000, 0.05, 5, 12))
console.log(calculateFutureValueWithDeposits(1000, 100, 0.05, 10))

module.exports = {
    calculateCompoundInterest,
    calculateFutureValueWithDeposits
};

