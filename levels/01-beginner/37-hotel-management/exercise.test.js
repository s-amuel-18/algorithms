const { Room, Reservation, Hotel } = require('./exercise');

describe('Sistema de Gestión de Hotel', () => {
    // ===== CLASE ROOM =====
    describe('Clase Room', () => {
        describe('Casos básicos', () => {
            test('crea una habitación correctamente', () => {
                // Propósito: Verificar que el constructor asigna correctamente las propiedades
                // Entrada: number=101, type='Standard', pricePerNight=100
                // Esperado: Room creada con todas las propiedades correctas
                const room = new Room(101, 'Standard', 100);
                expect(room.number).toBe(101);
                expect(room.type).toBe('Standard');
                expect(room.pricePerNight).toBe(100);
            });

            test('obtiene el tipo correctamente', () => {
                // Propósito: Verificar que getType retorna el tipo
                // Entrada: type='Deluxe'
                // Esperado: Retorna 'Deluxe'
                const room = new Room(102, 'Deluxe', 150);
                expect(room.getType()).toBe('Deluxe');
            });

            test('obtiene el precio por noche correctamente', () => {
                // Propósito: Verificar que getPricePerNight retorna el precio
                // Entrada: pricePerNight=200
                // Esperado: Retorna 200
                const room = new Room(103, 'Suite', 200);
                expect(room.getPricePerNight()).toBe(200);
            });
        });

        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando el número es inválido', () => {
                // Propósito: Verificar validación de number > 0
                // Entrada: number=0 o negativo
                // Esperado: Error "Room number must be greater than 0"
                expect(() => new Room(0, 'Standard', 100)).toThrow('Room number must be greater than 0');
            });

            test('lanza error cuando el tipo está vacío', () => {
                // Propósito: Verificar validación de type no vacío
                // Entrada: type=''
                // Esperado: Error "Room type is required"
                expect(() => new Room(101, '', 100)).toThrow('Room type is required');
            });

            test('lanza error cuando el precio es inválido', () => {
                // Propósito: Verificar validación de pricePerNight > 0
                // Entrada: pricePerNight=0 o negativo
                // Esperado: Error "Room price per night must be greater than 0"
                expect(() => new Room(101, 'Standard', 0)).toThrow('Room price per night must be greater than 0');
            });
        });
    });

    // ===== CLASE RESERVATION =====
    describe('Clase Reservation', () => {
        describe('Casos básicos', () => {
            test('crea una reserva correctamente', () => {
                // Propósito: Verificar que el constructor asigna correctamente las propiedades
                // Entrada: roomNumber=101, guestName='Juan Pérez', checkIn y checkOut válidos
                // Esperado: Reservation creada con todas las propiedades correctas
                const checkIn = new Date('2024-12-20');
                const checkOut = new Date('2024-12-23');
                const reservation = new Reservation(101, 'Juan Pérez', checkIn, checkOut);
                expect(reservation.roomNumber).toBe(101);
                expect(reservation.guestName).toBe('Juan Pérez');
                expect(reservation.checkIn).toBe(checkIn);
                expect(reservation.checkOut).toBe(checkOut);
            });

            test('calcula la duración correctamente', () => {
                // Propósito: Verificar que getDuration calcula las noches correctamente
                // Entrada: checkIn='2024-12-20', checkOut='2024-12-23' (3 días)
                // Esperado: Retorna 3
                const checkIn = new Date('2024-12-20');
                const checkOut = new Date('2024-12-23');
                const reservation = new Reservation(101, 'Juan', checkIn, checkOut);
                expect(reservation.getDuration()).toBe(3);
            });

            test('obtiene el nombre del huésped correctamente', () => {
                // Propósito: Verificar que getGuestName retorna el nombre
                // Entrada: guestName='María García'
                // Esperado: Retorna 'María García'
                 const checkIn = new Date('2024-12-20');
                const checkOut = new Date('2024-12-23');
                const reservation = new Reservation(101, 'María García', checkIn, checkOut);
                expect(reservation.getGuestName()).toBe('María García');
            });

            test('verifica si está activa correctamente', () => {
                // Propósito: Verificar que isActive retorna true cuando la fecha actual está entre checkIn y checkOut
                // Entrada: checkIn en el pasado, checkOut en el futuro
                // Esperado: Retorna true si está activa
                const checkIn = new Date();
                checkIn.setDate(checkIn.getDate() - 1); // Ayer
                const checkOut = new Date();
                checkOut.setDate(checkOut.getDate() + 1); // Mañana
                const reservation = new Reservation(101, 'Juan', checkIn, checkOut);
                expect(reservation.isActive()).toBe(true);
            });
        });

        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando roomNumber es inválido', () => {
                // Propósito: Verificar validación de roomNumber > 0
                // Entrada: roomNumber=0
                // Esperado: Error "Room number must be greater than 0"
                expect(() => new Reservation(0, 'Juan', new Date(), new Date())).toThrow('Room number must be greater than 0');
            });

            test('lanza error cuando guestName está vacío', () => {
                // Propósito: Verificar validación de guestName no vacío
                // Entrada: guestName=''
                // Esperado: Error "Guest name is required"
                expect(() => new Reservation(101, '', new Date(), new Date())).toThrow('Guest name is required');
            });

            test('lanza error cuando checkIn no es Date', () => {
                // Propósito: Verificar validación de checkIn como Date
                // Entrada: checkIn='2024-12-20'
                // Esperado: Error "Check-in date must be a Date object"
                expect(() => new Reservation(101, 'Juan', '2024-12-20', new Date())).toThrow('Check-in date must be a Date object');
            });

            test('lanza error cuando checkOut no es Date', () => {
                // Propósito: Verificar validación de checkOut como Date
                // Entrada: checkOut='2024-12-23'
                // Esperado: Error "Check-out date must be a Date object"
                expect(() => new Reservation(101, 'Juan', new Date(), '2024-12-23')).toThrow('Check-out date must be a Date object');
            });

            test('lanza error cuando checkOut es anterior a checkIn', () => {
                // Propósito: Verificar validación de checkOut posterior a checkIn
                // Entrada: checkOut anterior a checkIn
                // Esperado: Error "Check-out date must be after check-in date"
                const checkIn = new Date('2024-12-23');
                const checkOut = new Date('2024-12-20');
                expect(() => new Reservation(101, 'Juan', checkIn, checkOut)).toThrow('Check-out date must be after check-in date');
            });
        });
    });

    // ===== CLASE HOTEL =====
    describe('Clase Hotel', () => {
        let hotel;

        beforeEach(() => {
            hotel = new Hotel('Grand Hotel');
        });

        describe('Casos básicos', () => {
            test('crea un hotel correctamente', () => {
                // Propósito: Verificar que el constructor asigna correctamente las propiedades
                // Entrada: name='Grand Hotel'
                // Esperado: Hotel creado con name correcto, arrays inicializados
                expect(hotel.name).toBe('Grand Hotel');
                expect(Array.isArray(hotel.rooms)).toBe(true);
                expect(Array.isArray(hotel.reservations)).toBe(true);
            });

            test('agrega una habitación correctamente', () => {
                // Propósito: Verificar que addRoom agrega una habitación válida
                // Entrada: room (instancia de Room)
                // Esperado: Habitación agregada al array rooms
                const room = new Room(101, 'Standard', 100);
                const added = hotel.addRoom(room);
                expect(hotel.rooms.length).toBe(1);
                expect(added).toBe(room);
            });

            test('encuentra una habitación por número correctamente', () => {
                // Propósito: Verificar que findRoom busca y retorna una habitación existente
                // Entrada: roomNumber=101 que existe
                // Esperado: Retorna la habitación encontrada
                const room = new Room(101, 'Standard', 100);
                hotel.addRoom(room);
                const found = hotel.findRoom(101);
                expect(found).toBe(room);
            });

            test('retorna null cuando no encuentra una habitación', () => {
                // Propósito: Verificar que findRoom retorna null cuando la habitación no existe
                // Entrada: roomNumber=999 que no existe
                // Esperado: Retorna null
                expect(hotel.findRoom(999)).toBeNull();
            });

            test('crea una reserva correctamente', () => {
                // Propósito: Verificar que createReservation crea y agrega una reserva
                // Entrada: roomNumber, guestName, checkIn, checkOut válidos
                // Esperado: Reserva creada y agregada
                const room = new Room(101, 'Standard', 100);
                hotel.addRoom(room);
                const checkIn = new Date('2024-12-20');
                const checkOut = new Date('2024-12-23');
                const reservation = hotel.createReservation(101, 'Juan Pérez', checkIn, checkOut);
                expect(hotel.reservations.length).toBe(1);
                expect(reservation.roomNumber).toBe(101);
            });

            test('obtiene habitaciones disponibles correctamente', () => {
                // Propósito: Verificar que getAvailableRooms filtra habitaciones sin reservas solapadas
                // Entrada: checkIn y checkOut que no solapan con reservas existentes
                // Esperado: Retorna habitaciones disponibles
                const room1 = new Room(101, 'Standard', 100);
                const room2 = new Room(102, 'Deluxe', 150);
                hotel.addRoom(room1);
                hotel.addRoom(room2);
                hotel.createReservation(101, 'Juan', new Date('2024-12-20'), new Date('2024-12-23'));
                const available = hotel.getAvailableRooms(new Date('2024-12-25'), new Date('2024-12-28'));
                expect(available.length).toBe(2);
            });

            test('obtiene reservas por huésped correctamente', () => {
                // Propósito: Verificar que getReservationsByGuest filtra reservas del huésped
                // Entrada: guestName='Juan Pérez'
                // Esperado: Retorna solo reservas de ese huésped
                const room = new Room(101, 'Standard', 100);
                hotel.addRoom(room);
                const reservation1 = hotel.createReservation(101, 'Juan Pérez', new Date('2024-12-20'), new Date('2024-12-23'));
                const reservation2 = hotel.createReservation(101, 'María García', new Date('2024-12-25'), new Date('2024-12-28'));
                const reservations = hotel.getReservationsByGuest('Juan Pérez');
                expect(reservations.length).toBe(1);
                expect(reservations[0]).toBe(reservation1);
            });

            test('calcula ingresos totales correctamente', () => {
                // Propósito: Verificar que getTotalRevenue suma ingresos de todas las reservas
                // Entrada: Múltiples reservas con diferentes precios y duraciones
                // Esperado: Suma de todos los ingresos
                const room1 = new Room(101, 'Standard', 100);
                const room2 = new Room(102, 'Deluxe', 150);
                hotel.addRoom(room1);
                hotel.addRoom(room2);
                hotel.createReservation(101, 'Juan', new Date('2024-12-20'), new Date('2024-12-23')); // 3 noches × 100 = 300
                hotel.createReservation(102, 'María', new Date('2024-12-21'), new Date('2024-12-24')); // 3 noches × 150 = 450
                expect(hotel.getTotalRevenue()).toBe(750);
            });

            test('calcula tasa de ocupación correctamente', () => {
                // Propósito: Verificar que getOccupancyRate calcula el porcentaje correcto
                // Entrada: fecha con algunas habitaciones ocupadas
                // Esperado: Porcentaje de ocupación correcto
                const room1 = new Room(101, 'Standard', 100);
                const room2 = new Room(102, 'Deluxe', 150);
                hotel.addRoom(room1);
                hotel.addRoom(room2);
                const date = new Date('2024-12-22');
                hotel.createReservation(101, 'Juan', new Date('2024-12-20'), new Date('2024-12-25'));
                const rate = hotel.getOccupancyRate(date);
                expect(parseFloat(rate)).toBe(50.00);
            });
        });

        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando el nombre del hotel está vacío', () => {
                // Propósito: Verificar validación de name no vacío
                // Entrada: name=''
                // Esperado: Error "Hotel name is required"
                expect(() => new Hotel('')).toThrow('Hotel name is required');
            });

            test('lanza error cuando room no es instancia de Room', () => {
                // Propósito: Verificar validación de instancia de Room en addRoom
                // Entrada: room={}
                // Esperado: Error "Room must be an instance of Room"
                expect(() => hotel.addRoom({})).toThrow('Room must be an instance of Room');
            });

            test('lanza error cuando se intenta agregar habitación duplicada', () => {
                // Propósito: Verificar validación de habitaciones duplicadas
                // Entrada: Agregar dos habitaciones con el mismo número
                // Esperado: Error "Room number already exists" en el segundo intento
                const room1 = new Room(101, 'Standard', 100);
                const room2 = new Room(101, 'Deluxe', 150);
                hotel.addRoom(room1);
                expect(() => hotel.addRoom(room2)).toThrow('Room number already exists');
            });

            test('lanza error cuando la habitación no existe en createReservation', () => {
                // Propósito: Verificar validación de habitación existente
                // Entrada: roomNumber=999 que no existe
                // Esperado: Error "Room not found"
                expect(() => hotel.createReservation(999, 'Juan', new Date(), new Date())).toThrow('Room not found');
            });

            test('lanza error cuando hay solapamiento de fechas', () => {
                // Propósito: Verificar validación de solapamientos temporales
                // Entrada: Reserva que solapa con una existente
                // Esperado: Error "Room is already booked for these dates"
                const room = new Room(101, 'Standard', 100);
                hotel.addRoom(room);
                hotel.createReservation(101, 'Juan', new Date('2024-12-20'), new Date('2024-12-23'));
                expect(() => hotel.createReservation(101, 'María', new Date('2024-12-22'), new Date('2024-12-25'))).toThrow('Room is already booked for these dates');
            });

            test('lanza error cuando date no es Date en getOccupancyRate', () => {
                // Propósito: Verificar validación de date como Date
                // Entrada: date='2024-12-22'
                // Esperado: Error "Date must be a Date object"
                expect(() => hotel.getOccupancyRate('2024-12-22')).toThrow('Date must be a Date object');
            });
        });

        describe('Validación de solapamientos', () => {
            test('permite reservas consecutivas sin solapamiento', () => {
                // Propósito: Verificar que se pueden crear reservas consecutivas
                // Entrada: Reserva termina el día 23, siguiente empieza el día 23
                // Esperado: Ambas reservas creadas correctamente
                const room = new Room(101, 'Standard', 100);
                hotel.addRoom(room);
                hotel.createReservation(101, 'Juan', new Date('2024-12-20'), new Date('2024-12-23'));
                const reservation2 = hotel.createReservation(101, 'María', new Date('2024-12-23'), new Date('2024-12-26'));
                expect(hotel.reservations.length).toBe(2);
            });

            test('detecta solapamiento parcial correctamente', () => {
                // Propósito: Verificar que detecta solapamientos parciales
                // Entrada: Reserva que solapa parcialmente con otra
                // Esperado: Error de solapamiento
                const room = new Room(101, 'Standard', 100);
                hotel.addRoom(room);
                hotel.createReservation(101, 'Juan', new Date('2024-12-20'), new Date('2024-12-25'));
                expect(() => hotel.createReservation(101, 'María', new Date('2024-12-22'), new Date('2024-12-28'))).toThrow('Room is already booked for these dates');
            });
        });
    });
});

