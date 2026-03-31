/**
 * Sistema de Gestión de Parqueadero (Parking Management System)
 *
 * Descripción: Implementa dos clases básicas (`ParkingSpot` y `ParkingLot`) para practicar
 * constructores, métodos de instancia, validaciones complejas, cálculos temporales,
 * gestión de compatibilidad de vehículos y reportes financieros.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 * - Responsabilidad Única: cada clase tiene un propósito claro
 * - Uso de métodos de arrays: find, filter, reduce
 */

/**
 * Representa un espacio de estacionamiento individual.
 * Traducción: Espacio de Estacionamiento
 * @class
 */
class ParkingSpot {
    /**
     * Constructor de la clase ParkingSpot
     * Traducción: Constructor de Espacio de Estacionamiento
     *
     * Crea un nuevo espacio de estacionamiento con número y tipo.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {string} spotNumber - Número identificador del espacio (no puede estar vacío)
     * @param {string} type - Tipo de espacio ('compact', 'standard', 'large')
     *
     * TODO:
     * - Valida que spotNumber sea un string no vacío (después de trim)
     * - Lanza error "Spot number is required" si el número es inválido
     * - Valida que type sea uno de: 'compact', 'standard', 'large'
     * - Lanza error "Spot type must be 'compact', 'standard', or 'large'" si el tipo es inválido
     * - Inicializa this.isOccupied = false
     * - Inicializa this.vehiclePlate = null
     * - Inicializa this.entryTime = null
     * - Asigna los valores validados a this.spotNumber y this.type
     */
    constructor(spotNumber, type) {
        if (spotNumber.trim() === '' || typeof spotNumber !== 'string') throw new Error("Spot number is required");
        if (!(['compact', 'standard', 'large'].includes(type))) throw new Error(`Spot type must be 'compact', 'standard', or 'large'`);

        this.isOccupied = false,
            this.vehiclePlate = null,
            this.entryTime = null,
            this.spotNumber = spotNumber,
            this.type = type


    }

    /**
     * Estaciona un vehículo en el espacio.
     * Traducción: Estacionar Vehículo
     *
     * Este método registra un vehículo en el espacio, validando que esté disponible
     * y que los datos sean válidos.
     *
     * @param {string} plate - Placa del vehículo (no puede estar vacío)
     * @param {Date} entryTime - Hora de entrada (debe ser instancia de Date)
     * @returns {boolean} true si se estacionó correctamente
     *
     * TODO:
     * - Valida que plate sea un string no vacío (después de trim)
     * - Lanza error "Vehicle plate is required" si la placa es inválida
     * - Valida que entryTime sea una instancia de Date
     * - Lanza error "Entry time must be a Date object" si la fecha es inválida
     * - Valida que el espacio no esté ocupado (this.isOccupied === false)
     * - Lanza error "Spot is already occupied" si está ocupado
     * - Asigna plate a this.vehiclePlate
     * - Asigna entryTime a this.entryTime
     * - Marca this.isOccupied = true
     * - Retorna true
     */
    parkVehicle(plate, entryTime) {
        if (plate.trim() === '' || typeof plate !== 'string') throw new Error("Vehicle plate is required");
        if (!(entryTime instanceof Date)) throw new Error("Entry time must be a Date object");
        if (this.isOccupied === true) throw new Error("Spot is already occupied");

        this.vehiclePlate = plate
        this.entryTime = entryTime
        this.isOccupied = true

        return true



    }

