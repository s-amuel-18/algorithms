/**
 * Sistema de Reservas de Sala (Room Booking System)
 *
 * Descripción: Implementa dos clases básicas (`Room` y `BookingSystem`) para practicar
 * constructores, métodos de instancia, validaciones de lógica compleja (solapamientos temporales),
 * y cálculos sobre colecciones.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 * - Uso de métodos de arrays: find, filter, reduce, some
 */

/**
 * Representa una sala de reuniones individual.
 * Traducción: Sala
 * @class
 */
class Room {
    /**
     * Constructor de la clase Room
     * Traducción: Constructor de Sala
     *
     * Crea una nueva sala con nombre, capacidad y precio por hora.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {string} name - Nombre de la sala (no puede estar vacío)
     * @param {number} capacity - Capacidad de la sala (debe ser mayor que 0)
     * @param {number} pricePerHour - Precio por hora (debe ser mayor que 0)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Room name is required" si el nombre es inválido
     * - Valida que capacity sea un número mayor que 0
     * - Lanza error "Room capacity must be greater than 0" si la capacidad es inválida
     * - Valida que pricePerHour sea un número mayor que 0
     * - Lanza error "Room price per hour must be greater than 0" si el precio es inválido
     * - Asigna los valores validados a this.name, this.capacity, this.pricePerHour
     */
    constructor(name, capacity, pricePerHour) {
        if (!(typeof name === 'string')) throw new Error('Room name is required')
        if (name.trim() === '') throw new Error('Room name is required')

        if (!(capacity > 0)) throw new Error('Room capacity must be greater than 0')

        if (!(pricePerHour > 0)) throw new Error('RRoom price per hour must be greater than 0 ')




        this.name = name
        this.capacity = capacity
        this.pricePerHour = pricePerHour
    }
}

/**
 * Gestiona un sistema de reservas de salas.
 * Traducción: Sistema de Reservas
 * @class
 */
class BookingSystem {
    /**
     * Constructor de la clase BookingSystem
     * Traducción: Constructor de Sistema de Reservas
     *
     * Crea un nuevo sistema de reservas con arrays vacíos para salas y reservas.
     *
     * TODO:
     * - Inicializa this.rooms como un array vacío []
     * - Inicializa this.bookings como un array vacío []
     */
    rooms = []
    bookings = []
    constructor() {

    }

    /**
     * Agrega una nueva sala al sistema.
     * Traducción: Agregar Sala
     *
     * Este método crea una nueva instancia de Room y la agrega al sistema.
     * Debe validar que no exista ya una sala con el mismo nombre antes de agregarla.
     *
     * @param {string} name - Nombre de la sala
     * @param {number} capacity - Capacidad de la sala
     * @param {number} pricePerHour - Precio por hora
     * @returns {Room} La sala creada
     *
     * TODO:
     * - Usa findRoom() para verificar si ya existe una sala con ese nombre
     * - Si la sala existe, lanza un error con el mensaje: "Room already exists"
     * - Crea una nueva instancia de Room con los parámetros recibidos
     * - Agrega la sala al array this.rooms usando push()
     * - Retorna la sala creada
     */
    addRoom(name, capacity, pricePerHour) {
        const validationName = this.findRoom(name)
        if (validationName instanceof Object) throw new Error('Room already exists')

        const createRoom = new Room(name, capacity, pricePerHour)
        this.rooms.push(createRoom)

        return createRoom
    }

    /**
     * Busca una sala por su nombre usando find().
     * Traducción: Buscar Sala
     *
     * Este método busca una sala cuyo name coincida exactamente con el parámetro recibido.
     * La búsqueda es case-sensitive (distingue entre mayúsculas y minúsculas).
     *
     * @param {string} name - Nombre de la sala a buscar
     * @returns {Room|null} La sala encontrada o null si no existe
     *
     * TODO:
     * - Usa this.rooms.find() para buscar una sala cuyo name coincida exactamente
     * - Retorna la sala encontrada o null si no se encuentra
     */
    findRoom(name) {
        const validationName = this.rooms.find(element => element.name == name)

        if (validationName === undefined) return null
        else return validationName
    }

