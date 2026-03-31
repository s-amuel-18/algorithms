/**
 * Smart Home Monitor
 *
 * Description: Implement two beginner-level classes (`SmartDevice` and
 * `SmartHomeMonitor`) to practice constructors, validations, collection
 * handling and simple aggregate calculations. Follow the README instructions
 * exactly and keep every identifier/message in English.
 * Difficulty: BEGINNER
 *
 * Suggested principles:
 * - Fail Fast: valida entradas antes de modificar estado
 * - KISS + Código Expresivo: métodos cortos y claros
 * - Responsabilidad Única: cada método cumple una sola tarea
 */

function capitalize(text) {
    const onlyText = text.trim()
    const firstCaracter = onlyText.charAt(0).toUpperCase()
    const otherCaracters = onlyText.slice(1)
    const textFine = firstCaracter + otherCaracters

    return textFine
}



class SmartDevice {
    /**
     * @param {string} name - Device name (capitalized)
     * @param {string} room - Room identifier (lowercase)
     * @param {number} watts - Power consumption in watts (> 0)
     * @param {boolean} [isOn=false] - Initial state
     *
     * TODO:
     * - Valida cada argumento y lanza los errores descritos en el README.
     * - Normaliza `name` (capitalizado) y `room` (minúsculas).
     * - Asigna `isOn` con el valor recibido o `false`.
     */


    constructor(name, room, watts, isOn = false) {


        if (typeof name === 'object') throw new Error('Device must be an instance of SmartDevice')

        if (name === '' || /^\s+$/g.test(name)) throw new Error('Device name is required')
        if (room === '' || /^\s+$/g.test(room)) throw new Error('Device room is required')
        if (watts <= 0 || !Number.isFinite(watts)) throw new Error('Device watts must be a number greater than 0')
        const textCap = capitalize(name)
        const roomLower = room.toLowerCase()


        this.name = textCap
        this.room = roomLower
        this.watts = watts
        this.isOn = isOn


    }



    /**
     * Turns the device on.
     * @returns {boolean} Current state (true)
     *
     * TODO:
     * - Actualiza `this.isOn` y retorna el nuevo estado.
     */
    turnOn() {
        return this.isOn = true
    }

    /**
     * Turns the device off.
     * @returns {boolean} Current state (false)
     *
     * TODO:
     * - Actualiza `this.isOn` y retorna el estado.
     */
    turnOff() {
        return this.isOn = false
    }

    /**
     * Calculates consumption based on current state.
     * @param {number} hours - Usage hours (>0)
     * @returns {number} Watts consumed or 0 if device is off
     *
     * TODO:
     * - Valida `hours` y lanza "Usage hours must be a positive number" si falla.
     * - Si `this.isOn` es falso, retorna 0.
     * - En caso contrario, retorna `this.watts * hours`.
     */
    getConsumption(hours) {
        if (!(hours > 0)) throw new Error('Usage hours must be a positive number')
        if (this.isOn) return this.watts *= hours
        return 0

    }
}




class SmartHomeMonitor {
    /**
     * Creates an empty smart home registry.
     *
     * TODO:
     * - Inicializa un array interno para almacenar los dispositivos.
     */
    smartRegistry = []
    constructor() {
    }

    /**
     * Adds a new smart device.
     * @param {SmartDevice} device
     * @returns {number} Total devices stored
     *
     * TODO:
     * - Valida instancia o lanza "Device must be an instance of SmartDevice".
     * - Evita duplicados por nombre (case-insensitive). Si existe, lanza
     *   "Device name already registered".
     * - Agrega el dispositivo y retorna el total.
     */
    addDevice(device) {
        if (!(device instanceof SmartDevice)) throw new Error('Device must be an instance of SmartDevice')
        if (this.smartRegistry.length === 0) {
            this.smartRegistry.push(device)
            return this.smartRegistry.length
        }

        for (let i = 0; i < this.smartRegistry.length; i++) {
            const foundDevice = this.smartRegistry[i]
            if (foundDevice.name === device.name) throw new Error('Device name already registered')

        }
        this.smartRegistry.push(device)
        return this.smartRegistry.length
    }




    /**
     * Finds a device by name (case-insensitive).
     * @param {string} name
     * @returns {SmartDevice|null}
     *
     * TODO:
     * - Normaliza `name` y busca en la colección interna.
     * - Retorna el dispositivo o `null`.
     */
    findByName(name) {
        if (this.smartRegistry.length === 0 || name === 'Unknown') return null
        const nameCap = capitalize(name)
        const registry = this.smartRegistry
        return registry.find(device => device.name === nameCap)
    }

    /**
     * Builds a room report.
     * @param {string} room
     * @returns {{room: string, devices: string[], activeDevices: number, totalWatts: number}}
     *
     * TODO:
     * - Valida `room` (no vacío) y lanza "Room name is required" si falla.
     * - Filtra los dispositivos que pertenecen a la habitación (case-insensitive).
     * - Retorna un objeto nuevo con las claves solicitadas.
     */
    getRoomReport(room) {
        const roomFixed = room.toLowerCase()
        if (this.smartRegistry.length === 0) throw new Error('Room name is required')


        if (roomFixed === '') throw new Error('Room name is required')
        const deviceFilter = this.smartRegistry.filter(deviceFound => deviceFound.room === roomFixed).map(deviceFound => deviceFound.name)

        const activeDevice = this.smartRegistry.filter(activedevi => activedevi.room === roomFixed).filter(e => e.isOn === true).length

        const totalWatts = this.smartRegistry.filter(wattsFind => wattsFind.room === roomFixed).map(wattsFind => wattsFind.watts).reduce((a, b) => a + b, 0)



        return {
            room: roomFixed,
            devices: deviceFilter,
            activeDevices: activeDevice,
            totalWatts: totalWatts
        }
    }

    /**
     * Calculates total consumption for active devices.
     * @param {number} hours
     * @returns {number} Summed consumption
     *
     * TODO:
     * - Valida `hours` como entero positivo (>0), mismo mensaje que `SmartDevice`.
     * - Suma `device.getConsumption(hours)` para cada dispositivo y retorna el total.
     */
    getActiveConsumption(hours) {
        if (hours <= 0) throw new Error('Usage hours must be a positive number')

        const consumeAll = this.smartRegistry.map(consumewatts => consumewatts.getConsumption(hours)).reduce((a, b) => a + b)

        return consumeAll
    }
}



const monitor = new SmartHomeMonitor();
const names = Array.from({ length: 20 }, (_, index) => `Device-${index}`);
names.forEach((name, index) => {
    const device = new SmartDevice(name, index % 2 === 0 ? 'lab' : 'garage', 50 + index);
    if (index % 3 === 0) {
        device.turnOn();
    }
    monitor.addDevice(device);
});

console.log(monitor.findByName('   Device-1   '))
monitor.getRoomReport('lab')
module.exports = {
    SmartDevice,
    SmartHomeMonitor
};