    /**
     * Libera el espacio y calcula tarifa.
     * Traducción: Salir del Espacio
     *
     * Este método calcula la duración y tarifa, luego libera el espacio.
     *
     * @param {Date} exitTime - Hora de salida (debe ser instancia de Date)
     * @param {number} ratePerHour - Tarifa por hora (debe ser mayor que 0)
     * @returns {Object} Objeto con { duration: number, fee: number }
     *
     * TODO:
     * - Valida que exitTime sea una instancia de Date
     * - Lanza error "Exit time must be a Date object" si la fecha es inválida
     * - Valida que ratePerHour sea un número mayor que 0
     * - Lanza error "Rate per hour must be greater than 0" si la tarifa es inválida
     * 
     * - Valida que el espacio esté ocupado (this.isOccupied === true)
     * - Lanza error "Spot is not occupied" si no está ocupado
     * 
     * - Valida que exitTime sea posterior a this.entryTime
     * - Lanza error "Exit time must be after entry time" si la fecha es inválida
     * 
     * - Calcula duración usando getParkingDuration(exitTime)
     * - Calcula tarifa usando calculateFee(exitTime, ratePerHour)
     * - Libera el espacio: this.isOccupied = false, this.vehiclePlate = null, this.entryTime = null
     * - Retorna objeto { duration, fee }
     */
    exitVehicle(exitTime, ratePerHour) {
        if (!(exitTime instanceof Date)) throw new Error("Exit time must be a Date object");
        if (ratePerHour <= 0) throw new Error("Rate per hour must be greater than 0");
        if (this.isOccupied === false) throw new Error("Spot is not occupied");
        if (exitTime.getTime() < this.entryTime.getTime()) throw new Error("Exit time must be after entry time");

        const duration = this.getParkingDuration(exitTime)
        const fee = this.calculateFee(exitTime, ratePerHour)

        this.isOccupied = false
        this.vehiclePlate = null
        this.entryTime = null

        return { duration, fee }


    }

    /**
     * Calcula la duración de estacionamiento en horas.
     * Traducción: Obtener Duración de Estacionamiento
     *
     * Este método calcula cuántas horas ha estado estacionado el vehículo.
     *
     * @param {Date} exitTime - Hora de salida (debe ser instancia de Date)
     * @returns {number} Duración en horas con 2 decimales
     *
     * TODO:
     * - Valida que exitTime sea una instancia de Date
     * - Lanza error "Exit time must be a Date object" si la fecha es inválida
     * - Valida que el espacio esté ocupado (this.isOccupied === true)
     * - Lanza error "Spot is not occupied" si no está ocupado
     * - Calcula diferencia en milisegundos: exitTime - this.entryTime
     * - Convierte a horas: diferencia / (1000 * 60 * 60)
     * - Usa toFixed(2) y parseFloat() para formatear a 2 decimales
     * - Retorna la duración calculada
     */
    getParkingDuration(exitTime) {
        if (!(exitTime instanceof Date)) throw new Error("Exit time must be a Date object");
        if (this.isOccupied === false) throw new Error("Spot is not occupied");
        const time = exitTime.getTime() - this.entryTime.getTime()
        const HoursTime = parseFloat((time / (1000 * 60 * 60)).toFixed(2))

        return HoursTime

    }

    /**
     * Calcula la tarifa según duración y tarifa por hora.
     * Traducción: Calcular Tarifa
     *
     * Este método calcula el costo total del estacionamiento.
     *
     * @param {Date} exitTime - Hora de salida (debe ser instancia de Date)
     * @param {number} ratePerHour - Tarifa por hora (debe ser mayor que 0)
     * @returns {number} Tarifa total con 2 decimales
     *
     * TODO:
     * - Valida que exitTime sea una instancia de Date
     * - Lanza error "Exit time must be a Date object" si la fecha es inválida
     * - Valida que ratePerHour sea un número mayor que 0
     * - Lanza error "Rate per hour must be greater than 0" si la tarifa es inválida
     * - Valida que el espacio esté ocupado (this.isOccupied === true)
     * - Lanza error "Spot is not occupied" si no está ocupado
     * - Calcula duración usando getParkingDuration(exitTime)
     * - Calcula tarifa: duración × ratePerHour
     * - Usa toFixed(2) y parseFloat() para formatear a 2 decimales
     * - Retorna la tarifa calculada
     */
    calculateFee(exitTime, ratePerHour) {
        if (!(exitTime instanceof Date)) throw new Error("Exit time must be a Date object");
        if (ratePerHour <= 0) throw new Error("Rate per hour must be greater than 0");
        if (this.isOccupied === false) throw new Error("Spot is not occupied");

        const time = this.getParkingDuration(exitTime)
        const fee = parseFloat((time * ratePerHour).toFixed(2))

        return fee
    }

