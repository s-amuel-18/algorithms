/**
 * Sistema de Gestión de Transporte Público (Public Transit System)
 *
 * Descripción: Implementa tres clases básicas (`Bus`, `Route` y `TransitSystem`) para practicar
 * constructores, métodos de instancia, validaciones complejas, gestión de capacidad,
 * relaciones entre clases y cálculos financieros.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 * - Responsabilidad Única: cada clase tiene un propósito claro
 * - Uso de métodos de arrays: find, filter, reduce
 */

/**
 * Representa un bus del sistema de transporte.
 * Traducción: Bus
 * @class
 */
class Bus {
    /**
     * Constructor de la clase Bus
     * Traducción: Constructor de Bus
     *
     * Crea un nuevo bus con número y capacidad.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {string} busNumber - Número identificador del bus (no puede estar vacío)
     * @param {number} capacity - Capacidad máxima de pasajeros (debe ser mayor que 0)
     *
     * TODO:
     * - Valida que busNumber sea un string no vacío (después de trim)
     * - Lanza error "Bus number is required" si el número es inválido
     * - Valida que capacity sea un número mayor que 0
     * - Lanza error "Bus capacity must be greater than 0" si la capacidad es inválida
     * - Inicializa this.currentPassengers = 0
     * - Inicializa this.currentRoute = null
     * - Inicializa this.isInService = true
     * - Asigna los valores validados a this.busNumber y this.capacity
     */
    constructor(busNumber, capacity) {
        if (busNumber.trim() === '' || typeof busNumber !== 'string') throw new Error("Bus number is required");
        if (capacity <= 0) throw new Error("Bus capacity must be greater than 0");

        this.currentPassengers = 0
        this.currentRoute = null
        this.isInService = true
        this.busNumber = busNumber
        this.capacity = capacity


    }

    /**
     * Permite abordar pasajeros al bus.
     * Traducción: Abordar Pasajeros
     *
     * Este método incrementa el número de pasajeros validando capacidad disponible.
     *
     * @param {number} count - Número de pasajeros a abordar (debe ser mayor que 0)
     * @returns {number} Nuevo total de pasajeros después del abordaje
     *
     * TODO:
     * - Valida que count sea un número mayor que 0
     * - Lanza error "Passenger count must be greater than 0" si el conteo es inválido
     * - Valida que haya capacidad disponible: (this.currentPassengers + count) <= this.capacity
     * - Lanza error "Not enough capacity" si no hay suficiente capacidad
     * - Incrementa this.currentPassengers con count
     * - Retorna el nuevo total de pasajeros
     */
    boardPassengers(count) {
        if (count <= 0) throw new Error("Passenger count must be greater than 0");
        if (!((this.currentPassengers + count) <= this.capacity)) throw new Error("Not enough capacity");
        else return this.currentPassengers += count


    }

    /**
     * Permite descender pasajeros del bus.
     * Traducción: Descender Pasajeros
     *
     * Este método decrementa el número de pasajeros validando que haya suficientes.
     *
     * @param {number} count - Número de pasajeros a descender (debe ser mayor que 0)
     * @returns {number} Nuevo total de pasajeros después del descenso
     *
     * TODO:
     * - Valida que count sea un número mayor que 0
     * - Lanza error "Passenger count must be greater than 0" si el conteo es inválido
     * - Valida que haya suficientes pasajeros: this.currentPassengers >= count
     * - Lanza error "Not enough passengers on board" si no hay suficientes pasajeros
     * - Decrementa this.currentPassengers con count
     * - Retorna el nuevo total de pasajeros
     */
    alightPassengers(count) {
        if (count <= 0) throw new Error("Passenger count must be greater than 0");
        if (this.currentPassengers <= count) throw new Error("Not enough passengers on board");

        return this.currentPassengers -= count

    }