    /**
     * Reserva una sala en un horario específico.
     * Traducción: Reservar Sala
     *
     * Este método crea una reserva para una sala en un horario específico.
     * Debe validar que la sala exista, que los horarios sean válidos, y que no haya solapamientos.
     * El comportamiento esperado es que solo se pueda reservar si la sala está disponible en ese horario.
     *
     * @param {string} roomName - Nombre de la sala a reservar
     * @param {number} startTime - Hora de inicio (0-23)
     * @param {number} duration - Duración en horas (debe ser > 0)
     * @returns {Object} Objeto de reserva { roomName, startTime, duration, endTime }
     *
     * TODO:
     * - Usa findRoom() para buscar la sala por nombre
     * - Si no se encuentra, lanza un error con el mensaje: "Room not found"
     * - Valida que startTime esté entre 0 y 23 (inclusive)
     * - Si startTime es inválido, lanza un error: "Start time must be between 0 and 23"
     * - Valida que duration sea mayor que 0
     * - Si duration es inválido, lanza un error: "Duration must be greater than 0"
     * - Calcula endTime = startTime + duration
     * - Valida que endTime <= 24
     * - Si endTime > 24, lanza un error: "Booking extends beyond 24 hours"
     * - Valida que no haya solapamientos: busca en this.bookings si hay alguna reserva para la misma sala
     *   que se solape con el horario solicitado (startTime < existingEndTime && endTime > existingStartTime)
     * - Si hay solapamiento, lanza un error: "Room is already booked at this time"
     * - Crea un objeto de reserva: { roomName, startTime, duration, endTime }
     * - Agrega la reserva al array this.bookings usando push()
     * - Retorna el objeto de reserva creado
     */
    bookRoom(roomName, startTime, duration) {
        const validationRoom = this.findRoom(roomName)
        if (validationRoom === null) throw new Error('Room not found')

        if (!(startTime >= 0 && startTime <= 23)) throw new Error('Start time must be between 0 and 23')

        if (!(duration > 0)) throw new Error('Duration must be greater than 0')


        const endTime = startTime + duration
        if (endTime > 24) throw new Error('Booking extends beyond 24 hours')

        const existingRoom = this.bookings.find(objet => objet.roomName == roomName)
        if (existingRoom) {
            const existingStartTime = existingRoom.startTime
            const exexistingEndTime = existingRoom.endTime

            if (exexistingEndTime > startTime && existingStartTime < endTime) throw new Error('Room is already booked at this time')

        }

        const reserva = { roomName, startTime, duration, endTime }
        this.bookings.push(reserva)
        return reserva


    }

    /**
     * Obtiene todas las salas disponibles en un horario específico usando filter().
     * Traducción: Obtener Salas Disponibles
     *
     * Este método retorna un nuevo array con todas las salas que NO tienen reservas
     * que se solapen con el horario solicitado. Debe usar el método filter() del array.
     *
     * @param {number} startTime - Hora de inicio (0-23)
     * @param {number} duration - Duración en horas
     * @returns {Room[]} Array con las salas disponibles en ese horario
     *
     * TODO:
     * - Calcula endTime = startTime + duration
     * - Usa this.rooms.filter() para filtrar salas
     * - Para cada sala, verifica si tiene reservas que se solapen con el horario solicitado
     * - Una sala está disponible si NO tiene reservas que se solapen
     * - Dos reservas se solapan si: (startTime < existingEndTime) && (endTime > existingStartTime)
     * - Retorna el nuevo array filtrado
     */
    getAvailableRooms(startTime, duration) {
        const endTime = startTime + duration
        const filterRooms = this.rooms.filter(salas => salas.name)
        const reservas = []

        for (let validationroom of filterRooms) {
            let name = validationroom.name
            let countSolapa = 0


            for (let check of this.bookings) {
                const nameRoom = check.roomName
                const objetBooking = check
                if (name === nameRoom) {
                    const existingEndTime = objetBooking.endTime
                    const existingStartTime = objetBooking.startTime
                    if (startTime < existingEndTime && endTime > existingStartTime) countSolapa++
                }
                console.log(countSolapa, 'chequeo tiempo')
            }
            if (countSolapa === 0) reservas.push(validationroom)
        }

        return reservas

    }

    /**
     * Cancela una reserva específica.
     * Traducción: Cancelar Reserva
     *
     * Este método elimina una reserva que coincida exactamente con el nombre de la sala
     * y la hora de inicio. El comportamiento esperado es que la reserva se elimine del array.
     *
     * @param {string} roomName - Nombre de la sala
     * @param {number} startTime - Hora de inicio de la reserva a cancelar
     * @returns {boolean} true si se canceló correctamente
     *
     * TODO:
     * - Busca la reserva en this.bookings que coincida exactamente con roomName y startTime
     * - Si no se encuentra, lanza un error con el mensaje: "Booking not found"
     * - Elimina la reserva del array this.bookings (puedes usar findIndex() y splice(), o filter())
     * - Retorna true si se canceló correctamente
     */
    cancelBooking(roomName, startTime) {
        const findBooking = this.bookings.find((name) => name.roomName === roomName && name.startTime === startTime)
        if (findBooking === undefined) throw new Error('Booking not found')

        const arryFixed = this.bookings.findIndex(name => name.roomName === roomName && name.startTime === startTime)
        this.bookings.splice(arryFixed, 1)
        return true
    }