    /**
     * Verifica si un tipo de vehículo es compatible con este espacio.
     * Traducción: Verificar Compatibilidad
     *
     * Este método determina si un vehículo puede usar este espacio según su tipo.
     *
     * @param {string} vehicleType - Tipo de vehículo ('compact', 'standard', 'large')
     * @returns {boolean} true si es compatible, false en caso contrario
     *
     * TODO:
     * - Valida que vehicleType sea un string
     * - Lanza error "Vehicle type must be a string" si el tipo es inválido
     * - Si this.type === 'compact': solo acepta vehicleType === 'compact'
     * - Si this.type === 'standard': acepta vehicleType === 'compact' o 'standard'
     * - Si this.type === 'large': acepta vehicleType === 'compact', 'standard' o 'large'
     * - Retorna true si es compatible, false en caso contrario
     */
    isCompatible(vehicleType) {
        if (typeof vehicleType !== 'string') throw new Error("Vehicle type must be a string");


        if (this.type === 'compact') {
            if (['compact'].includes(vehicleType)) return true
            else return false

        } else if (this.type === 'standard') {
            if (['compact', 'standard'].includes(vehicleType)) return true
            else return false

        } else if (this.type === 'large') {
            if (['compact', 'standard', 'large'].includes(vehicleType)) return true
            else return false

        }

    }
}

/**
 * Gestiona el parqueadero y sus operaciones.
 * Traducción: Parqueadero
 * @class
 */
class ParkingLot {
    /**
     * Constructor de la clase ParkingLot
     * Traducción: Constructor de Parqueadero
     *
     * Crea un nuevo parqueadero con nombre y tarifas por defecto.
     *
     * @param {string} name - Nombre del parqueadero (no puede estar vacío)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Parking lot name is required" si el nombre es inválido
     * - Inicializa this.spots como un array vacío []
     * - Inicializa this.hourlyRates = { compact: 2, standard: 3, large: 5 }
     * - Inicializa this.revenue = { compact: 0, standard: 0, large: 0 } para rastrear ingresos
     * - Asigna el nombre validado a this.name
     */
    constructor(name) {
        if (name.trim() === '' || typeof name !== 'string') throw new Error("Parking lot name is required");

        this.spots = []
        this.hourlyRates = { compact: 2, standard: 3, large: 5 }
        this.revenue = { compact: 0, standard: 0, large: 0 }
        this.name = name

    }

    /**
     * Agrega un nuevo espacio al parqueadero.
     * Traducción: Agregar Espacio
     *
     * Este método crea y agrega un nuevo espacio, validando que no exista duplicado.
     *
     * @param {string} spotNumber - Número del espacio
     * @param {string} type - Tipo de espacio ('compact', 'standard', 'large')
     * @returns {ParkingSpot} El espacio creado
     *
     * TODO:
     * - Valida que spotNumber sea un string no vacío (después de trim)
     * - Lanza error "Spot number is required" si el número es inválido
     * - Valida que type sea uno de: 'compact', 'standard', 'large'
     * - Lanza error "Spot type must be 'compact', 'standard', or 'large'" si el tipo es inválido
     * - Verifica que no exista espacio con mismo spotNumber usando find()
     * - Si existe, lanza error "Spot number already exists"
     * - Crea nueva instancia de ParkingSpot con spotNumber y type
     * - Agrega el espacio al array this.spots usando push()
     * - Retorna el espacio creado
     */
    addSpot(spotNumber, type) {
        if (spotNumber.trim() === '' || typeof spotNumber !== 'string') throw new Error("Spot number is required");
        if (!(['compact', 'standard', 'large'].includes(type))) throw new Error(`Spot type must be 'compact', 'standard', or 'large'`);
        if (this.spots.find(spot => spot.spotNumber === spotNumber) !== undefined) throw new Error("Spot number already exists");

        const newSpot = new ParkingSpot(spotNumber, type)
        this.spots.push(newSpot)

        return newSpot

    }

