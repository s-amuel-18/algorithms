/**
* Sistema de Gestión de Cine (Cinema Management System)
*
* Descripción: Implementa tres clases básicas (`Movie`, `Screening` y `Cinema`) para practicar
* constructores, métodos de instancia, validaciones complejas, gestión de capacidad de salas,
* cálculos de ingresos y relaciones entre múltiples clases.
* Dificultad: BEGINNER
*
* Principios sugeridos:
* - KISS: mantener el código simple y expresivo
* - Validaciones Fail Fast: validar antes de continuar
* - Responsabilidad Única: cada clase tiene un propósito claro
* - Uso de métodos de arrays: find, filter, reduce
*/

/**
 * Representa una película.
 * Traducción: Película
 * @class
 */
class Movie {
    /**
     * Constructor de la clase Movie
     * Traducción: Constructor de Película
     *
     * Crea una nueva película con título, duración, género y clasificación.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {string} title - Título de la película (no puede estar vacío)
     * @param {number} duration - Duración en minutos (debe ser mayor que 0)
     * @param {string} genre - Género de la película (no puede estar vacío)
     * @param {string} rating - Clasificación (no puede estar vacío)
     *
     * TODO:
     * - Valida que title sea un string no vacío (después de trim)
     * - Lanza error "Movie title is required" si el título es inválido
     * - Valida que duration sea un número mayor que 0
     * - Lanza error "Movie duration must be greater than 0" si la duración es inválida
     * - Valida que genre sea un string no vacío (después de trim)
     * - Lanza error "Movie genre is required" si el género es inválido
     * - Valida que rating sea un string no vacío (después de trim)
     * - Lanza error "Movie rating is required" si la clasificación es inválida
     * - Asigna los valores validados a las propiedades correspondientes
     */
    constructor(title, duration, genre, rating) {
        if (title.trim() === '' || typeof title !== 'string') throw new Error('Movie title is required')
        if (duration <= 0) throw new Error('Movie duration must be greater than 0')
        if (genre.trim() === '' || typeof genre !== 'string') throw new Error('Movie genre is required')
        if (rating.trim() === '' || typeof rating !== 'string') throw new Error('Movie rating is required')

        this.title = title
        this.duration = duration
        this.genre = genre
        this.rating = rating

    }

    /**
     * Obtiene la duración de la película en minutos.
     * Traducción: Obtener Duración
     *
     * @returns {number} Duración en minutos
     *
     * TODO:
     * - Retorna this.duration
     */
    getDuration() {
        return this.duration
    }

    /**
     * Obtiene el género de la película.
     * Traducción: Obtener Género
     *
     * @returns {string} Género de la película
     *
     * TODO:
     * - Retorna this.genre
     */
    getGenre() {
        return this.genre
    }

    /**
     * Obtiene la clasificación de la película.
     * Traducción: Obtener Clasificación
     *
     * @returns {string} Clasificación de la película
     *
     * TODO:
     * - Retorna this.rating
     */
    getRating() {
        return this.rating
    }
}

/**
 * Representa una proyección de una película.
 * Traducción: Proyección
 * @class
 */
class Screening {
    /**
     * Constructor de la clase Screening
     * Traducción: Constructor de Proyección
     *
     * Crea una nueva proyección con película, sala, hora de inicio y precio del boleto.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {Movie} movie - Instancia de Movie
     * @param {string} room - Nombre de la sala (no puede estar vacío)
     * @param {Date} startTime - Hora de inicio de la proyección (debe ser una instancia de Date)
     * @param {number} ticketPrice - Precio del boleto (debe ser mayor que 0)
     *
     * TODO:
     * - Valida que movie sea una instancia de Movie
     * - Lanza error "Movie must be an instance of Movie" si es inválido
     * - Valida que room sea un string no vacío (después de trim)
     * - Lanza error "Room name is required" si el nombre es inválido
     * - Valida que startTime sea una instancia de Date
     * - Lanza error "Start time must be a Date object" si la fecha es inválida
     * - Valida que ticketPrice sea un número mayor que 0
     * - Lanza error "Ticket price must be greater than 0" si el precio es inválido
     * - Inicializa this.ticketsSold como 0
     * - Asigna los valores validados a las propiedades correspondientes
     */
    constructor(movie, room, startTime, ticketPrice) {
        if (!(movie instanceof Movie)) throw new Error('Movie must be an instance of Movie')
        if (room.trim() === '' || typeof room !== 'string') throw new Error('Room name is required')
        if (!(startTime instanceof Date)) throw new Error('Start time must be a Date object')
        if (ticketPrice <= 0) throw new Error('Ticket price must be greater than 0')

        this.ticketsSold = 0
        this.movie = movie
        this.room = room
        this.startTime = startTime
        this.ticketPrice = ticketPrice
    }