    /**
     * Calcula los asientos disponibles en el bus.
     * Traducción: Obtener Asientos Disponibles
     *
     * Este método calcula cuántos asientos están libres.
     *
     * @returns {number} Número de asientos disponibles
     *
     * TODO:
     * - Calcula asientos disponibles: this.capacity - this.currentPassengers
     * - Retorna el número de asientos disponibles (no puede ser negativo, retorna 0 si es negativo)
     */
    getAvailableSeats() {
        return this.capacity - this.currentPassengers
    }

    /**
     * Asigna una ruta al bus.
     * Traducción: Asignar Ruta
     *
     * Este método asigna una ruta al bus, validando que sea una instancia válida.
     *
     * @param {Route} route - Instancia de Route a asignar
     * @returns {boolean} true si se asignó correctamente
     *
     * TODO:
     * - Valida que route sea una instancia de Route
     * - Lanza error "Route must be an instance of Route" si es inválido
     * - Asigna route a this.currentRoute
     * - Retorna true
     */
    setRoute(route) {
        if (!(route instanceof Route)) throw new Error("Route must be an instance of Route");
        this.currentRoute = route
        return true

    }

    /**
     * Calcula el porcentaje de ocupación del bus.
     * Traducción: Obtener Tasa de Ocupación
     *
     * Este método calcula qué porcentaje de la capacidad está ocupada.
     *
     * @returns {number} Porcentaje de ocupación (0-100) con 2 decimales
     *
     * TODO:
     * - Calcula porcentaje: (this.currentPassengers / this.capacity) * 100
     * - Usa toFixed(2) y parseFloat() para formatear a 2 decimales
     * - Retorna el porcentaje calculado
     */
    getOccupancyRate() {
        return parseFloat(((this.currentPassengers / this.capacity) * 100).toFixed(2))
    }
}

/**
 * Representa una ruta del sistema de transporte.
 * Traducción: Ruta
 * @class
 */
class Route {
    /**
     * Constructor de la clase Route
     * Traducción: Constructor de Ruta
     *
     * Crea una nueva ruta con número, distancia y tarifa.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {string} routeNumber - Número identificador de la ruta (no puede estar vacío)
     * @param {number} distance - Distancia total en kilómetros (debe ser mayor que 0)
     * @param {number} fare - Tarifa del viaje (debe ser mayor que 0)
     *
     * TODO:
     * - Valida que routeNumber sea un string no vacío (después de trim)
     * - Lanza error "Route number is required" si el número es inválido
     * - Valida que distance sea un número mayor que 0
     * - Lanza error "Route distance must be greater than 0" si la distancia es inválida
     * - Valida que fare sea un número mayor que 0
     * - Lanza error "Route fare must be greater than 0" si la tarifa es inválida
     * - Inicializa this.stops como un array vacío []
     * - Asigna los valores validados a las propiedades correspondientes
     */
    constructor(routeNumber, distance, fare) {
        if (routeNumber.trim() === '' || typeof routeNumber !== 'string') throw new Error("Route number is required");
        if (distance <= 0) throw new Error("Route distance must be greater than 0");
        if (fare <= 0) throw new Error("Route fare must be greater than 0");

        this.stops = []
        this.routeNumber = routeNumber
        this.distance = distance
        this.fare = fare

    }

    /**
     * Agrega una parada a la ruta.
     * Traducción: Agregar Parada
     *
     * Este método agrega una parada al array de paradas, validando que no exista.
     *
     * @param {string} stopName - Nombre de la parada (no puede estar vacío)
     * @returns {number} Número total de paradas después de agregar
     *
     * TODO:
     * - Valida que stopName sea un string no vacío (después de trim)
     * - Lanza error "Stop name is required" si el nombre es inválido
     * - Verifica que la parada no exista ya usando includes() o find()
     * - Si existe, lanza error "Stop already exists"
     * - Agrega la parada al array this.stops usando push()
     * - Retorna el número total de paradas (this.stops.length)
     */
    addStop(stopName) {
        if (stopName.trim() === 0 || typeof stopName !== 'string') throw new Error("Stop name is required");
        const exist = this.stops.find(stop => stop === stopName)
        if (exist !== undefined) throw new Error("Stop already exists");
        else this.stops.push(stopName)

        return this.stops.length


    }