    /**
     * Busca un espacio disponible compatible con el tipo de vehículo.
     * Traducción: Buscar Espacio Disponible
     *
     * Este método encuentra el primer espacio libre compatible con el vehículo.
     *
     * @param {string} vehicleType - Tipo de vehículo ('compact', 'standard', 'large')
     * @returns {ParkingSpot|null} El espacio encontrado o null si no hay disponible
     *
     * TODO:
     * - Valida que vehicleType sea un string
     * - Lanza error "Vehicle type must be a string" si el tipo es inválido
     * - Usa this.spots.find() para buscar espacio donde:
     *   - isOccupied === false
     *   - isCompatible(vehicleType) === true
     * - Retorna el espacio encontrado o null si no hay disponible
     */
    findAvailableSpot(vehicleType) {
        if (vehicleType.trim() === '' || typeof vehicleType !== 'string') throw new Error("Vehicle type must be a string");
        const find = this.spots.find(spot => spot.isOccupied === false && spot.isCompatible(vehicleType) === true)
        if (find === undefined) return null
        else return find
    }

    /**
     * Estaciona un vehículo en el parqueadero.
     * Traducción: Estacionar Vehículo
     *
     * Este método encuentra un espacio disponible y estaciona el vehículo.
     *
     * @param {string} vehicleType - Tipo de vehículo ('compact', 'standard', 'large')
     * @param {string} plate - Placa del vehículo
     * @param {Date} entryTime - Hora de entrada
     * @returns {ParkingSpot} El espacio donde se estacionó
     *
     * TODO:
     * - Valida que vehicleType sea un string
     * - Lanza error "Vehicle type must be a string" si el tipo es inválido
     * - Valida que plate sea un string no vacío (después de trim)
     * - Lanza error "Vehicle plate is required" si la placa es inválida
     * - Valida que entryTime sea una instancia de Date
     * - Lanza error "Entry time must be a Date object" si la fecha es inválida
     * - Busca espacio disponible usando findAvailableSpot(vehicleType)
     * - Si no hay espacio disponible, lanza error "No available spot for this vehicle type"
     * - Estaciona vehículo usando spot.parkVehicle(plate, entryTime)
     * - Retorna el espacio donde se estacionó
     */
    parkVehicle(vehicleType, plate, entryTime) {
        if (vehicleType.trim() === '' || typeof vehicleType !== 'string') throw new Error("Vehicle type must be a string");
        if (plate.trim() === '' || typeof plate !== 'string') throw new Error("Vehicle plate is required");
        if (!(entryTime instanceof Date)) throw new Error("Entry time must be a Date object");

        const space = this.findAvailableSpot(vehicleType)


        if (space !== null) space.parkVehicle(plate, entryTime)
        else throw new Error("No available spot for this vehicle type");

        return space

    }

    /**
     * Libera un espacio y calcula tarifa.
     * Traducción: Salir del Parqueadero
     *
     * Este método encuentra el vehículo por placa, calcula tarifa y libera el espacio.
     *
     * @param {string} plate - Placa del vehículo
     * @param {Date} exitTime - Hora de salida
     * @returns {Object} Objeto con { spot: ParkingSpot, duration: number, fee: number }
     *
     * TODO:
     * - Valida que plate sea un string no vacío (después de trim)
     * - Lanza error "Vehicle plate is required" si la placa es inválida
     * - Valida que exitTime sea una instancia de Date
     * - Lanza error "Exit time must be a Date object" si la fecha es inválida
     * - Busca espacio ocupado por esa placa usando find()
     * - Si no se encuentra, lanza error "Vehicle not found"
     * - Obtiene tarifa por hora según tipo de espacio: this.hourlyRates[spot.type]
     * - Calcula tarifa usando spot.exitVehicle(exitTime, ratePerHour)
     * - Acumula ingresos: this.revenue[spot.type] += result.fee
     * - Retorna objeto { spot, duration: result.duration, fee: result.fee }
     */
    exitVehicle(plate, exitTime) {
        if (plate.trim() === '' || typeof plate !== 'string') throw new Error("Vehicle plate is required");
        if (!(exitTime instanceof Date)) throw new Error("Exit time must be a Date object");

        const FindAuto = this.spots.find(spot => spot.vehiclePlate === plate)
        if (FindAuto === undefined) throw new Error("Vehicle not found");

        const pricePerHour = this.hourlyRates[FindAuto.type]
        const pay = FindAuto.exitVehicle(exitTime, pricePerHour)

        this.revenue[FindAuto.type] += pay.fee

        return {
            spot: FindAuto,
            duration: pay.duration,
            fee: pay.fee

        }
    }