    /**
     * Calcula los asientos disponibles.
     * Traducción: Obtener Asientos Disponibles
     *
     * Este método calcula cuántos asientos están disponibles restando los boletos vendidos
     * de la capacidad total de la sala. La capacidad se obtiene del cine.
     *
     * @param {Cinema} cinema - Instancia de Cinema que contiene la capacidad de la sala
     * @returns {number} Número de asientos disponibles
     *
     * TODO:
     * - Valida que cinema sea una instancia de Cinema
     * - Lanza error "Cinema must be an instance of Cinema" si es inválido
     * - Obtiene la capacidad de la sala usando cinema.getRoomCapacity(this.room)
     * - Calcula asientos disponibles: capacidad - this.ticketsSold
     * - Retorna el número de asientos disponibles (no puede ser negativo, retorna 0 si es negativo)
     */
    getAvailableSeats(cinema) {
        if (!(cinema instanceof Cinema)) throw new Error('Cinema must be an instance of Cinema')
        const espacio = cinema.getRoomCapacity(this.room) - this.ticketsSold
        if (espacio < 0) return 0
        else return espacio


    }

    /**
     * Vende boletos para esta proyección.
     * Traducción: Vender Boletos
     *
     * Este método vende la cantidad especificada de boletos, validando que haya asientos disponibles.
     *
     * @param {Cinema} cinema - Instancia de Cinema
     * @param {number} quantity - Cantidad de boletos a vender (debe ser mayor que 0)
     * @returns {number} Número de boletos vendidos
     *
     * TODO:
     * - Valida que quantity sea un número mayor que 0
     * - Lanza error "Quantity must be greater than 0" si la cantidad es inválida
     * - Obtiene los asientos disponibles usando getAvailableSeats(cinema)
     * - Valida que haya suficientes asientos disponibles
     * - Lanza error "Not enough seats available" si no hay suficientes asientos
     * - Incrementa this.ticketsSold con la cantidad vendida
     * - Retorna la cantidad de boletos vendidos
     */
    sellTickets(cinema, quantity) {
        if (quantity <= 0) throw new Error('Quantity must be greater than 0')
        const espacios = this.getAvailableSeats(cinema)
        console.log(espacios)
        if (espacios <= 0 || quantity > espacios) throw new Error('Not enough seats available')
        this.ticketsSold += quantity
        return this.ticketsSold

    }

    /**
     * Calcula los ingresos de esta proyección.
     * Traducción: Obtener Ingresos
     *
     * Este método calcula los ingresos totales multiplicando el precio del boleto por los boletos vendidos.
     *
     * @returns {number} Ingresos totales de la proyección
     *
     * TODO:
     * - Calcula ingresos: this.ticketPrice * this.ticketsSold
     * - Retorna el total de ingresos
     */
    getRevenue() {
        return this.ticketPrice * this.ticketsSold
    }

    /**
     * Verifica si la proyección está llena.
     * Traducción: Verificar si está Llena
     *
     * Este método verifica si todos los asientos están ocupados.
     *
     * @param {Cinema} cinema - Instancia de Cinema
     * @returns {boolean} true si está llena, false si hay asientos disponibles
     *
     * TODO:
     * - Obtiene los asientos disponibles usando getAvailableSeats(cinema)
     * - Retorna true si los asientos disponibles son 0, false en caso contrario
     */
    isFull(cinema) {
        const full = this.getAvailableSeats(cinema)
        if (full === 0) return true
        else return false
    }

    /**
     * Calcula la hora de finalización de la proyección.
     * Traducción: Obtener Hora de Finalización
     *
     * Este método calcula la hora de finalización sumando la duración de la película a la hora de inicio.
     *
     * @returns {Date} Hora de finalización de la proyección
     *
     * TODO:
     * - Crea una nueva fecha basada en this.startTime
     * - Suma la duración de la película (en minutos) a la hora de inicio
     * - Usa setMinutes() para agregar los minutos
     * - Retorna la fecha de finalización
     */
    getEndTime() {
        const inicio = new Date(this.startTime)
        console.log(inicio)
        const final = inicio.getMinutes() + this.movie.duration
        inicio.setMinutes(final)
        return inicio
    }
}

