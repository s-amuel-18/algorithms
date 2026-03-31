/**
 * Sistema de Gestión de Hotel (Hotel Management System)
 *
 * Descripción: Implementa tres clases básicas (`Room`, `Reservation` y `Hotel`) para practicar
 * constructores, métodos de instancia, validaciones complejas, validación de solapamientos temporales,
 * cálculos de precios según duración y gestión de reservas.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 * - Responsabilidad Única: cada clase tiene un propósito claro
 * - Uso de métodos de arrays: find, filter, reduce, some
 */

/**
 * Representa una habitación del hotel.
 * Traducción: Habitación
 * @class
 */
class Room {
    /**
     * Constructor de la clase Room
     * Traducción: Constructor de Habitación
     *
     * Crea una nueva habitación con número, tipo y precio por noche.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {number} number - Número de habitación (debe ser mayor que 0)
     * @param {string} type - Tipo de habitación (no puede estar vacío)
     * @param {number} pricePerNight - Precio por noche (debe ser mayor que 0)
     *
     * TODO:
     * - Valida que number sea un número mayor que 0
     * - Lanza error "Room number must be greater than 0" si el número es inválido
     * - Valida que type sea un string no vacío (después de trim)
     * - Lanza error "Room type is required" si el tipo es inválido
     * - Valida que pricePerNight sea un número mayor que 0
     * - Lanza error "Room price per night must be greater than 0" si el precio es inválido
     * - Asigna los valores validados a las propiedades correspondientes
     */
    constructor(number, type, pricePerNight) {
        if (number <= 0) throw new Error('Room number must be greater than 0')
        if (type.trim() === '' || typeof type !== 'string') throw new Error('Room type is required')
        if (pricePerNight <= 0) throw new Error('Room price per night must be greater than 0')

        this.number = number
        this.type = type
        this.pricePerNight = pricePerNight
    }

    /**
     * Obtiene el tipo de habitación.
     * Traducción: Obtener Tipo
     *
     * @returns {string} Tipo de habitación
     *
     * TODO:
     * - Retorna this.type
     */
    getType() {
        return this.type
    }

    /**
     * Obtiene el precio por noche.
     * Traducción: Obtener Precio por Noche
     *
     * @returns {number} Precio por noche
     *
     * TODO:
     * - Retorna this.pricePerNight
     */
    getPricePerNight() {
        return this.pricePerNight
    }
}

/**
 * Representa una reserva del hotel.
 * Traducción: Reserva
 * @class
 */
class Reservation {
    /**
     * Constructor de la clase Reservation
     * Traducción: Constructor de Reserva
     *
     * Crea una nueva reserva con número de habitación, nombre del huésped y fechas.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {number} roomNumber - Número de habitación (debe ser mayor que 0)
     * @param {string} guestName - Nombre del huésped (no puede estar vacío)
     * @param {Date} checkIn - Fecha de check-in (debe ser una instancia de Date)
     * @param {Date} checkOut - Fecha de check-out (debe ser una instancia de Date)
     *
     * TODO:
     * - Valida que roomNumber sea un número mayor que 0
     * - Lanza error "Room number must be greater than 0" si el número es inválido
     * - Valida que guestName sea un string no vacío (después de trim)
     * - Lanza error "Guest name is required" si el nombre es inválido
     * - Valida que checkIn sea una instancia de Date
     * - Lanza error "Check-in date must be a Date object" si la fecha es inválida
     * - Valida que checkOut sea una instancia de Date
     * - Lanza error "Check-out date must be a Date object" si la fecha es inválida
     * - Valida que checkOut sea posterior a checkIn
     * - Lanza error "Check-out date must be after check-in date" si las fechas son inválidas
     * - Asigna los valores validados a las propiedades correspondientes
     */
    constructor(roomNumber, guestName, checkIn, checkOut) {
        if (roomNumber <= 0) throw new Error('Room number must be greater than 0')
        if (guestName.trim() === '' || typeof guestName !== 'string') throw new Error('Guest name is required')
        if (!(checkIn instanceof Date)) throw new Error('Check-in date must be a Date object')
        if (!(checkOut instanceof Date)) throw new Error('Check-out date must be a Date object')
        if (checkIn.getTime() >= checkOut.getTime()) throw new Error('Check-out date must be after check-in date')

        this.roomNumber = roomNumber
        this.guestName = guestName
        this.checkIn = checkIn
        this.checkOut = checkOut
    }

