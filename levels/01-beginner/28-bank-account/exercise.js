/**
 * Sistema de Cuenta Bancaria (Bank Account System)
 *
 * Descripción: Implementa una clase básica `BankAccount` para practicar
 * constructores, métodos de instancia, validaciones básicas y manejo de estado.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS (Keep It Simple, Stupid): mantén el código simple
 * - Validaciones Fail Fast: valida antes de continuar
 * - Código expresivo: nombres claros y descriptivos
 */

/**
 * Representa una cuenta bancaria individual.
 * Traducción: Cuenta Bancaria
 * @class
 */
class BankAccount {
    /**
     * Constructor de la clase BankAccount
     * Traducción: Constructor de Cuenta Bancaria
     *
     * Crea una nueva cuenta bancaria con el nombre del titular y un saldo inicial.
     * Valida que el nombre no esté vacío y que el saldo inicial no sea negativo.
     *
     * @param {string} accountHolder - Nombre del titular de la cuenta (no puede estar vacío)
     * @param {number} [initialBalance=0] - Saldo inicial de la cuenta (default: 0, no puede ser negativo)
     *
     * TODO:
     * - Valida que accountHolder sea un string no vacío (después de trim)
     * - Lanza error "Account holder name is required" si el nombre es inválido
     * - Valida que initialBalance sea un número y no sea negativo
     * - Lanza error "Initial balance cannot be negative" si el saldo es negativo
     * - Asigna los valores validados a this.accountHolder y this.balance
     */
    constructor(accountHolder, initialBalance = 0) {
        if (accountHolder.trim() === '') throw new Error('Account holder name is required')
        if (Number.isFinite(initialBalance) && initialBalance < 0) throw new Error('Initial balance cannot be negative')
        this.accountHolder = accountHolder,
            this.initialBalance = initialBalance,
            this.balance = initialBalance
    }

    /**
     * Deposita dinero en la cuenta.
     * Traducción: Depositar
     *
     * Este método incrementa el saldo de la cuenta con el monto especificado.
     * Debe validar que el monto sea un número positivo antes de realizar el depósito.
     * El comportamiento esperado es que el saldo aumente en la cantidad depositada.
     *
     * @param {number} amount - Cantidad de dinero a depositar (debe ser positivo)
     * @returns {number} El nuevo saldo después del depósito
     *
     * TODO:
     * - Valida que amount sea un número positivo
     * - Lanza error "Deposit amount must be positive" si el monto es inválido
     * - Incrementa this.balance con el monto depositado
     * - Retorna el nuevo saldo (this.balance)
     */
    deposit(amount) {
        if (!(amount > 0)) throw new Error('Deposit amount must be positive')

        this.balance += amount
        return this.balance
    }

    /**
     * Retira dinero de la cuenta.
     * Traducción: Retirar
     *
     * Este método decrementa el saldo de la cuenta con el monto especificado.
     * Debe validar que el monto sea positivo y que haya saldo suficiente antes de realizar el retiro.
     * El comportamiento esperado es que el saldo disminuya solo si hay fondos suficientes.
     *
     * @param {number} amount - Cantidad de dinero a retirar (debe ser positivo y no exceder el saldo)
     * @returns {number} El nuevo saldo después del retiro
     *
     * TODO:
     * - Valida que amount sea un número positivo
     * - Lanza error "Withdrawal amount must be positive" si el monto es inválido
     * - Verifica que this.balance >= amount (saldo suficiente)
     * - Lanza error "Insufficient funds" si no hay saldo suficiente
     * - Decrementa this.balance con el monto retirado
     * - Retorna el nuevo saldo (this.balance)
     */
    withdraw(amount) {
        if (amount <= 0) throw new Error('Withdrawal amount must be positive')
        if (this.balance < amount) throw new Error('Insufficient funds')

        this.balance -= amount
        return this.balance


    }

    /**
     * Obtiene el saldo actual de la cuenta.
     * Traducción: Obtener Saldo
     *
     * Este método retorna el saldo actual sin modificarlo.
     * El comportamiento esperado es simplemente devolver el valor almacenado en this.balance.
     *
     * @returns {number} El saldo actual de la cuenta
     *
     * TODO:
     * - Retorna el valor de this.balance
     */
    getBalance() {
        return this.balance
    }

    /**
     * Obtiene la información completa de la cuenta en formato legible.
     * Traducción: Obtener Información de la Cuenta
     *
     * Este método genera un string con el nombre del titular y el saldo formateado.
     * El saldo debe mostrarse con exactamente 2 decimales usando formato de moneda.
     * El comportamiento esperado es retornar un string como: "Account holder: Juan, Balance: $1000.00"
     *
     * @returns {string} String con el formato "Account holder: [nombre], Balance: $[saldo]"
     *
     * TODO:
     * - Usa template literals para construir el string
     * - Formatea this.balance con 2 decimales usando toFixed(2)
     * - Retorna el string en el formato especificado
     */
    getAccountInfo() {
        const balanceFixed = this.balance.toFixed(2)
        const stringReturn = `Account holder: ${this.accountHolder}, Balance: $${balanceFixed}`

        return stringReturn

    }
}

const accountArmando = new BankAccount('Luisa Fernández', 1250)
console.log(accountArmando.getAccountInfo())

module.exports = {
    BankAccount
};

