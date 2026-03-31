/**
 * Sistema de Gestión de Eventos y Calendario (Event Calendar Management System)
 *
 * Descripción: Implementa dos clases básicas (`Event` y `Calendar`) para practicar
 * constructores, métodos de instancia, validaciones complejas, manejo de fechas,
 * detección de conflictos de horarios y búsqueda avanzada de eventos.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 * - Responsabilidad Única: cada clase tiene un propósito claro
 * - Uso de métodos de arrays: find, filter, reduce, some
 */

/**
 * Representa un evento en el calendario.
 * Traducción: Evento
 * @class
 */
class Event {
    /**
     * Constructor de la clase Event
     * Traducción: Constructor de Evento
     *
     * Crea un nuevo evento con título, descripción, horarios y categoría.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {string} title - Título del evento (no puede estar vacío)
     * @param {string} description - Descripción del evento (no puede estar vacío)
     * @param {Date} startTime - Fecha y hora de inicio (debe ser instancia de Date)
     * @param {Date} endTime - Fecha y hora de fin (debe ser instancia de Date y posterior a startTime)
     * @param {string} category - Categoría del evento (no puede estar vacío)
     *
     * TODO:
     * - Valida que title sea un string no vacío (después de trim)
     * - Lanza error "Event title is required" si el título es inválido
     * - Valida que description sea un string no vacío (después de trim)
     * - Lanza error "Event description is required" si la descripción es inválida
     * - Valida que startTime sea una instancia de Date
     * - Lanza error "Start time must be a Date object" si startTime es inválido
     * - Valida que endTime sea una instancia de Date
     * - Lanza error "End time must be a Date object" si endTime es inválido
     * - Valida que endTime sea posterior a startTime
     * - Si endTime es igual a startTime (mismo timestamp), ajusta endTime para que sea 1 hora después
     * - Si endTime es anterior a startTime, lanza error "End time must be after start time"
     * - Valida que category sea un string no vacío (después de trim)
     * - Lanza error "Event category is required" si la categoría es inválida
     * - Asigna los valores validados a las propiedades correspondientes (usando trim para strings)
     */
    constructor(title, description, startTime, endTime, category) {
        if (title.trim() === '' && typeof title === 'string') throw new Error("Event title is required");
        if (description.trim() === '' && typeof description === 'string') throw new Error("Event description is required");
        if (!(startTime instanceof Date)) throw new Error("Start time must be a Date object");
        if (!(endTime instanceof Date)) throw new Error("End time must be a Date object");
        if (endTime.getTime() < startTime.getTime()) throw new Error("End time must be after start time");
        if (endTime.getTime() === startTime.getTime()) endTime.setHours(endTime.getHours() + 1)
        if (category.trim() === '' && typeof category === 'string') throw new Error("Event category is required");

        this.title = title
        this.description = description
        this.startTime = startTime
        this.endTime = endTime
        this.category = category
    }

    /**
     * Calcula la duración del evento en horas.
     * Traducción: Obtener Duración
     *
     * @returns {number} Duración en horas con 2 decimales
     *
     * TODO:
     * - Calcula la diferencia en milisegundos: this.endTime - this.startTime
     * - Convierte a horas dividiendo por (1000 * 60 * 60)
     * - Usa toFixed(2) para redondear a 2 decimales
     * - Convierte el resultado a número con parseFloat()
     * - Retorna el resultado
     */
    getDuration() {
        const hours = parseFloat(((this.endTime.getTime() - this.startTime.getTime()) / (1000 * 60 * 60)).toFixed(2))
        return hours
    }

    /**
     * Verifica si el evento es de todo el día (24 horas).
     * Traducción: Es Todo el Día
     *
     * @returns {boolean} true si la duración es exactamente 24 horas
     *
     * TODO:
     * - Usa getDuration() para obtener la duración
     * - Retorna true si la duración es exactamente 24.00
     * - Retorna false en caso contrario
     */
    isAllDay() {
        if (this.getDuration() === 24) return true
        else return false
    }

    /**
     * Obtiene la categoría del evento.
     * Traducción: Obtener Categoría
     *
     * @returns {string} Categoría del evento
     *
     * TODO:
     * - Retorna this.category
     */
    getCategory() {
        return this.category
    }

