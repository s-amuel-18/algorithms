const { SmartDevice, SmartHomeMonitor } = require('./exercise');

const buildDevice = (name = 'Lamp', room = 'livingroom', watts = 60) =>
    new SmartDevice(name, room, watts);

describe('Smart Home Monitor', () => {
    // ===== BASIC SCENARIOS =====
    describe('Basic scenarios', () => {
        test('normalizes name and room when instantiating SmartDevice', () => {
            // Purpose: validate constructor normalization logic.
            const device = buildDevice('lamp', 'LivingRoom', 40);
            expect(device.name).toBe('Lamp');
            expect(device.room).toBe('livingroom');
            expect(device.watts).toBe(40);
            expect(device.isOn).toBe(false);
        });

        test('turnOn/turnOff toggle the device state and return the current value', () => {
            const device = buildDevice();
            expect(device.turnOn()).toBe(true);
            expect(device.isOn).toBe(true);
            expect(device.turnOff()).toBe(false);
            expect(device.isOn).toBe(false);
        });

        test('getConsumption returns watts * hours when device is on', () => {
            const device = buildDevice('AC', 'bedroom', 900);
            device.turnOn();
            expect(device.getConsumption(3)).toBe(2700);
        });

        test('SmartHomeMonitor addDevice stores instances and returns total', () => {
            const monitor = new SmartHomeMonitor();
            expect(monitor.addDevice(buildDevice('TV', 'livingroom', 120))).toBe(1);
            expect(monitor.addDevice(buildDevice('Console', 'livingroom', 200))).toBe(2);
        });
    });

    // ===== EDGE CASES AND LIMITS =====
    describe('Edge cases and limits', () => {
        test('findByName returns null when device does not exist', () => {
            const monitor = new SmartHomeMonitor();
            expect(monitor.findByName('Unknown')).toBeNull();
        });

        test('findByName ignores case and spaces', () => {
            const monitor = new SmartHomeMonitor();
            const lamp = buildDevice('Lamp', 'livingroom', 40);
            monitor.addDevice(lamp);
            expect(monitor.findByName('  lamp  ')).toBe(lamp);
        });

        test('getRoomReport returns aggregated information for a given room', () => {
            const monitor = new SmartHomeMonitor();
            const lamp = buildDevice('Lamp', 'kitchen', 40);
            const fridge = buildDevice('Fridge', 'kitchen', 200);
            fridge.turnOn();
            monitor.addDevice(lamp);
            monitor.addDevice(fridge);

            const report = monitor.getRoomReport('Kitchen');
            expect(report).toEqual({
                room: 'kitchen',
                devices: ['Lamp', 'Fridge'],
                activeDevices: 1,
                totalWatts: 240
            });
        });
    });

    // ===== INPUT VALIDATION (FAIL FAST) =====
    describe('Input validation (Fail Fast)', () => {
        test('throws when name is empty', () => {
            expect(() => new SmartDevice('', 'room', 10)).toThrow('Device name is required');
        });

        test('throws when room is empty', () => {
            expect(() => new SmartDevice('Lamp', '   ', 10)).toThrow('Device room is required');
        });

        test('throws when watts are invalid', () => {
            expect(() => new SmartDevice('Lamp', 'room', 0)).toThrow(
                'Device watts must be a number greater than 0'
            );
        });

        test('getConsumption validates hours', () => {
            const device = buildDevice();
            expect(() => device.getConsumption(0)).toThrow('Usage hours must be a positive number');
        });

        test('addDevice rejects non SmartDevice instances', () => {
            const monitor = new SmartHomeMonitor();
            expect(() => monitor.addDevice({ name: 'Fake' })).toThrow(
                'Device must be an instance of SmartDevice'
            );
        });

        test('addDevice rejects duplicated names regardless of case', () => {
            const monitor = new SmartHomeMonitor();
            monitor.addDevice(buildDevice('Lamp', 'room', 10));
            expect(() => monitor.addDevice(buildDevice('lamp', 'room', 20))).toThrow(
                'Device name already registered'
            );
        });

        test('getRoomReport validates room parameter', () => {
            const monitor = new SmartHomeMonitor();
            expect(() => monitor.getRoomReport('   ')).toThrow('Room name is required');
        });

        test('getActiveConsumption validates hours', () => {
            const monitor = new SmartHomeMonitor();
            expect(() => monitor.getActiveConsumption(0)).toThrow(
                'Usage hours must be a positive number'
            );
        });
    });

    // ===== IMMUTABILITY AND CONSISTENCY =====
    describe('Immutability and consistency', () => {
        test('getRoomReport returns a new object every time', () => {
            const monitor = new SmartHomeMonitor();
            monitor.addDevice(buildDevice('Lamp', 'office', 30));
            const report = monitor.getRoomReport('office');
            report.room = 'modified';
            expect(monitor.getRoomReport('office')).toEqual({
                room: 'office',
                devices: ['Lamp'],
                activeDevices: 0,
                totalWatts: 30
            });
        });

        test('getActiveConsumption sums only active devices', () => {
            const monitor = new SmartHomeMonitor();
            const lamp = buildDevice('Lamp', 'office', 30);
            const pc = buildDevice('PC', 'office', 400);
            lamp.turnOn();
            monitor.addDevice(lamp);
            monitor.addDevice(pc);
            expect(monitor.getActiveConsumption(2)).toBe(60);
        });
    });

    // ===== PERFORMANCE AND SCALABILITY =====
    describe('Performance and scalability', () => {
        test('handles multiple devices and keeps order in reports', () => {
            const monitor = new SmartHomeMonitor();
            const names = Array.from({ length: 20 }, (_, index) => `Device-${index}`);
            names.forEach((name, index) => {
                const device = buildDevice(name, index % 2 === 0 ? 'lab' : 'garage', 50 + index);
                if (index % 3 === 0) {
                    device.turnOn();
                }
                monitor.addDevice(device);
            });

            const report = monitor.getRoomReport('lab');
            console.log("TEST", monitor.smartRegistry.le)
            expect(report.devices).toEqual(names.filter((_, idx) => idx % 2 === 0));
            expect(report.activeDevices).toBe(4); // indexes 0,6,12,18
        });
    });
});