    /**
     * Obtiene el número total de paradas.
     * Traducción: Obtener Total de Paradas
     *
     * Este método retorna cuántas paradas tiene la ruta.
     *
     * @returns {number} Número total de paradas
     *
     * TODO:
     * - Retorna this.stops.length
     */
    getTotalStops() {
        return this.stops.length
    }

    /**
     * Obtiene la distancia total de la ruta.
     * Traducción: Obtener Distancia
     *
     * Este método retorna la distancia en kilómetros.
     *
     * @returns {number} Distancia total en kilómetros
     *
     * TODO:
     * - Retorna this.distance
     */
    getDistance() {
        return this.distance
    }

    /**
     * Calcula el tiempo de viaje según velocidad promedio.
     * Traducción: Calcular Tiempo de Viaje
     *
     * Este método calcula cuánto tiempo toma recorrer la ruta.
     *
     * @param {number} averageSpeed - Velocidad promedio en km/h (debe ser mayor que 0)
     * @returns {number} Tiempo de viaje en horas con 2 decimales
     *
     * TODO:
     * - Valida que averageSpeed sea un número mayor que 0
     * - Lanza error "Average speed must be greater than 0" si la velocidad es inválida
     * - Calcula tiempo: this.distance / averageSpeed
     * - Usa toFixed(2) y parseFloat() para formatear a 2 decimales
     * - Retorna el tiempo calculado
     */
    calculateTravelTime(averageSpeed) {
        if (averageSpeed <= 0) throw new Error("Average speed must be greater than 0");
        return parseFloat((this.distance / averageSpeed).toFixed(2))

    }
}

/**
 * Gestiona el sistema de transporte y sus operaciones.
 * Traducción: Sistema de Transporte
 * @class
 */
class TransitSystem {
    /**
     * Constructor de la clase TransitSystem
     * Traducción: Constructor de Sistema de Transporte
     *
     * Crea un nuevo sistema de transporte con nombre.
     *
     * @param {string} name - Nombre del sistema (no puede estar vacío)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Transit system name is required" si el nombre es inválido
     * - Inicializa this.buses como un array vacío []
     * - Inicializa this.routes como un array vacío []
     * - Asigna el nombre validado a this.name
     */
    constructor(name) {
        if (name.trim() === '' || typeof name !== 'string') throw new Error("Transit system name is required");

        this.buses = []
        this.routes = []
        this.name = name.trim()

    }

    /**
     * Agrega un bus al sistema.
     * Traducción: Agregar Bus
     *
     * Este método agrega un bus, validando que sea instancia válida y no exista duplicado.
     *
     * @param {Bus} bus - Instancia de Bus a agregar
     * @returns {number} Número total de buses después de agregar
     *
     * TODO:
     * - Valida que bus sea una instancia de Bus
     * - Lanza error "Bus must be an instance of Bus" si es inválido
     * - Verifica que no exista bus con mismo busNumber usando find()
     * - Si existe, lanza error "Bus number already exists"
     * - Agrega el bus al array this.buses usando push()
     * - Retorna el número total de buses (this.buses.length)
     */
    addBus(bus) {
        if (!(bus instanceof Bus)) throw new Error("Bus must be an instance of Bus");
        if (this.buses.length === 0 || !(this.buses.find(inBus => inBus.busNumber === bus.busNumber))) this.buses.push(bus)
        else throw new Error("Bus number already exists");

        return this.buses.length



    }

    /**
     * Agrega una ruta al sistema.
     * Traducción: Agregar Ruta
     *
     * Este método agrega una ruta, validando que sea instancia válida y no exista duplicado.
     *
     * @param {Route} route - Instancia de Route a agregar
     * @returns {number} Número total de rutas después de agregar
     *
     * TODO:
     * - Valida que route sea una instancia de Route
     * - Lanza error "Route must be an instance of Route" si es inválido
     * - Verifica que no exista ruta con mismo routeNumber usando find()
     * - Si existe, lanza error "Route number already exists"
     * - Agrega la ruta al array this.routes usando push()
     * - Retorna el número total de rutas (this.routes.length)
     */
    addRoute(route) {
        if (!(route instanceof Route)) throw new Error("Route must be an instance of Route");
        if (this.routes.length === 0 || !(this.routes.find(inRoutes => inRoutes.routeNumber === route.routeNumber))) this.routes.push(route)
        else throw new Error("Route number already exists");

        return this.routes.length


    }