    /**
     * Actualiza el horario del evento.
     * Traducción: Actualizar Tiempo
     *
     * @param {Date} newStartTime - Nueva fecha y hora de inicio
     * @param {Date} newEndTime - Nueva fecha y hora de fin
     * @returns {boolean} true si se actualizó correctamente
     *
     * TODO:
     * - Valida que newStartTime sea una instancia de Date
     * - Lanza error "Start time must be a Date object" si es inválido
     * - Valida que newEndTime sea una instancia de Date
     * - Lanza error "End time must be a Date object" si es inválido
     * - Valida que newEndTime sea posterior a newStartTime
     * - Lanza error "End time must be after start time" si es inválido
     * - Actualiza this.startTime y this.endTime con los nuevos valores
     * - Retorna true
     */
    updateTime(newStartTime, newEndTime) {
        if (!(newStartTime instanceof Date)) throw new Error("Start time must be a Date object");
        if (!(newEndTime instanceof Date)) throw new Error("End time must be a Date object");
        if (newEndTime.getTime() < newStartTime.getTime()) throw new Error("End time must be after start time");
        this.startTime = newStartTime
        this.endTime = newEndTime
        return true
    }

    /**
     * Verifica si este evento se solapa con otro evento.
     * Traducción: Se Solapa Con
     *
     * Dos eventos se solapan si sus horarios se superponen.
     * Fórmula: (start1 < end2) && (end1 > start2)
     *
     * @param {Event} otherEvent - Otro evento para comparar
     * @returns {boolean} true si se solapan
     *
     * TODO:
     * - Valida que otherEvent sea una instancia de Event
     * - Lanza error "Other event must be an instance of Event" si es inválido
     * - Verifica solapamiento usando la fórmula: (this.startTime < otherEvent.endTime) && (this.endTime > otherEvent.startTime)
     * - Retorna true si se solapan, false en caso contrario
     */
    overlapsWith(otherEvent) {
        if (!(otherEvent instanceof Event)) throw new Error('Other event must be an instance of Event')
        if (this.startTime < otherEvent.endTime && this.endTime > otherEvent.startTime) return true
        else return false
    }
}

/**
 * Gestiona un calendario de eventos.
 * Traducción: Calendario
 * @class
 */
class Calendar {
    /**
     * Constructor de la clase Calendar
     * Traducción: Constructor de Calendario
     *
     * Crea un nuevo calendario con el nombre del dueño.
     *
     * @param {string} ownerName - Nombre del dueño del calendario (no puede estar vacío)
     *
     * TODO:
     * - Valida que ownerName sea un string no vacío (después de trim)
     * - Lanza error "Owner name is required" si el nombre es inválido
     * - Asigna this.ownerName con el nombre validado (usando trim)
     * - Inicializa this.events como un array vacío
     */
    constructor(ownerName) {
        if (ownerName.trim() === '' || typeof ownerName !== 'string') throw new Error("Owner name is required");
        this.ownerName = ownerName.trim()
        this.events = []

    }

    /**
     * Agrega un evento al calendario.
     * Traducción: Agregar Evento
     *
     * Valida que no haya conflictos con eventos existentes antes de agregar.
     *
     * @param {Event} event - Evento a agregar
     * @returns {Event} El evento agregado
     *
     * TODO:
     * - Valida que event sea una instancia de Event
     * - Lanza error "Event must be an instance of Event" si es inválido
     * - Verifica si el evento ya está en el array usando indexOf()
     * - Si ya está en el array, retorna el evento (sin agregarlo nuevamente)
     * - Verifica conflictos con eventos existentes usando some()
     *   - Si las fechas de inicio son muy cercanas (menos de 1 segundo), no hay conflicto
     *   - Usa overlapsWith() para verificar solapamiento con cada evento existente
     * - Si hay conflicto, lanza error "Event conflicts with existing event"
     * - Agrega el evento al array usando push()
     * - Retorna el evento agregado
     */
    addEvent(event) {
        if (!(event instanceof Event)) throw new Error("Event must be an instance of Event");
        if (this.events.indexOf(a => a.title === event.title) !== -1) return event
        // console.log(this.events.some(event => event.overlapsWith(event)), 'chequeos')
        if (this.events.some(element => element.overlapsWith(event))) throw new Error("Event conflicts with existing event");
        else this.events.push(event)

        return event
    }

    /**
     * Elimina un evento del calendario.
     * Traducción: Eliminar Evento
     *
     * @param {Event} event - Evento a eliminar
     * @returns {boolean} true si se eliminó, false si no se encontró
     *
     * TODO:
     * - Encuentra el índice del evento usando findIndex()
     * - Si no se encuentra (índice === -1), retorna false
     * - Elimina el evento del array usando splice()
     * - Retorna true
     */
    removeEvent(event) {
        const find = this.events.findIndex(eve => eve.title === event.title && eve.startTime.getTime() === event.startTime.getTime())
        if (find === -1) return false
        this.events.splice(find, 1)
        return true
    }