/**
 * Gestiona el cine y sus operaciones.
 * Traducción: Cine
 * @class
 */
class Cinema {
    /**
     * Constructor de la clase Cinema
     * Traducción: Constructor de Cine
     *
     * Crea un nuevo cine con nombre y capacidad total de asientos.
     * Inicializa arrays vacíos para películas y proyecciones.
     *
     * @param {string} name - Nombre del cine (no puede estar vacío)
     * @param {number} totalSeats - Capacidad total de asientos (debe ser mayor que 0)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Cinema name is required" si el nombre es inválido
     * - Valida que totalSeats sea un número mayor que 0
     * - Lanza error "Total seats must be greater than 0" si la capacidad es inválida
     * - Inicializa this.movies como un array vacío []
     * - Inicializa this.screenings como un array vacío []
     * - Inicializa this.roomCapacities como un objeto vacío {}
     * - Asigna los valores validados a this.name y this.totalSeats
     */
    constructor(name, totalSeats) {
        if (name.trim() === '' || typeof name !== 'string') throw new Error('Cinema name is required')
        if (totalSeats <= 0) throw new Error('Total seats must be greater than 0')

        this.movies = []
        this.screenings = []
        this.roomCapacities = {}
        this.name = name
        this.totalSeats = totalSeats
    }

    /**
     * Agrega una película al cine.
     * Traducción: Agregar Película
     *
     * Este método agrega una película al cine. Debe validar que sea una instancia de Movie.
     *
     * @param {Movie} movie - Instancia de Movie a agregar
     * @returns {Movie} La película agregada
     *
     * TODO:
     * - Valida que movie sea una instancia de Movie
     * - Lanza error "Movie must be an instance of Movie" si es inválido
     * - Agrega la película al array this.movies usando push()
     * - Retorna la película agregada
     */
    addMovie(movie) {
        if (!(movie instanceof Movie)) throw new Error('Movie must be an instance of Movie')
        this.movies.push(movie)
        return movie
    }

    /**
     * Establece la capacidad de una sala específica.
     * Traducción: Establecer Capacidad de Sala
     *
     * Este método establece cuántos asientos tiene una sala específica.
     *
     * @param {string} roomName - Nombre de la sala
     * @param {number} capacity - Capacidad de la sala (debe ser mayor que 0)
     * @returns {boolean} true si se estableció correctamente
     *
     * TODO:
     * - Valida que roomName sea un string no vacío
     * - Lanza error "Room name is required" si el nombre es inválido
     * - Valida que capacity sea un número mayor que 0
     * - Lanza error "Room capacity must be greater than 0" si la capacidad es inválida
     * - Almacena la capacidad en this.roomCapacities[roomName] = capacity
     * - Retorna true
     */
    setRoomCapacity(roomName, capacity) {
        if (roomName.trim() === '' || typeof roomName !== 'string') throw new Error('Room name is required')
        if (capacity <= 0) throw new Error('Room capacity must be greater than 0')
        this.roomCapacities[roomName] = capacity
        return true
    }

    /**
     * Obtiene la capacidad de una sala específica.
     * Traducción: Obtener Capacidad de Sala
     *
     * Este método retorna la capacidad de una sala. Si la sala no existe, retorna 0.
     *
     * @param {string} roomName - Nombre de la sala
     * @returns {number} Capacidad de la sala o 0 si no existe
     *
     * TODO:
     * - Retorna this.roomCapacities[roomName] si existe, o 0 si no existe
     */
    getRoomCapacity(roomName) {
        if (Object.keys(this.roomCapacities).includes(roomName)) {
            return this.roomCapacities[roomName]

        } else return 0


    }

    /**
     * Crea una nueva proyección.
     * Traducción: Crear Proyección
     *
     * Este método crea una nueva proyección y la agrega al cine.
     *
     * @param {Movie} movie - Instancia de Movie
     * @param {string} room - Nombre de la sala
     * @param {Date} startTime - Hora de inicio
     * @param {number} ticketPrice - Precio del boleto
     * @returns {Screening} La proyección creada
     *
     * TODO:
     * - Crea una nueva instancia de Screening con los parámetros recibidos
     * - Agrega la proyección al array this.screenings usando push()
     * - Retorna la proyección creada
     */
    createScreening(movie, room, startTime, ticketPrice) {
        const newScreening = new Screening(movie, room, startTime, ticketPrice)
        this.screenings.push(newScreening)
        return newScreening
    }