    /**
     * Calcula la duración de la estadía en noches.
     * Traducción: Obtener Duración
     *
     * Este método calcula cuántas noches dura la reserva.
     *
     * @returns {number} Número de noches
     *
     * TODO:
     * - Calcula la diferencia en milisegundos: this.checkOut - this.checkIn
     * - Convierte a días: diferencia / (1000 * 60 * 60 * 24)
     * - Usa Math.floor() para obtener días enteros
     * - Retorna el número de noches
     */
    getDuration() {
        const diference = this.checkOut.getTime() - this.checkIn.getTime()
        const days = Math.floor(diference / (1000 * 60 * 60 * 24))
        return days
    }

    /**
     * Obtiene el nombre del huésped.
     * Traducción: Obtener Nombre del Huésped
     *
     * @returns {string} Nombre del huésped
     *
     * TODO:
     * - Retorna this.guestName
     */
    getGuestName() {
        return this.guestName
    }
    /**
     * Verifica si la reserva está activa (check-in pasado, check-out futuro).
     * Traducción: Verificar si está Activa
     *
     * Este método verifica si la fecha actual está entre check-in y check-out.
     *
     * @returns {boolean} true si la reserva está activa, false en caso contrario
     *
     * TODO:
     * - Obtiene la fecha actual: new Date()
     * - Verifica que la fecha actual >= this.checkIn y < this.checkOut
     * - Retorna true si está activa, false en caso contrario
     */
    isActive() {
        const fecha = new Date()
        if (fecha >= this.checkIn && fecha < this.checkOut) return true
        else return false
    }
}

/**
 * Gestiona el hotel y sus operaciones.
 * Traducción: Hotel
 * @class
 */
class Hotel {
    /**
     * Constructor de la clase Hotel
     * Traducción: Constructor de Hotel
     *
     * Crea un nuevo hotel con nombre.
     * Inicializa arrays vacíos para habitaciones y reservas.
     *
     * @param {string} name - Nombre del hotel (no puede estar vacío)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Hotel name is required" si el nombre es inválido
     * - Inicializa this.rooms como un array vacío []
     * - Inicializa this.reservations como un array vacío []
     * - Asigna el nombre validado a this.name
     */
    constructor(name) {
        if (name.trim() === '' || typeof name !== 'string') throw new Error('Hotel name is required')

        this.rooms = []
        this.reservations = []
        this.name = name
    }

    /**
     * Agrega una habitación al hotel.
     * Traducción: Agregar Habitación
     *
     * Este método agrega una habitación al hotel. Debe validar que sea una instancia de Room
     * y que no exista ya una habitación con el mismo número.
     *
     * @param {Room} room - Instancia de Room a agregar
     * @returns {Room} La habitación agregada
     *
     * TODO:
     * - Valida que room sea una instancia de Room
     * - Lanza error "Room must be an instance of Room" si es inválido
     * - Usa findRoom() para verificar si ya existe una habitación con ese número
     * - Si la habitación existe, lanza un error: "Room number already exists"
     * - Agrega la habitación al array this.rooms usando push()
     * - Retorna la habitación agregada
     */
    addRoom(room) {
        if (!(room instanceof Room)) throw new Error('Room must be an instance of Room')
        if (this.findRoom(room.number) === null) this.rooms.push(room)
        else throw new Error('Room number already exists')
        return room
    }

    /**
     * Busca una habitación por número usando find().
     * Traducción: Buscar Habitación
     *
     * Este método busca una habitación cuyo number coincida exactamente con el parámetro recibido.
     *
     * @param {number} roomNumber - Número de habitación a buscar
     * @returns {Room|null} La habitación encontrada o null si no existe
     *
     * TODO:
     * - Usa this.rooms.find() para buscar una habitación cuyo number coincida exactamente
     * - Retorna la habitación encontrada o null si no se encuentra
     */
    findRoom(roomNumber) {
        const filter = this.rooms.find(room => room.number === roomNumber)
        if (filter === undefined) return null
        else return filter

    }