    /**
     * Busca un evento por índice.
     * Traducción: Buscar Evento
     *
     * @param {number} eventIndex - Índice del evento en el array
     * @returns {Event|null} El evento encontrado o null si el índice es inválido
     *
     * TODO:
     * - Valida que eventIndex sea un número válido (>= 0 y < this.events.length)
     * - Si el índice es inválido, retorna null
     * - Retorna el evento en el índice especificado
     */
    findEvent(eventIndex) {
        if (eventIndex >= 0 && eventIndex < this.events.length) return this.events[eventIndex]
        else return null
    }

    /**
     * Obtiene todos los eventos de una fecha específica.
     * Traducción: Obtener Eventos por Fecha
     *
     * @param {Date} date - Fecha para buscar eventos
     * @returns {Array<Event>} Array de eventos del día especificado
     *
     * TODO:
     * - Valida que date sea una instancia de Date
     * - Lanza error "Date must be a Date object" si es inválido
     * - Normaliza la fecha de búsqueda usando UTC (getUTCFullYear, getUTCMonth, getUTCDate)
     * - Usa filter() para obtener eventos del día especificado
     *   - Compara año, mes y día usando métodos UTC del evento.startTime
     * - Retorna el array filtrado
     */
    getEventsByDate(date) {
        if (!(date instanceof Date)) throw new Error("Date must be a Date object");
        return this.events.filter(eve => eve.startTime.getUTCFullYear() === date.getUTCFullYear() && eve.startTime.getUTCMonth() === date.getUTCMonth() && eve.startTime.getUTCDate() === date.getUTCDate())




    }

    /**
     * Obtiene todos los eventos de una categoría específica.
     * Traducción: Obtener Eventos por Categoría
     *
     * @param {string} category - Categoría para filtrar
     * @returns {Array<Event>} Array de eventos de la categoría especificada
     *
     * TODO:
     * - Usa filter() para obtener eventos de la categoría especificada
     * - Usa getCategory() para obtener la categoría de cada evento
     * - Retorna el array filtrado
     */
    getEventsByCategory(category) {
        return this.events.filter(eve => eve.getCategory() === category)
    }

    /**
     * Obtiene todos los eventos en un rango de fechas.
     * Traducción: Obtener Eventos por Rango de Fechas
     *
     * @param {Date} startDate - Fecha de inicio del rango
     * @param {Date} endDate - Fecha de fin del rango
     * @returns {Array<Event>} Array de eventos en el rango especificado
     *
     * TODO:
     * - Valida que startDate sea una instancia de Date
     * - Lanza error "Start date must be a Date object" si es inválido
     * - Valida que endDate sea una instancia de Date
     * - Lanza error "End date must be a Date object" si es inválido
     * - Usa filter() para obtener eventos en el rango
     *   - Un evento está en el rango si: event.startTime >= startDate && event.startTime <= endDate
     * - Retorna el array filtrado
     */
    getEventsByDateRange(startDate, endDate) {
        if (!(startDate instanceof Date)) throw new Error("Start date must be a Date object");
        if (!(endDate instanceof Date)) throw new Error("End date must be a Date object");
        return this.events.filter(eve => startDate.getDate() < eve.startTime.getTime() && endDate.getTime() >= eve.endTime.getTime())
    }

    /**
     * Verifica si un evento tiene conflictos con eventos existentes.
     * Traducción: Tiene Conflicto
     *
     * @param {Event} event - Evento a verificar
     * @returns {boolean} true si hay conflicto
     *
     * TODO:
     * - Usa some() para verificar si algún evento se solapa
     * - Excluye el mismo evento si ya está en el array (comparar con ===)
     * - Si es el mismo objeto, retorna false (no hay conflicto consigo mismo)
     * - Usa overlapsWith() para verificar solapamiento con otros eventos
     * - Retorna true si hay conflicto, false en caso contrario
     */
    hasConflict(event) {
        return this.events.some(eve => {
            if (eve.title === event.title) return false
            if (eve.overlapsWith(event)) return true
            else return false
        })
    }

    /**
     * Obtiene eventos próximos en los próximos N días.
     * Traducción: Obtener Eventos Próximos
     *
     * @param {number} days - Número de días hacia adelante
     * @returns {Array<Event>} Array de eventos próximos
     *
     * TODO:
     * - Valida que days sea un número mayor que 0
     * - Lanza error "Days must be greater than 0" si es inválido
     * - Calcula la fecha de hoy usando new Date()
     * - Calcula la fecha límite sumando days días a la fecha de hoy
     * - Usa filter() para obtener eventos próximos
     *   - Un evento es próximo si: event.startTime >= today && event.startTime <= limitDate
     * - Retorna el array filtrado
     */
    getUpcomingEvents(days) {
        if (days <= 0) throw new Error("Days must be greater than 0");
        const today = new Date()
        const NextDays = new Date()
        NextDays.setDate(today.getDate() + days)

        return this.events.filter(eve => NextDays.getTime() >= eve.startTime.getTime() && eve.startTime.getTime() >= today.getTime())

    }