    /**
     * Calcula los ingresos de una sala específica usando reduce().
     * Traducción: Obtener Ingresos de Sala
     *
     * Este método calcula los ingresos totales de una sala sumando (precio por hora × duración)
     * de todas sus reservas. Debe usar el método reduce() del array.
     *
     * @param {string} roomName - Nombre de la sala
     * @returns {number} Total de ingresos de esa sala
     *
     * TODO:
     * - Usa findRoom() para buscar la sala por nombre
     * - Si no se encuentra, lanza un error con el mensaje: "Room not found"
     * - Filtra las reservas de esa sala usando filter() sobre this.bookings
     * - Usa reduce() sobre las reservas filtradas para calcular el total
     * - Para cada reserva, suma (room.pricePerHour * booking.duration) al acumulador
     * - Retorna el total de ingresos
     */
    getRoomRevenue(roomName) {
        const findRoom = this.findRoom(roomName)
        if (findRoom === null) throw new Error('Room not found')

        const filterReservas = this.bookings.filter(reservas => reservas.roomName === roomName)
        const totalHours = filterReservas.reduce((b, a) => b += (a.duration), 0)
        const totalPay = findRoom.pricePerHour * totalHours

        return totalPay
    }

    /**
     * Calcula los ingresos totales del sistema usando reduce().
     * Traducción: Obtener Ingresos Totales
     *
     * Este método calcula los ingresos totales de todas las salas sumando todos los ingresos.
     * Debe usar el método reduce() del array.
     *
     * @returns {number} Total de ingresos de todas las salas
     *
     * TODO:
     * - Usa this.bookings.reduce() para calcular el total
     * - Para cada reserva, busca la sala usando findRoom(booking.roomName)
     * - Suma (room.pricePerHour * booking.duration) al acumulador
     * - Retorna el total de ingresos
     * - Si no hay reservas, ret oale
     * orna 0
     */
    getTotalRevenue() {
        // if (this.bookings.length === 0) return 0

        // const allPay = this.bookings.reduce((a, b) => {
        //     const room = this.findRoom(b.roomName)
        //     console.log(room)
        //     console.log(a, room.pricePerHour, b.duration, 'complejo')
        //     a + (room.pricePerHour * b.duration)
        //     console.log(a, room.pricePerHour, b.duration, 'complejo')
        // }, 0)

        // return allPay

        return this.bookings.reduce((total, booking) => {
            // Busca la sala para obtener su precio por hora
            const room = this.findRoom(booking.roomName);

            // Suma (precio por hora × duración) al total
            return total + (room.pricePerHour * booking.duration);
        }, 0);


    }

    /**
     * Obtiene todas las reservas de una sala específica usando filter().
     * Traducción: Obtener Reservas por Sala
     *
     * Este método retorna un nuevo array con todas las reservas de la sala especificada.
     * Debe usar el método filter() del array.
     *
     * @param {string} roomName - Nombre de la sala
     * @returns {Object[]} Array con las reservas de esa sala
     *
     * TODO:
     * - Usa this.bookings.filter() para filtrar reservas
     * - Filtra reservas donde booking.roomName === roomName
     * - Retorna el nuevo array filtrado
     */
    getBookingsByRoom(roomName) {
        const allRoomByName = this.bookings.filter(reservas => reservas.roomName === roomName)
        return allRoomByName
    }
}

const viaje1 = new BookingSystem()
viaje1.addRoom('cocina', 5, 22)
viaje1.addRoom('terraza', 5, 22)

viaje1.bookRoom('terraza', 20, 2)
viaje1.bookRoom('cocina', 1, 1)
viaje1.bookRoom('cocina', 4, 1)
viaje1.bookRoom('cocina', 7, 1)
viaje1.bookRoom('cocina', 12, 1)

console.log(viaje1, ' viaje 1')
console.log(viaje1.getTotalRevenue(), 'chequeo')
console.log(viaje1.getBookingsByRoom('cocina'))






module.exports = {
    Room,
    BookingSystem
};

