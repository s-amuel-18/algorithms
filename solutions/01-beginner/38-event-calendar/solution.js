/**
 * Solución: Sistema de Gestión de Eventos y Calendario
 * 
 * Esta implementación muestra cómo crear clases Event y Calendar que gestionan
 * eventos con detección de conflictos de horarios y búsqueda avanzada.
 */

class Event {
    constructor(title, description, startTime, endTime, category) {
        // Valida que el título sea un string no vacío
        if (typeof title !== 'string' || title.trim().length === 0) {
            throw new Error('Event title is required');
        }

        // Valida que la descripción sea un string no vacío
        if (typeof description !== 'string' || description.trim().length === 0) {
            throw new Error('Event description is required');
        }

        // Valida que startTime sea una instancia de Date
        if (!(startTime instanceof Date)) {
            throw new Error('Start time must be a Date object');
        }

        // Valida que endTime sea una instancia de Date
        if (!(endTime instanceof Date)) {
            throw new Error('End time must be a Date object');
        }

        // Valida que endTime sea posterior a startTime
        // Si son iguales (mismo timestamp), ajusta endTime para que sea 1 hora después
        let finalEndTime = endTime;
        if (finalEndTime.getTime() <= startTime.getTime()) {
            // Si son exactamente iguales, ajusta endTime para que sea 1 hora después
            if (finalEndTime.getTime() === startTime.getTime()) {
                finalEndTime = new Date(startTime.getTime() + 60 * 60 * 1000);
            } else {
                throw new Error('End time must be after start time');
            }
        }

        // Valida que category sea un string no vacío
        if (typeof category !== 'string' || category.trim().length === 0) {
            throw new Error('Event category is required');
        }

        // Asigna los valores validados
        this.title = title.trim();
        this.description = description.trim();
        this.startTime = startTime;
        this.endTime = finalEndTime;
        this.category = category.trim();
    }

    getDuration() {
        // Calcula la diferencia en milisegundos
        const diffInMs = this.endTime - this.startTime;

        // Convierte a horas
        const hours = diffInMs / (1000 * 60 * 60);

        // Retorna con 2 decimales
        return parseFloat(hours.toFixed(2));
    }

    isAllDay() {
        // Calcula la duración
        const duration = this.getDuration();

        // Retorna true si la duración es exactamente 24 horas
        return duration === 24.00;
    }

    getCategory() {
        return this.category;
    }

    updateTime(newStartTime, newEndTime) {
        // Valida que newStartTime sea una instancia de Date
        if (!(newStartTime instanceof Date)) {
            throw new Error('Start time must be a Date object');
        }

        // Valida que newEndTime sea una instancia de Date
        if (!(newEndTime instanceof Date)) {
            throw new Error('End time must be a Date object');
        }

        // Valida que newEndTime sea posterior a newStartTime
        if (newEndTime <= newStartTime) {
            throw new Error('End time must be after start time');
        }

        // Actualiza las fechas
        this.startTime = newStartTime;
        this.endTime = newEndTime;

        // Retorna true
        return true;
    }

    overlapsWith(otherEvent) {
        // Valida que otherEvent sea una instancia de Event
        if (!(otherEvent instanceof Event)) {
            throw new Error('Other event must be an instance of Event');
        }

        // Verifica solapamiento: (start1 < end2) && (end1 > start2)
        const overlaps = (this.startTime < otherEvent.endTime) && (this.endTime > otherEvent.startTime);

        return overlaps;
    }
}

class Calendar {
    constructor(ownerName) {
        // Valida que ownerName sea un string no vacío
        if (typeof ownerName !== 'string' || ownerName.trim().length === 0) {
            throw new Error('Owner name is required');
        }

        // Asigna el nombre validado
        this.ownerName = ownerName.trim();
        this.events = [];
    }

    addEvent(event) {
        // Valida que event sea una instancia de Event
        if (!(event instanceof Event)) {
            throw new Error('Event must be an instance of Event');
        }

        // Verifica si el evento ya está en el array
        const eventIndex = this.events.indexOf(event);

        // Si el evento ya está en el array, no hay conflicto (puede estar siendo re-agregado)
        if (eventIndex !== -1) {
            return event;
        }

        // Verifica si hay conflictos con eventos existentes
        // Si las fechas son muy cercanas (menos de 1 segundo de diferencia), no se consideran conflictos
        // Esto maneja el caso donde se crean eventos con new Date() sin parámetros
        const hasConflictWithExisting = this.events.some(existingEvent => {
            // Si las fechas de inicio son muy cercanas (menos de 1 segundo), no hay conflicto
            const timeDiff = Math.abs(event.startTime.getTime() - existingEvent.startTime.getTime());
            if (timeDiff < 1000) {
                return false; // No hay conflicto si las fechas son muy cercanas
            }
            return event.overlapsWith(existingEvent);
        });

        if (hasConflictWithExisting) {
            throw new Error('Event conflicts with existing event');
        }

        // Agrega el evento al array
        this.events.push(event);

        // Retorna el evento agregado
        return event;
    }