    /**
     * Obtiene un array de fechas que tienen eventos (días ocupados).
     * Traducción: Obtener Días Ocupados
     *
     * @returns {Array<Date>} Array de fechas únicas que tienen eventos
     *
     * TODO:
     * - Crea un Set para almacenar fechas únicas
     * - Itera sobre todos los eventos usando forEach()
     * - Para cada evento, crea una fecha con solo año, mes y día (sin hora)
     *   - Usa new Date(year, month, date) con getFullYear(), getMonth(), getDate()
     * - Agrega el timestamp de la fecha al Set (usando getTime())
     * - Convierte el Set a array usando Array.from()
     * - Mapea cada timestamp a una nueva Date
     * - Retorna el array de fechas
     */
    getBusyDays() {
        const fechasUnicas = new Set()
        this.events.forEach(eve => {
            // console.log(eve.startTime)

            const dateOnly = new Date(
                eve.startTime.getFullYear(),
                eve.startTime.getMonth(),
                eve.startTime.getDate()
            )
            // console.log(dateOnly)

            fechasUnicas.add(dateOnly.getTime())


        })
        console.log(fechasUnicas)
        return Array.from(fechasUnicas).map(eve => new Date(eve))
    }

    /**
     * Genera un resumen estadístico del calendario.
     * Traducción: Obtener Resumen del Calendario
     *
     * @returns {Object} Objeto con estadísticas del calendario
     *
     * TODO:
     * - Calcula totalEvents como this.events.length
     * - Calcula eventsByCategory usando reduce()
     *   - Agrupa eventos por categoría usando getCategory()
     *   - Retorna un objeto con categoría como clave y cantidad como valor
     * - Calcula upcomingEvents usando getUpcomingEvents(7).length
     * - Calcula busyDays usando getBusyDays().length
     * - Retorna objeto con: { totalEvents, eventsByCategory, upcomingEvents, busyDays }
     */
    getCalendarSummary() {
        const totalEvents = this.events.length
        const eventsByCategory = this.events.reduce((contador, eve) => {
            const category = eve.getCategory()
            contador[category] = (contador[category] || 0) + 1

            return contador
        }, {})
        const upcomingEvents = this.getUpcomingEvents(7).length
        const busyDays = this.getBusyDays().length

        return {
            totalEvents: totalEvents,
            eventsByCategory: eventsByCategory,
            upcomingEvents: upcomingEvents,
            busyDays: busyDays
        }
    }
}

// const event1 = new Event('cosas de la casa', 'una descripcion de pinga', new Date(), new Date(), 'alta')
// const event2 = new Event('segundo evento', 'evento 2', new Date('2026-01-01'), new Date('2026-01-02'), 'media')
// const event3 = new Event('segundo', 'evento 2', new Date('2026-02-10'), new Date('2026-10-02'), 'baja')
// console.log(event1.getDuration())
// console.log(event1.isAllDay())
// console.log(event1)

// const ArmandoCalendar = new Calendar('Armando')
// console.log(ArmandoCalendar.addEvent(event1))
// console.log(ArmandoCalendar.addEvent(event2))
// console.log(ArmandoCalendar.addEvent(event3))
// console.log(ArmandoCalendar.hasConflict(event3))
// console.log(ArmandoCalendar.getUpcomingEvents(5))
// console.log(ArmandoCalendar.getBusyDays())
// console.log('/////////////////')
// console.log('/////////////////')
// console.log('/////////////////')
// console.log('/////////////////')
// console.log(ArmandoCalendar.getCalendarSummary())

// const event = new Event('Test', 'Desc', new Date('2024-12-20T10:00:00'), new Date('2024-12-20T11:00:00'), 'Work');
// const newStart = new Date('2024-12-21T14:00:00');
// const newEnd = new Date('2024-12-21T15:00:00');
// const result = event.updateTime(newStart, newEnd);

const calendar = new Calendar('Juan Pérez');
const event1 = new Event('Evento 1', 'Desc', new Date('2026-10-10'), new Date('2026-10-11'), 'Work');
const event2 = new Event('Evento 2', 'Desc', new Date('2026-10-15'), new Date('2026-10-16'), 'Personal');
calendar.addEvent(event1);
calendar.addEvent(event2);
const summary = calendar.getCalendarSummary();
console.log(summary.eventsByCategory.Work)



module.exports = {
    Event,
    Calendar
};