    /**
     * Asigna un bus a una ruta específica.
     * Traducción: Asignar Bus a Ruta
     *
     * Este método encuentra bus y ruta por números y los asocia.
     *
     * @param {string} busNumber - Número del bus
     * @param {string} routeNumber - Número de la ruta
     * @returns {boolean} true si se asignó correctamente
     *
     * TODO:
     * - Valida que busNumber sea un string
     * - Lanza error "Bus number must be a string" si es inválido
     * - Valida que routeNumber sea un string
     * - Lanza error "Route number must be a string" si es inválido
     * - Busca bus usando find() con busNumber
     * - Si no se encuentra, lanza error "Bus not found"
     * - Busca ruta usando find() con routeNumber
     * - Si no se encuentra, lanza error "Route not found"
     * - Asigna ruta al bus usando bus.setRoute(route)
     * - Retorna true
     */
    assignBusToRoute(busNumber, routeNumber) {
        if (typeof busNumber !== 'string') throw new Error("Bus number must be a string");
        if (typeof routeNumber !== 'string') throw new Error("routeNumber number must be a string");

        const findBus = this.buses.find(inbus => inbus.busNumber === busNumber)
        if (findBus === undefined) throw new Error("Bus not found");

        const findRoute = this.routes.find(rute => rute.routeNumber === routeNumber)
        if (findRoute === undefined) throw new Error("Route not found");

        findBus.setRoute(findRoute)
        return true




    }

    /**
     * Obtiene todos los buses asignados a una ruta específica.
     * Traducción: Obtener Buses por Ruta
     *
     * Este método filtra buses según su ruta asignada.
     *
     * @param {string} routeNumber - Número de la ruta
     * @returns {Bus[]} Array con los buses de esa ruta
     *
     * TODO:
     * - Valida que routeNumber sea un string
     * - Lanza error "Route number must be a string" si es inválido
     * - Busca la ruta usando find() con routeNumber
     * - Si no se encuentra, retorna array vacío []
     * - Usa this.buses.filter() para filtrar buses donde bus.currentRoute === route encontrada
     * - Retorna el nuevo array filtrado
     */
    getBusesByRoute(routeNumber) {
        if (typeof routeNumber !== 'string') throw new Error("Route number must be a string");

        const busesByRoute = this.buses.find(bus => bus.currentRoute.routeNumber === routeNumber)
        if (busesByRoute === undefined) return []


        return this.buses.filter(bus => bus.currentRoute.routeNumber === routeNumber)

    }

    /**
     * Calcula el total de pasajeros en todos los buses.
     * Traducción: Obtener Total de Pasajeros
     *
     * Este método suma pasajeros de todos los buses usando reduce().
     *
     * @returns {number} Total de pasajeros
     *
     * TODO:
     * - Usa this.buses.reduce() para calcular el total
     * - Para cada bus, suma bus.currentPassengers al acumulador
     * - Retorna el total de pasajeros
     * - Si no hay buses, retorna 0
     */
    getTotalPassengers() {
        return this.buses.reduce((acumulador, passenger) => {
            return acumulador + (passenger.currentPassengers)
        }, 0)
    }

    /**
     * Calcula los ingresos totales del sistema.
     * Traducción: Obtener Ingresos
     *
     * Este método calcula ingresos multiplicando pasajeros por tarifa de ruta.
     *
     * @returns {number} Total de ingresos con 2 decimales
     *
     * TODO:
     * - Usa this.buses.reduce() para calcular el total
     * - Para cada bus, verifica si tiene ruta asignada (bus.currentRoute !== null)
     * - Si tiene ruta, suma (bus.currentPassengers * bus.currentRoute.fare) al acumulador
     * - Si no tiene ruta, no suma nada (o suma 0)
     * - Usa toFixed(2) y parseFloat() para formatear a 2 decimales
     * - Retorna el total de ingresos
     */
    getRevenue() {
        return this.buses.reduce((acumulador, bus) => {
            return acumulador + parseFloat((bus.currentPassengers * bus.currentRoute.fare).toFixed(2))
        }, 0)
    }