    /**
     * Obtiene todas las proyecciones de una película específica usando filter().
     * Traducción: Obtener Proyecciones por Película
     *
     * Este método retorna un nuevo array con todas las proyecciones de la película especificada.
     * Debe usar el método filter() del array.
     *
     * @param {string} movieTitle - Título de la película
     * @returns {Screening[]} Array con las proyecciones de esa película
     *
     * TODO:
     * - Usa this.screenings.filter() para filtrar proyecciones
     * - Filtra proyecciones donde screening.movie.title === movieTitle
     * - Retorna el nuevo array filtrado
     */
    getScreeningsByMovie(movieTitle) {
        const proyecciones = this.screenings.filter(pro => pro.movie.title === movieTitle)
        return proyecciones
    }

    /**
     * Obtiene todas las proyecciones de una fecha específica usando filter().
     * Traducción: Obtener Proyecciones por Fecha
     *
     * Este método retorna un nuevo array con todas las proyecciones del día especificado.
     * Debe usar el método filter() del array.
     *
     * @param {Date} date - Fecha para la cual obtener las proyecciones
     * @returns {Screening[]} Array con las proyecciones de ese día
     *
     * TODO:
     * - Valida que date sea una instancia de Date
     * - Lanza error "Date must be a Date object" si es inválido
     * - Usa this.screenings.filter() para filtrar proyecciones
     * - Compara año, mes y día de screening.startTime con la fecha proporcionada
     * - Retorna el nuevo array filtrado
     */
    getScreeningsByDate(date) {
        if (!(date instanceof Date)) throw new Error('Date must be a Date object')
        console.log(date)

        return this.screenings.filter(pro => pro.startTime.getDate() - 1 === date.getDate() && pro.startTime.getMonth() === date.getMonth() && pro.startTime.getFullYear() === date.getFullYear())
    }

    /**
     * Calcula los ingresos totales del cine usando reduce().
     * Traducción: Obtener Ingresos Totales
     *
     * Este método calcula los ingresos totales sumando los ingresos de todas las proyecciones.
     * Debe usar el método reduce() del array.
     *
     * @returns {number} Total de ingresos
     *
     * TODO:
     * - Usa this.screenings.reduce() para calcular el total
     * - Para cada proyección, suma screening.getRevenue() al acumulador
     * - Retorna el total de ingresos
     * - Si no hay proyecciones, retorna 0
     */
    getTotalRevenue() {
        if (this.screenings.length === 0) return 0
        return this.screenings.reduce((contador, pago) => {
            return contador + (pago.getRevenue())
        }, 0)
    }

    /**
     * Obtiene la película más vendida.
     * Traducción: Obtener Película Más Vendida
     *
     * Este método encuentra la película que ha vendido más boletos en total.
     *
     * @returns {string|null} Título de la película más vendida o null si no hay proyecciones
     *
     * TODO:
     * - Si no hay proyecciones, retorna null
     * - Agrupa las proyecciones por película y suma los boletos vendidos
     * - Encuentra la película con más boletos vendidos
     * - Retorna el título de esa película
     * - Si hay empate, retorna la primera encontrada
     */
    getMostPopularMovie() {
        if (this.screenings.length === 0) return null
        let count = 0
        let nameMovie = ''
        for (let sold of this.screenings) {
            if (sold.ticketsSold > count) {
                count = sold.ticketsSold
                nameMovie = sold.movie.title
            }
        }

        return nameMovie
    }
}

const cinema = new Cinema('CineMax', 500);
const movie1 = new Movie('Avengers', 180, 'Action', 'PG-13');
const movie2 = new Movie('Titanic', 195, 'Drama', 'PG-13');
cinema.addMovie(movie1);
cinema.addMovie(movie2);
cinema.setRoomCapacity('Sala 1', 100);
const screening1 = cinema.createScreening(movie1, 'Sala 1', new Date(), 12.50);
const screening2 = cinema.createScreening(movie2, 'Sala 1', new Date(), 10.00);
screening1.sellTickets(cinema, 80); // Más boletos
screening2.sellTickets(cinema, 50);
console.log(screening1)
console.log(screening2)
console.log(cinema)
console.log(cinema.getMostPopularMovie())

module.exports = {
    Movie,
    Screening,
    Cinema
};