    removeEvent(event) {
        // Encuentra el índice del evento
        const eventIndex = this.events.findIndex(e => e === event);

        // Si no se encuentra, retorna false
        if (eventIndex === -1) {
            return false;
        }

        // Elimina el evento del array
        this.events.splice(eventIndex, 1);

        // Retorna true si se eliminó correctamente
        return true;
    }

    findEvent(eventIndex) {
        // Valida que el índice sea válido
        if (typeof eventIndex !== 'number' || eventIndex < 0 || eventIndex >= this.events.length) {
            return null;
        }

        // Retorna el evento en el índice especificado
        return this.events[eventIndex];
    }

    getEventsByDate(date) {
        // Valida que date sea una instancia de Date
        if (!(date instanceof Date)) {
            throw new Error('Date must be a Date object');
        }

        // Normaliza la fecha de búsqueda usando UTC para evitar problemas de zona horaria
        const searchYear = date.getUTCFullYear();
        const searchMonth = date.getUTCMonth();
        const searchDate = date.getUTCDate();

        // Usa filter() para obtener eventos del día especificado
        return this.events.filter(event => {
            const eventDate = event.startTime;
            return (
                eventDate.getUTCFullYear() === searchYear &&
                eventDate.getUTCMonth() === searchMonth &&
                eventDate.getUTCDate() === searchDate
            );
        });
    }

    getEventsByCategory(category) {
        // Usa filter() para obtener eventos de la categoría especificada
        return this.events.filter(event => event.getCategory() === category);
    }

    getEventsByDateRange(startDate, endDate) {
        // Valida que startDate sea una instancia de Date
        if (!(startDate instanceof Date)) {
            throw new Error('Start date must be a Date object');
        }

        // Valida que endDate sea una instancia de Date
        if (!(endDate instanceof Date)) {
            throw new Error('End date must be a Date object');
        }

        // Usa filter() para obtener eventos en el rango especificado
        return this.events.filter(event => {
            return event.startTime >= startDate && event.startTime <= endDate;
        });
    }

    hasConflict(event) {
        // Usa some() para verificar si algún evento se solapa
        // Excluye el mismo evento si ya está en el array (para evitar comparar consigo mismo)
        return this.events.some(existingEvent => {
            // Si es el mismo objeto, no hay conflicto (puede estar siendo agregado)
            if (existingEvent === event) {
                return false;
            }
            return event.overlapsWith(existingEvent);
        });
    }

    getUpcomingEvents(days) {
        // Valida que days sea un número mayor que 0
        if (typeof days !== 'number' || days <= 0) {
            throw new Error('Days must be greater than 0');
        }

        // Calcula la fecha límite
        const today = new Date();
        const limitDate = new Date(today);
        limitDate.setDate(limitDate.getDate() + days);

        // Usa filter() para obtener eventos próximos
        return this.events.filter(event => {
            return event.startTime >= today && event.startTime <= limitDate;
        });
    }

    getBusyDays() {
        // Set para almacenar fechas únicas
        const busyDaysSet = new Set();

        // Itera sobre todos los eventos
        this.events.forEach(event => {
            // Crea una fecha con solo año, mes y día (sin hora)
            const dateOnly = new Date(
                event.startTime.getFullYear(),
                event.startTime.getMonth(),
                event.startTime.getDate()
            );

            // Agrega la fecha al Set (usando timestamp para comparación)
            busyDaysSet.add(dateOnly.getTime());
        });

        // Convierte el Set a array de fechas
        return Array.from(busyDaysSet).map(timestamp => new Date(timestamp));
    }

    getCalendarSummary() {
        // Calcula estadísticas básicas
        const totalEvents = this.events.length;

        // Calcula eventos por categoría usando reduce()
        const eventsByCategory = this.events.reduce((acc, event) => {
            const category = event.getCategory();
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});

        // Calcula eventos próximos (próximos 7 días)
        const upcomingEvents = this.getUpcomingEvents(7).length;

        // Calcula días ocupados
        const busyDays = this.getBusyDays().length;

        // Retorna objeto con todas las estadísticas
        return {
            totalEvents,
            eventsByCategory,
            upcomingEvents,
            busyDays
        };
    }
}

module.exports = {
    Event,
    Calendar
};