    /**
     * Encuentra la ruta con más pasajeros totales.
     * Traducción: Obtener Ruta Más Popular
     *
     * Este método encuentra qué ruta tiene más pasajeros sumando todos sus buses.
     *
     * @returns {Route|null} La ruta más popular o null si no hay buses asignados
     *
     * TODO:
     * - Si no hay rutas, retorna null
     * - Para cada ruta, suma pasajeros de todos sus buses usando getBusesByRoute()
     * - Encuentra la ruta con más pasajeros totales
     * - Retorna la ruta encontrada
     * - Si hay empate, retorna la primera encontrada
     * - Si ninguna ruta tiene buses asignados, retorna null
     */
    getMostPopularRoute() {
        if (this.buses.length === 0) return null
        const volumenRout = {}
        const busesByRoute = this.routes.filter(rute => {
            const arrybuses = this.getBusesByRoute(rute.routeNumber)

            const personas = arrybuses.reduce((contador, passenger) => {
                return contador + (passenger.currentPassengers)
            }, 0)

            volumenRout[rute.routeNumber] = personas

        })
        let max = 0
        for (const rute in volumenRout) {
            if (max < volumenRout[rute]) max = rute


        }
        return this.routes.find(route => route.routeNumber === max)

    }
}

// const bus1 = new Bus('22', 75)
// const bus2 = new Bus('23', 25)
// const bus3 = new Bus('24', 12)
// console.log(bus1.boardPassengers(75))
// console.log(bus2.boardPassengers(25))
// // console.log(bus1.alightPassengers(25))
// // console.log(bus1.getAvailableSeats())
// // console.log(bus1.getOccupancyRate())

// const eneroDe23 = new Route('12', 250, 60)
// const chacao = new Route('24', 250, 60)

// // console.log(bus1.setRoute(eneroDe23))
// // console.log(eneroDe23.addStop('Agua Salud'))
// // console.log(eneroDe23.addStop('La Canada'))
// // console.log(eneroDe23.addStop('Centro'))
// // console.log(eneroDe23.getTotalStops())
// // console.log(eneroDe23.getDistance())
// // console.log(eneroDe23.calculateTravelTime(20))
// // console.log(bus1)

// const sistema = new TransitSystem('Transito Caracas')
// console.log(sistema.addBus(bus1))
// console.log(sistema.addBus(bus2))
// console.log(sistema.addBus(bus3))
// console.log(sistema.addRoute(eneroDe23))
// console.log(sistema.addRoute(chacao))
// console.log(sistema.assignBusToRoute('22', '12'))
// console.log(sistema.assignBusToRoute('23', '12'))
// console.log(sistema.assignBusToRoute('24', '24'))
// console.log(sistema.getBusesByRoute('24'))
// console.log(sistema.getTotalPassengers())
// console.log(sistema.getRevenue())
// console.log('////////////////////')
// console.log(sistema.getMostPopularRoute())
// console.log('////////////////////')
// // console.log(JSON.stringify(sistema, null, 2))

const system = new TransitSystem('City Transit');
const route1 = new Route('R1', 10, 2.50);
const route2 = new Route('R2', 15, 3.00);
const bus1 = new Bus('B101', 50);
const bus2 = new Bus('B102', 50);
bus1.boardPassengers(50);
bus2.boardPassengers(30);

system.addRoute(route1);
system.addRoute(route2);
system.addBus(bus1);
system.addBus(bus2);
system.assignBusToRoute('B101', 'R1');
system.assignBusToRoute('B102', 'R2');

console.log(JSON.stringify(system, null, 2))
console.log(system.getMostPopularRoute())

module.exports = {
    Bus,
    Route,
    TransitSystem
};