    /**
     * Crea una nueva reserva.
     * Traducción: Crear Reserva
     *
     * Este método crea una nueva reserva. Debe validar que la habitación exista y que no haya
     * solapamientos con otras reservas de la misma habitación.
     *
     * @param {number} roomNumber - Número de habitación
     * @param {string} guestName - Nombre del huésped
     * @param {Date} checkIn - Fecha de check-in
     * @param {Date} checkOut - Fecha de check-out
     * @returns {Reservation} La reserva creada
     *
     * TODO:
     * - Usa findRoom() para buscar la habitación por número
     * - Si la habitación no existe, lanza un error: "Room not found"
     * - Valida que no haya solapamientos usando hasOverlap()
     * - Si hay solapamiento, lanza un error: "Room is already booked for these dates"
     * - Crea una nueva instancia de Reservation con los parámetros recibidos
     * - Agrega la reserva al array this.reservations usando push()
     * - Retorna la reserva creada
     */
    createReservation(roomNumber, guestName, checkIn, checkOut) {
        const searchRoom = this.findRoom(roomNumber)
        console.log(searchRoom, 'searchRoom')
        if (searchRoom === null) throw new Error('Room not found')

        const verificationRoom = this.reservations.filter(element => searchRoom.number === element.roomNumber)
        console.log('-----------------------')
        console.log(verificationRoom[0], 'verificationRoom')
        console.log('-----------------------')
        console.log('-----------------------')
        if (this.reservations.length === 0 || verificationRoom.length === 0) {
            const newReservation = new Reservation(roomNumber, guestName, checkIn, checkOut)
            this.reservations.push(newReservation)
            return newReservation
        } else {
            if (this.hasOverlap(checkIn, checkOut, verificationRoom[0].checkIn, verificationRoom[0].checkOut)) throw new Error("Room is already booked for these dates")
            else {
                const newReservation = new Reservation(roomNumber, guestName, checkIn, checkOut)
                this.reservations.push(newReservation)
                return newReservation
            }

        }





    }

    /**
     * Verifica si hay solapamiento entre dos rangos de fechas.
     * Traducción: Verificar Solapamiento
     *
     * Este método verifica si dos rangos de fechas se solapan.
     * Dos rangos se solapan si: (start1 < end2) && (end1 > start2)
     *
     * @param {Date} start1 - Inicio del primer rango
     * @param {Date} end1 - Fin del primer rango
     * @param {Date} start2 - Inicio del segundo rango
     * @param {Date} end2 - Fin del segundo rango
     * @returns {boolean} true si hay solapamiento, false en caso contrario
     *
     * TODO:
     * - Verifica si hay solapamiento: (start1 < end2) && (end1 > start2)
     * - Retorna true si hay solapamiento, false en caso contrario
     */
    hasOverlap(start1, end1, start2, end2) {
        if (start1.getTime() < end2.getTime() && end1.getTime() > start2.getTime()) return true
        else return false
    }

    /**
     * Obtiene todas las habitaciones disponibles en un rango de fechas usando filter().
     * Traducción: Obtener Habitaciones Disponibles
     *
     * Este método retorna un nuevo array con todas las habitaciones que NO tienen reservas
     * que se solapen con el rango de fechas solicitado.
     * Debe usar el método filter() del array.
     *
     * @param {Date} checkIn - Fecha de check-in
     * @param {Date} checkOut - Fecha de check-out
     * @returns {Room[]} Array con las habitaciones disponibles
     *
     * TODO:
     * - Valida que checkIn y checkOut sean instancias de Date
     * - Lanza error "Check-in date must be a Date object" si checkIn es inválido
     * - Lanza error "Check-out date must be a Date object" si checkOut es inválido
     * - Usa this.rooms.filter() para filtrar habitaciones
     * - Para cada habitación, verifica si tiene reservas que se solapen con el rango
     * - Una habitación está disponible si NO tiene reservas que se solapen
     * - Usa hasOverlap() para verificar solapamientos
     * - Retorna el nuevo array filtrado
     */
    getAvailableRooms(checkIn, checkOut) {
        if (!(checkIn instanceof Date)) throw new Error("Check-in date must be a Date object");
        if (!(checkOut instanceof Date)) throw new Error("Check-out date must be a Date object");
        return this.rooms.filter(room => {
            const over = this.reservations.filter(Reservation => {
                Reservation.roomNumber === room.number && !(this.hasOverlap(checkIn, checkOut, Reservation.checkIn, Reservation.checkOut))
                // console.log(this.hasOverlap(checkIn, checkOut, Reservation.checkIn, Reservation.checkOut),checkIn,checkOut,Reservation.checkIn,Reservation.checkOut, ' solapamiento')
            })
            // console.log(room.number, 'cuarto')
            return over
        })

    }