    /**
     * Calcula el porcentaje de ocupación del parqueadero.
     * Traducción: Obtener Tasa de Ocupación
     *
     * Este método calcula qué porcentaje de espacios están ocupados.
     *
     * @returns {number} Porcentaje de ocupación (0-100) con 2 decimales
     *
     * TODO:
     * - Si no hay espacios (this.spots.length === 0), retorna 0
     * - Cuenta espacios ocupados usando filter() o reduce()
     * - Calcula porcentaje: (ocupados / total) * 100
     * - Usa toFixed(2) y parseFloat() para formatear a 2 decimales
     * - Retorna el porcentaje calculado
     */
    getOccupancyRate() {
        if (this.spots.length === 0) return 0
        const spaceFill = (this.spots.filter(spot => spot.isOccupied === true)).length
        const porcent = parseFloat(((spaceFill / this.spots.length) * 100).toFixed(2))
        return porcent

    }

    /**
     * Obtiene los ingresos acumulados por tipo de espacio.
     * Traducción: Obtener Ingresos por Tipo
     *
     * Este método retorna un objeto con los ingresos totales por cada tipo de espacio.
     *
     * @returns {Object} Objeto con formato { compact: number, standard: number, large: number }
     *
     * TODO:
     * - Retorna una copia del objeto this.revenue usando spread operator {...}
     * - Esto asegura que no se modifique el objeto original desde fuera
     */
    getRevenueByType() {
        const copyReve = { ...this.revenue }
        return copyReve
    }

    /**
     * Obtiene todos los espacios de un tipo específico.
     * Traducción: Obtener Espacios por Tipo
     *
     * Este método filtra espacios según su tipo.
     *
     * @param {string} type - Tipo de espacio ('compact', 'standard', 'large')
     * @returns {ParkingSpot[]} Array con los espacios de ese tipo
     *
     * TODO:
     * - Valida que type sea uno de: 'compact', 'standard', 'large'
     * - Lanza error "Spot type must be 'compact', 'standard', or 'large'" si el tipo es inválido
     * - Usa this.spots.filter() para filtrar espacios donde spot.type === type
     * - Retorna el nuevo array filtrado
     */
    getSpotsByType(type) {
        if (!(['compact', 'standard', 'large'].includes(type))) throw new Error(`Spot type must be 'compact', 'standard', or 'large'`);
        return this.spots.filter(spot => spot.type === type)

    }
}



// const estacionamiento1 = new ParkingSpot('1', 'standard')
// console.log(estacionamiento1.parkVehicle('A1285SD', new Date()))
// console.log(estacionamiento1.calculateFee(new Date('2026-02-20'), 15))
// console.log(estacionamiento1.getParkingDuration(new Date('2026-02-20')))
// console.log(estacionamiento1.exitVehicle(new Date('2026-02-20'), 15))
// console.log(estacionamiento1.isCompatible('large'))
// console.log(estacionamiento1)


// const parkingGrande = new ParkingLot('estacionamiento Grande')
// console.log(parkingGrande.addSpot('1', 'standard'))
// console.log(parkingGrande.addSpot('2', 'standard'))
// console.log(parkingGrande.addSpot('3', 'large'))
// console.log(parkingGrande.findAvailableSpot('standard'))
// console.log(parkingGrande)
// console.log(parkingGrande.parkVehicle('standard', 'asd544', new Date()))
// console.log(parkingGrande.exitVehicle('asd544', new Date('2026-03-12')))
// console.log(parkingGrande.getOccupancyRate())
// console.log(parkingGrande.getRevenueByType())
// console.log('//////////////////////')
// console.log(parkingGrande.getSpotsByType('standard'))
// console.log(parkingGrande)


const spot = new ParkingSpot('A1', 'standard');
console.log(spot)
// console.log(spot.isCompatible(123))


module.exports = {
    ParkingSpot,
    ParkingLot
};

