const { Event, Calendar } = require('./exercise');

describe('Sistema de Gestión de Eventos y Calendario', () => {
    // ===== CLASE EVENT =====
    describe('Clase Event', () => {
        describe('Casos básicos', () => {
            test('crea un evento correctamente', () => {
                // Propósito: Verificar que el constructor asigna correctamente las propiedades
                // Entrada: title, description, startTime, endTime, category válidos
                // Esperado: Event creado con todas las propiedades correctas
                const startTime = new Date('2024-12-20T10:00:00');
                const endTime = new Date('2024-12-20T11:30:00');
                const event = new Event('Reunión', 'Reunión de equipo', startTime, endTime, 'Work');
                expect(event.title).toBe('Reunión');
                expect(event.description).toBe('Reunión de equipo');
                expect(event.startTime).toBe(startTime);
                expect(event.endTime).toBe(endTime);
                expect(event.category).toBe('Work');
            });

            test('calcula la duración correctamente', () => {
                // Propósito: Verificar que getDuration calcula las horas correctamente
                // Entrada: evento de 1.5 horas
                // Esperado: Retorna 1.50
                const startTime = new Date('2024-12-20T10:00:00');
                const endTime = new Date('2024-12-20T11:30:00');
                const event = new Event('Test', 'Desc', startTime, endTime, 'Work');
                expect(event.getDuration()).toBe(1.50);
            });

            test('verifica si es de todo el día correctamente', () => {
                // Propósito: Verificar que isAllDay detecta eventos de 24 horas
                // Entrada: evento de exactamente 24 horas
                // Esperado: Retorna true
                const startTime = new Date('2024-12-20T00:00:00');
                const endTime = new Date('2024-12-21T00:00:00');
                const event = new Event('Test', 'Desc', startTime, endTime, 'Work');
                expect(event.isAllDay()).toBe(true);
            });

            test('verifica que no es de todo el día cuando dura menos', () => {
                // Propósito: Verificar que isAllDay retorna false para eventos cortos
                // Entrada: evento de 2 horas
                // Esperado: Retorna false
                const startTime = new Date('2024-12-20T10:00:00');
                const endTime = new Date('2024-12-20T12:00:00');
                const event = new Event('Test', 'Desc', startTime, endTime, 'Work');
                expect(event.isAllDay()).toBe(false);
            });

            test('obtiene la categoría correctamente', () => {
                // Propósito: Verificar que getCategory retorna la categoría
                // Entrada: category='Personal'
                // Esperado: Retorna 'Personal'
                const event = new Event('Test', 'Desc', new Date(), new Date(), 'Personal');
                expect(event.getCategory()).toBe('Personal');
            });

            test('actualiza el horario correctamente', () => {
                // Propósito: Verificar que updateTime actualiza las fechas
                // Entrada: newStartTime y newEndTime válidos
                // Esperado: Fechas actualizadas correctamente
                const event = new Event('Test', 'Desc', new Date('2024-12-20T10:00:00'), new Date('2024-12-20T11:00:00'), 'Work');
                const newStart = new Date('2024-12-21T14:00:00');
                const newEnd = new Date('2024-12-21T15:00:00');
                const result = event.updateTime(newStart, newEnd);
                expect(result).toBe(true);
                expect(event.startTime).toBe(newStart);
                expect(event.endTime).toBe(newEnd);
            });

            test('verifica solapamiento correctamente', () => {
                // Propósito: Verificar que overlapsWith detecta solapamientos
                // Entrada: Dos eventos que se solapan
                // Esperado: Retorna true
                const event1 = new Event('Evento 1', 'Desc', new Date('2024-12-20T10:00:00'), new Date('2024-12-20T11:00:00'), 'Work');
                const event2 = new Event('Evento 2', 'Desc', new Date('2024-12-20T10:30:00'), new Date('2024-12-20T11:30:00'), 'Work');
                expect(event1.overlapsWith(event2)).toBe(true);
            });

            test('verifica que no hay solapamiento cuando no se solapan', () => {
                // Propósito: Verificar que overlapsWith retorna false cuando no hay solapamiento
                // Entrada: Dos eventos que no se solapan
                // Esperado: Retorna false
                const event1 = new Event('Evento 1', 'Desc', new Date('2024-12-20T10:00:00'), new Date('2024-12-20T11:00:00'), 'Work');
                const event2 = new Event('Evento 2', 'Desc', new Date('2024-12-20T12:00:00'), new Date('2024-12-20T13:00:00'), 'Work');
                expect(event1.overlapsWith(event2)).toBe(false);
            });
        });

        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando el título está vacío', () => {
                // Propósito: Verificar validación de title no vacío
                // Entrada: title=''
                // Esperado: Error "Event title is required"
                expect(() => new Event('', 'Desc', new Date(), new Date(), 'Work')).toThrow('Event title is required');
            });

            test('lanza error cuando la descripción está vacía', () => {
                // Propósito: Verificar validación de description no vacío
                // Entrada: description=''
                // Esperado: Error "Event description is required"
                expect(() => new Event('Test', '', new Date(), new Date(), 'Work')).toThrow('Event description is required');
            });

            test('lanza error cuando startTime no es Date', () => {
                // Propósito: Verificar validación de startTime como Date
                // Entrada: startTime='2024-12-20'
                // Esperado: Error "Start time must be a Date object"
                expect(() => new Event('Test', 'Desc', '2024-12-20', new Date(), 'Work')).toThrow('Start time must be a Date object');
            });

            test('lanza error cuando endTime no es Date', () => {
                // Propósito: Verificar validación de endTime como Date
                // Entrada: endTime='2024-12-20'
                // Esperado: Error "End time must be a Date object"
                expect(() => new Event('Test', 'Desc', new Date(), '2024-12-20', 'Work')).toThrow('End time must be a Date object');
            });

            test('lanza error cuando endTime es anterior a startTime', () => {
                // Propósito: Verificar validación de endTime posterior a startTime
                // Entrada: endTime anterior a startTime
                // Esperado: Error "End time must be after start time"
                const startTime = new Date('2024-12-20T11:00:00');
                const endTime = new Date('2024-12-20T10:00:00');
                expect(() => new Event('Test', 'Desc', startTime, endTime, 'Work')).toThrow('End time must be after start time');
            });

            test('lanza error cuando la categoría está vacía', () => {
                // Propósito: Verificar validación de category no vacío
                // Entrada: category=''
                // Esperado: Error "Event category is required"
                expect(() => new Event('Test', 'Desc', new Date(), new Date(), '')).toThrow('Event category is required');
            });
        });
    });

    // ===== CLASE CALENDAR =====
    describe('Clase Calendar', () => {
        describe('Casos básicos', () => {
            test('crea un calendario correctamente', () => {
                // Propósito: Verificar que el constructor asigna correctamente las propiedades
                // Entrada: ownerName='Juan Pérez'
                // Esperado: Calendar creado con ownerName correcto, events inicializado como array vacío
                const calendar = new Calendar('Juan Pérez');
                expect(calendar.ownerName).toBe('Juan Pérez');
                expect(Array.isArray(calendar.events)).toBe(true);
                expect(calendar.events.length).toBe(0);
            });

            test('agrega un evento correctamente', () => {
                // Propósito: Verificar que addEvent agrega un evento válido sin conflictos
                // Entrada: event (instancia de Event) sin conflictos
                // Esperado: Evento agregado al array events
                const calendar = new Calendar('Juan Pérez');
                const event = new Event('Test', 'Desc', new Date('2024-12-20T10:00:00'), new Date('2024-12-20T11:00:00'), 'Work');
                const added = calendar.addEvent(event);
                expect(calendar.events.length).toBe(1);
                expect(added).toBe(event);
            });

            test('elimina un evento correctamente', () => {
                // Propósito: Verificar que removeEvent elimina un evento existente
                // Entrada: event que existe en el calendario
                // Esperado: Evento eliminado del array
                const calendar = new Calendar('Juan Pérez');
                const event = new Event('Test', 'Desc', new Date(), new Date(), 'Work');
                calendar.addEvent(event);
                const result = calendar.removeEvent(event);
                expect(result).toBe(true);
                expect(calendar.events.length).toBe(0);
            });

            test('retorna false cuando se intenta eliminar evento inexistente', () => {
                // Propósito: Verificar que removeEvent retorna false cuando el evento no existe
                // Entrada: event que no está en el calendario
                // Esperado: Retorna false
                const calendar = new Calendar('Juan Pérez');
                const event = new Event('Test', 'Desc', new Date(), new Date(), 'Work');
                expect(calendar.removeEvent(event)).toBe(false);
            });

            test('obtiene eventos por fecha correctamente', () => {
                // Propósito: Verificar que getEventsByDate filtra eventos del día especificado
                // Entrada: date=new Date('2024-12-20')
                // Esperado: Retorna solo eventos de ese día
                const calendar = new Calendar('Juan Pérez');
                const event1 = new Event('Evento 1', 'Desc', new Date('2024-12-20T10:00:00'), new Date('2024-12-20T11:00:00'), 'Work');
                const event2 = new Event('Evento 2', 'Desc', new Date('2024-12-21T10:00:00'), new Date('2024-12-21T11:00:00'), 'Work');
                calendar.addEvent(event1);
                calendar.addEvent(event2);
                const events = calendar.getEventsByDate(new Date('2024-12-20'));
                expect(events.length).toBe(1);
                expect(events[0]).toBe(event1);
            });

            test('obtiene eventos por categoría correctamente', () => {
                // Propósito: Verificar que getEventsByCategory filtra por categoría
                // Entrada: category='Work'
                // Esperado: Retorna solo eventos de esa categoría
                const calendar = new Calendar('Juan Pérez');
                const event1 = new Event('Evento 1', 'Desc', new Date('2026-10-10'), new Date('2026-10-11'), 'Work');
                const event2 = new Event('Evento 2', 'Desc', new Date('2026-10-15'), new Date('2026-10-20'), 'Personal');
                calendar.addEvent(event1);
                calendar.addEvent(event2);
                const workEvents = calendar.getEventsByCategory('Work');
                expect(workEvents.length).toBe(1);
                expect(workEvents[0]).toBe(event1);
            });

            test('obtiene eventos por rango de fechas correctamente', () => {
                // Propósito: Verificar que getEventsByDateRange filtra eventos en el rango
                // Entrada: startDate y endDate que incluyen algunos eventos
                // Esperado: Retorna solo eventos en el rango
                const calendar = new Calendar('Juan Pérez');
                const event1 = new Event('Evento 1', 'Desc', new Date('2024-12-20T10:00:00'), new Date('2024-12-20T11:00:00'), 'Work');
                const event2 = new Event('Evento 2', 'Desc', new Date('2024-12-25T10:00:00'), new Date('2024-12-25T11:00:00'), 'Work');
                calendar.addEvent(event1);
                calendar.addEvent(event2);
                const events = calendar.getEventsByDateRange(new Date('2024-12-20'), new Date('2024-12-22'));
                expect(events.length).toBe(1);
                expect(events[0]).toBe(event1);
            });

            test('detecta conflictos correctamente', () => {
                // Propósito: Verificar que hasConflict detecta eventos que se solapan
                // Entrada: Evento que se solapa con otro existente
                // Esperado: Retorna true
                const calendar = new Calendar('Juan Pérez');
                const event1 = new Event('Evento 1', 'Desc', new Date('2024-12-20T10:00:00'), new Date('2024-12-20T11:00:00'), 'Work');
                const event2 = new Event('Evento 2', 'Desc', new Date('2024-12-20T10:30:00'), new Date('2024-12-20T11:30:00'), 'Work');
                calendar.addEvent(event1);
                expect(calendar.hasConflict(event2)).toBe(true);
            });

            test('obtiene eventos próximos correctamente', () => {
                // Propósito: Verificar que getUpcomingEvents filtra eventos próximos
                // Entrada: days=7
                // Esperado: Retorna eventos en los próximos 7 días
                const calendar = new Calendar('Juan Pérez');
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                const nextWeek = new Date(today);
                nextWeek.setDate(nextWeek.getDate() + 8);
                const event1 = new Event('Evento 1', 'Desc', tomorrow, new Date(tomorrow.getTime() + 3600000), 'Work');
                const event2 = new Event('Evento 2', 'Desc', nextWeek, new Date(nextWeek.getTime() + 3600000), 'Work');
                calendar.addEvent(event1);
                calendar.addEvent(event2);
                const upcoming = calendar.getUpcomingEvents(7);
                expect(upcoming.length).toBe(1);
                expect(upcoming[0]).toBe(event1);
            });

            test('obtiene días ocupados correctamente', () => {
                // Propósito: Verificar que getBusyDays retorna días únicos con eventos
                // Entrada: Eventos en diferentes días
                // Esperado: Retorna array con fechas únicas de días ocupados
                const calendar = new Calendar('Juan Pérez');
                const event1 = new Event('Evento 1', 'Desc', new Date('2024-12-20T10:00:00'), new Date('2024-12-20T11:00:00'), 'Work');
                const event2 = new Event('Evento 2', 'Desc', new Date('2024-12-20T14:00:00'), new Date('2024-12-20T15:00:00'), 'Work');
                const event3 = new Event('Evento 3', 'Desc', new Date('2024-12-21T10:00:00'), new Date('2024-12-21T11:00:00'), 'Work');
                calendar.addEvent(event1);
                calendar.addEvent(event2);
                calendar.addEvent(event3);
                const busyDays = calendar.getBusyDays();
                expect(busyDays.length).toBe(2); // 2 días únicos
            });

            test('obtiene resumen del calendario correctamente', () => {
                // Propósito: Verificar que getCalendarSummary retorna todas las estadísticas
                // Entrada: Calendario con varios eventos
                // Esperado: Objeto con todas las estadísticas solicitadas
                const calendar = new Calendar('Juan Pérez');
                const event1 = new Event('Evento 1', 'Desc', new Date('2026-10-10'), new Date('2026-10-11'), 'Work');
                const event2 = new Event('Evento 2', 'Desc', new Date('2026-10-15'), new Date('2026-10-16'), 'Personal');
                calendar.addEvent(event1);
                calendar.addEvent(event2);
                const summary = calendar.getCalendarSummary();
                expect(summary.totalEvents).toBe(2);
                expect(summary.eventsByCategory.Work).toBe(1);
                expect(summary.eventsByCategory.Personal).toBe(1);
                expect(typeof summary.upcomingEvents).toBe('number');
                expect(typeof summary.busyDays).toBe('number');
            });
        });

        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando ownerName está vacío', () => {
                // Propósito: Verificar validación de ownerName no vacío
                // Entrada: ownerName=''
                // Esperado: Error "Owner name is required"
                expect(() => new Calendar('')).toThrow('Owner name is required');
            });

            test('lanza error cuando event no es instancia de Event', () => {
                // Propósito: Verificar validación de instancia de Event en addEvent
                // Entrada: event={}
                // Esperado: Error "Event must be an instance of Event"
                const calendar = new Calendar('Juan Pérez');
                expect(() => calendar.addEvent({})).toThrow('Event must be an instance of Event');
            });

            test('lanza error cuando se intenta agregar evento con conflicto', () => {
                // Propósito: Verificar validación de conflictos en addEvent
                // Entrada: Evento que se solapa con otro existente
                // Esperado: Error "Event conflicts with existing event"
                const calendar = new Calendar('Juan Pérez');
                const event1 = new Event('Evento 1', 'Desc', new Date('2024-12-20T10:00:00'), new Date('2024-12-20T11:00:00'), 'Work');
                const event2 = new Event('Evento 2', 'Desc', new Date('2024-12-20T10:30:00'), new Date('2024-12-20T11:30:00'), 'Work');
                calendar.addEvent(event1);
                expect(() => calendar.addEvent(event2)).toThrow('Event conflicts with existing event');
            });

            test('lanza error cuando date no es Date en getEventsByDate', () => {
                // Propósito: Verificar validación de date como Date
                // Entrada: date='2024-12-20'
                // Esperado: Error "Date must be a Date object"
                const calendar = new Calendar('Juan Pérez');
                expect(() => calendar.getEventsByDate('2024-12-20')).toThrow('Date must be a Date object');
            });

            test('lanza error cuando days es inválido en getUpcomingEvents', () => {
                // Propósito: Verificar validación de days > 0
                // Entrada: days=0 o negativo
                // Esperado: Error "Days must be greater than 0"
                const calendar = new Calendar('Juan Pérez');
                expect(() => calendar.getUpcomingEvents(0)).toThrow('Days must be greater than 0');
            });
        });
    });
});