    /**
     * Obtiene todas las reservas de un huésped específico usando filter().
     * Traducción: Obtener Reservas por Huésped
     *
     * Este método retorna un nuevo array con todas las reservas del huésped especificado.
     * Debe usar el método filter() del array.
     *
     * @param {string} guestName - Nombre del huésped
     * @returns {Reservation[]} Array con las reservas de ese huésped
     *
     * TODO:
     * - Usa this.reservations.filter() para filtrar reservas
     * - Filtra reservas donde reservation.getGuestName() === guestName
     * - Retorna el nuevo array filtrado
     */
    getReservationsByGuest(guestName) {
        return this.reservations.filter(guest => guest.getGuestName() === guestName)
    }

    /**
     * Calcula los ingresos totales del hotel usando reduce().
     * Traducción: Obtener Ingresos Totales
     *
     * Este método calcula los ingresos totales sumando (precio por noche × duración) de todas las reservas.
     * Debe usar el método reduce() del array.
     *
     * @returns {number} Total de ingresos
     *
     * TODO:
     * - Usa this.reservations.reduce() para calcular el total
     * - Para cada reserva, busca la habitación usando findRoom(reservation.roomNumber)
     * - Calcula el total de la reserva: room.getPricePerNight() * reservation.getDuration()
     * - Suma el total de cada reserva al acumulador
     * - Retorna el total de ingresos
     * - Si no hay reservas, retorna 0
     */
    getTotalRevenue() {
        if (this.reservations.length === 0) return 0
        return this.reservations.reduce((acumulador, room) => {
            const cuarto = this.findRoom(room.roomNumber)
            return acumulador + (cuarto.getPricePerNight() * room.getDuration())
        }, 0)


    }

    /**
     * Calcula la tasa de ocupación para una fecha específica.
     * Traducción: Obtener Tasa de Ocupación
     *
     * Este método calcula qué porcentaje de habitaciones están ocupadas en una fecha específica.
     *
     * @param {Date} date - Fecha para la cual calcular la tasa de ocupación
     * @returns {number} Tasa de ocupación (0-100)
     *
     * TODO:
     * - Valida que date sea una instancia de Date
     * - Lanza error "Date must be a Date object" si es inválido
     * - Si no hay habitaciones, retorna 0
     * - Cuenta cuántas habitaciones tienen reservas activas en esa fecha
     * - Una reserva está activa en una fecha si: checkIn <= date < checkOut
     * - Calcula la tasa: (habitaciones ocupadas / total habitaciones) * 100
     * - Retorna la tasa con 2 decimales usando toFixed(2) y parseFloat()
     */
    getOccupancyRate(date) {
        if (!(date instanceof Date)) throw new Error("Date must be a Date object");
        if (this.rooms.length === 0) return 0
        const ocupadas = this.reservations.filter(room => room.checkIn <= date && date < room.checkOut)
        return parseFloat(((ocupadas.length / this.rooms.length) * 100).toFixed(2))



    }
}
// const room = new Room(12, 'cuarto', 1)
// const room2 = new Room(13, 'cuarto', 1)
// const room3 = new Room(14, 'cuarto', 1)
// const palace = new Hotel('Palace')
// palace.addRoom(room)
// palace.addRoom(room2)
// palace.addRoom(room3)
// console.log(palace.createReservation(12, 'armando', new Date('2026-08-10'), new Date('2026-08-30')), 'reservacion')
// console.log(palace.createReservation(13, 'samuel', new Date('2026-04-10'), new Date('2026-05-30')), 'reservacion')
// console.log(palace.createReservation(13, 'samuel', new Date('2026-06-10'), new Date('2026-06-30')), 'reservacion')
// console.log(palace.createReservation(13, 'rosa', new Date('2026-08-10'), new Date('2026-08-30')), 'reservacion')
// console.log(palace.getReservationsByGuest('samuel'), 'ultimo')
// console.log(palace.getTotalRevenue())
// console.log(palace)
// console.log('/////////////////////')
// console.log(palace.getOccupancyRate(new Date('2026-08-11')))






module.exports = {
    Room,
    Reservation,
    Hotel
};