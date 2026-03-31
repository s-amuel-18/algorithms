/**
 * Fleet Maintenance Manager
 *
 * Description: Implement two beginner-friendly classes (`Vehicle` and
 * `FleetManager`) to register vehicles, track mileage and build maintenance
 * reports. Follow the README instructions and keep all identifiers/messages
 * in English.
 * Difficulty: BEGINNER
 *
 * Suggested principles:
 * - Fail Fast: valida todos los datos antes de continuar
 * - KISS + Código Expresivo: métodos cortos y nombres claros
 * - Inmutabilidad: nunca expongas el array interno del registro
 */

class Vehicle {
    /**
     * @param {string} plate - License plate (stored uppercase, >= 5 chars)
     * @param {string} type - Vehicle type (truck, van, etc.)
     * @param {number} mileage - Current mileage (integer >= 0)
     *
     * TODO:
     * - Valida cada argumento y lanza los errores descritos en el README.
     * - Normaliza la placa con `trim()` y `toUpperCase()`.
     * - Asigna las propiedades a `this`.
     */
    constructor(plate, type, mileage) {


        type = type.trim()
        plate = plate.trim()
        if (plate === '') throw new Error('Vehicle plate is required')
        if (type === '') throw new Error('Vehicle type is required')
        if (mileage < 0) throw new Error('Vehicle mileage must be a number greater than or equal to 0')

        plate = plate.toUpperCase()


        this.plate = plate
        this.type = type
        this.mileage = mileage



        // throw new Error('Vehicle constructor not implemented');
    }

    /**
     * Builds a summary string such as "ABC123 (truck) has 1500 km".
     * @returns {string}
     *
     * TODO:
     * - Usa template literals y respeta el formato solicitado.
     */
    getSummary() {
        console.log(`${this.plate} (${this.type}) has ${this.mileage} km`)
        return `${this.plate} (${this.type}) has ${this.mileage} km`
        // throw new Error('Method getSummary not implemented');
    }

    /**
     * Adds a new trip to the mileage.
     * @param {number} kilometers - Positive integer number
     * @returns {number} Updated mileage
     *
     * TODO:
     * - Valida que `kilometers` sea entero positivo (>0).
     * - Lanza "Trip distance must be a positive number" si no cumple.
     * - Suma al kilometraje y retorna el nuevo valor.
     */
    addTrip(kilometers) {
        if (Number.isFinite(kilometers) && kilometers > 0) {
            this.mileage = this.mileage + kilometers
            console.log(this.mileage)
            return this.mileage
        } else if (kilometers <= 0) {
            throw new Error('Trip distance must be a positive number')
        }
        // throw new Error('Method addTrip not implemented');
    }
}







// const renoult1 = new Vehicle('   ', 'van', 8500)
const renoult3 = new Vehicle('ASsd12', 'van', 4)
const renoult22 = new Vehicle('ASE412', 'van', 421321)

// renoult22.addTrip(0)

// renoult1.addTrip(33)

class FleetManager {
    /**
     * Creates an empty fleet registry.
     *
     * TODO:
     * - Inicializa `this.#vehicles` como array vacío.
     */
    #vehicles = []
    constructor() {


        // throw new Error('FleetManager constructor not implemented');
    }

    /**
     * Adds a vehicle to the fleet.
     * @param {Vehicle} vehicle
     * @returns {number} Total vehicles stored
     *
     * TODO:
     * - Valida que sea instancia de `Vehicle` o lanza
     *   "Vehicle must be an instance of Vehicle".
     * - Evita duplicados comparando placas (case-insensitive). Si existe,
     *   lanza "Vehicle plate already registered".
     * - Agrega al array y retorna `length`.
     */

    addVehicle(vehicle) {
        if (!(vehicle instanceof Vehicle)) throw new Error('Vehicle must be an instance of Vehicle')
        if (this.existsPlate(vehicle.plate)) throw new Error('Vehicle plate already registered')

        this.#vehicles.push(vehicle)

        return this.#vehicles.length


        // throw new Error('Method addVehicle not implemented');
    }

    /**
     * Finds a vehicle by plate (case-insensitive).
     * @param {string} plate
     * @returns {Vehicle|null}
     *
     * TODO:
     * - Normaliza la entrada (trim + uppercase) y busca en el array.
     * - Retorna la coincidencia o `null` si no existe.
     */
    findByPlate(inputPlate) {
        const plate = inputPlate.trim()
        const vehiculeFound = this.#vehicles.find(plateVehiculo => {
            plateVehiculo.plate === plate
            return plateVehiculo.type
        })
        if (vehiculeFound === undefined) {
            return null
        }

        return vehiculeFound

        // if(!(plate === plateFound)) return console.log(plateFound)
        // throw new Error('Method findByPlate not implemented');
    }

    /**
     * Returns maintenance summaries for vehicles above a threshold.
     * @param {number} threshold
     * @returns {string[]} Array with `getSummary()` results
     *
     * TODO:
     * - Valida que `threshold` sea entero >= 0, de lo contrario lanza
     *   "Maintenance threshold must be a number greater than or equal to 0".
     * - Filtra vehículos con `mileage >= threshold` y mapea con `getSummary`.
     * - Retorna un nuevo array (no expongas el original).
     */
    getMaintenanceList(threshold) {
        if (threshold < 0) throw ('Maintenance threshold must be a number greater than or equal to 0')

        const vehivlesArry = this.#vehicles.filter(vehicle => vehicle.mileage >= threshold)
        const arryDescription = vehivlesArry.map(description => description.getSummary())
        return arryDescription
        // throw new Error('Method getMaintenanceList not implemented');
    }



    existsPlate(plate) {
        for (let i = 0; i < this.#vehicles.length; i++) {
            const actualVehicle = this.#vehicles[i]
            if (plate === actualVehicle.plate) {
                return true
            }
        }
        return false
    }
}


const registreVehicles = new FleetManager()

// registreVehicles.addVehicle(renoult1)
registreVehicles.addVehicle(renoult22)
registreVehicles.addVehicle(renoult3)
// console.log('consulta ',registreVehicles)
console.log('aqui', registreVehicles)

let a = '  '
console.log(a)
console.log(a.trim())

// let a = [1,2,3]

// console.log(a.find(as => as === 1 ))

const buildVehicle = (plate = 'ABC123', type = 'truck', mileage = 10000) =>
    new Vehicle(plate, type, mileage);

const fleet = new FleetManager();
for (let i = 0; i < 30; i ++) {
    fleet.addVehicle(buildVehicle(`CAR${i}`, 'car', i * 1000));
}
const list = fleet.getMaintenanceList(20000);
console.log(list, 'es aqui?')


module.exports = {
    Vehicle,
    FleetManager
};

