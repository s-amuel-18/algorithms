/**
 * Sistema de Gestión de Restaurante (Restaurant Management System)
 *
 * Descripción: Implementa tres clases básicas (`Menu`, `Order` y `Restaurant`) para practicar
 * constructores, métodos de instancia, validaciones complejas, cálculos financieros y gestión
 * de relaciones entre múltiples clases.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 * - Responsabilidad Única: cada clase tiene un propósito claro
 * - Uso de métodos de arrays: find, filter, reduce
 */

/**
 * Representa un menú de platos del restaurante.
 * Traducción: Menú
 * @class
 */
class Menu {
    /**
     * Constructor de la clase Menu
     * Traducción: Constructor de Menú
     *
     * Crea un nuevo menú con nombre y descripción.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {string} name - Nombre del menú (no puede estar vacío)
     * @param {string} description - Descripción del menú (no puede estar vacío)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Menu name is required" si el nombre es inválido
     * - Valida que description sea un string no vacío (después de trim)
     * - Lanza error "Menu description is required" si la descripción es inválida
     * - Inicializa this.dishes como un array vacío []
     * - Asigna los valores validados a this.name y this.description
     */
    constructor(name, description) {
        if (name === '' || typeof name !== 'string') throw new Error('Menu name is required')
        const nameFixed = name.trim()
        if (nameFixed === '') throw new Error('Menu name is required')

        if (description === '' || typeof description !== 'string') throw new Error('Menu description is required')
        const descriptionFixed = description.trim()
        if (descriptionFixed === '') throw new Error('Menu description is required')

        this.dishes = []
        this.name = nameFixed
        this.description = descriptionFixed

    }

    /**
     * Agrega un plato al menú.
     * Traducción: Agregar Plato
     *
     * Este método agrega un plato al menú. El plato debe ser un objeto con las propiedades:
     * name (string), price (number > 0), category (string), stock (number >= 0).
     * Debe validar que el plato tenga todas las propiedades requeridas y que no exista
     * ya un plato con el mismo nombre.
     *
     * @param {Object} dish - Objeto con propiedades: name, price, category, stock
     * @returns {Object} El plato agregado
     *
     * TODO:
     * - Valida que dish sea un objeto
     * - Valida que dish.name sea un string no vacío
     * - Lanza error "Dish name is required" si el nombre es inválido
     * - Valida que dish.price sea un número mayor que 0
     * - Lanza error "Dish price must be greater than 0" si el precio es inválido
     * - Valida que dish.category sea un string no vacío
     * - Lanza error "Dish category is required" si la categoría es inválida
     * - Valida que dish.stock sea un número mayor o igual a 0
     * - Lanza error "Dish stock must be greater than or equal to 0" si el stock es inválido
     * 
     * - Usa findDish() para verificar si ya existe un plato con ese nombre
     * - Si el plato existe, lanza un error con el mensaje: "Dish already exists"
     * - Agrega el plato al array this.dishes usando push()
     * - Retorna el plato agregado
     */
    addDish(dish) {
        if (!(dish instanceof Object)) throw new Error('lo ingresado no es un objeto')
        if (dish.name === '' || typeof dish.name !== 'string') throw new Error('Dish name is required')
        if (dish.price <= 0) throw new Error('Dish price must be greater than 0')
        if (dish.category === '' || typeof dish.category !== 'string') throw new Error('Dish category is required')
        if (dish.stock < 0) throw new Error('Dish stock must be greater than or equal to 0')

        const validationDish = this.findDish(dish.name)
        if (validationDish instanceof Object) throw new Error('Dish already exists')
        this.dishes.push(dish)
        return dish
    }

    /**
     * Busca un plato por su nombre usando find().
     * Traducción: Buscar Plato
     *
     * Este método busca un plato cuyo name coincida exactamente con el parámetro recibido.
     * La búsqueda es case-sensitive (distingue entre mayúsculas y minúsculas).
     *
     * @param {string} dishName - Nombre del plato a buscar
     * @returns {Object|null} El plato encontrado o null si no existe
     *
     * TODO:
     * - Usa this.dishes.find() para buscar un plato cuyo name coincida exactamente
     * - Retorna el plato encontrado o null si no se encuentra
     */
    findDish(dishName) {
        const validationDish = this.dishes.find(arry => arry.name === dishName)
        if (validationDish === undefined) return null
        else return validationDish
    }

    /**
     * Elimina un plato del menú.
     * Traducción: Eliminar Plato
     *
     * Este método elimina un plato del menú buscándolo por nombre.
     * Si el plato no existe, debe lanzar un error.
     *
     * @param {string} dishName - Nombre del plato a eliminar
     * @returns {boolean} true si se eliminó correctamente
     *
     * TODO:
     * - Usa findDish() para buscar el plato por nombre
     * - Si no se encuentra, lanza un error con el mensaje: "Dish not found"
     * - Encuentra el índice del plato usando findIndex()
     * - Elimina el plato del array this.dishes usando splice()
     * - Retorna true si se eliminó correctamente
     */
    removeDish(dishName) {
        const validationName = this.dishes.find(dish => dish.name === dishName)
        if (validationName === undefined) throw new Error('Dish not found')
        const dishIndex = this.dishes.findIndex(val => val.name === dishName)
        this.dishes.splice(dishIndex, 1)
        return true
    }

    /**
     * Obtiene todos los platos disponibles (con stock > 0) usando filter().
     * Traducción: Obtener Platos Disponibles
     *
     * Este método retorna un nuevo array con todos los platos que tienen stock mayor que 0.
     * Debe usar el método filter() del array.
     *
     * @returns {Object[]} Array con los platos disponibles
     *
     * TODO:
     * - Usa this.dishes.filter() para filtrar platos
     * - Filtra platos donde dish.stock > 0
     * - Retorna el nuevo array filtrado
     */
    getAvailableDishes() {
        const allArry = this.dishes.filter(dish => dish.stock > 0)
        return allArry
    }

    /**
     * Obtiene todos los platos de una categoría específica usando filter().
     * Traducción: Obtener Platos por Categoría
     *
     * Este método retorna un nuevo array con todos los platos de la categoría especificada.
     * Debe usar el método filter() del array.
     *
     * @param {string} category - Categoría a filtrar
     * @returns {Object[]} Array con los platos de esa categoría
     *
     * TODO:
     * - Usa this.dishes.filter() para filtrar platos
     * - Filtra platos donde dish.category === category
     * - Retorna el nuevo array filtrado
     */
    getDishesByCategory(category) {
        const categoryDishes = this.dishes.filter(dishes => dishes.category === category)
        return categoryDishes
    }
}

/**
 * Representa una orden del restaurante.
 * Traducción: Orden
 * @class
 */
class Order {
    /**
     * Constructor de la clase Order
     * Traducción: Constructor de Orden
     *
     * Crea una nueva orden con número de mesa y nombre del mesero.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {number} tableNumber - Número de mesa (debe ser mayor que 0)
     * @param {string} waiterName - Nombre del mesero (no puede estar vacío)
     *
     * TODO:
     * - Valida que tableNumber sea un número mayor que 0
     * - Lanza error "Table number must be greater than 0" si el número es inválido
     * - Valida que waiterName sea un string no vacío (después de trim)
     * - Lanza error "Waiter name is required" si el nombre es inválido
     * - Inicializa this.items como un array vacío []
     * - Inicializa this.completed como false
     * - Asigna los valores validados a this.tableNumber y this.waiterName
     */
    constructor(tableNumber, waiterName) {
        if (tableNumber <= 0) throw new Error('Table number must be greater than 0')
        if (waiterName === '' || typeof waiterName !== 'string') throw new Error('Waiter name is required')
        const waiterFixed = waiterName.trim()
        if (waiterFixed === '') throw new Error('Waiter name is required')


        this.items = []
        this.completed = false
        this.tableNumber = tableNumber
        this.waiterName = waiterFixed
    }

    /**
     * Agrega un plato a la orden.
     * Traducción: Agregar Item
     *
     * Este método agrega un plato a la orden. Debe validar que el plato exista en el menú
     * y que haya stock suficiente. Si el plato ya está en la orden, suma la cantidad.
     *
     * @param {Object} menu - Instancia de Menu que contiene los platos
     * @param {string} dishName - Nombre del plato a agregar
     * @param {number} quantity - Cantidad a agregar (debe ser mayor que 0)
     * @returns {boolean} true si se agregó correctamente
     *
     * TODO:
     * - Valida que menu sea una instancia de Menu
     * - Lanza error "Menu must be an instance of Menu" si es inválido
     * - Usa menu.findDish() para buscar el plato
     * - Si el plato no existe, lanza un error: "Dish not found in menu"
     * - Valida que quantity sea un número mayor que 0     * 
     * - Lanza error "Quantity must be greater than 0" si la cantidad es inválida
     * - Verifica que dish.stock >= quantity (stock suficiente)     * 
     * - Lanza error "Insufficient stock" si no hay stock suficiente
     * - Busca si el plato ya está en this.items usando find()
     * 
     * - Si existe, suma la cantidad al item existente
     * - Si no existe, agrega un nuevo item: { dishName, quantity, price: dish.price }
     * - Retorna true si se agregó correctamente
     */
    addItem(menu, dishName, quantity) {
        if (!(menu instanceof Menu)) throw new Error('Menu must be an instance of Menu')
        const validationDish = menu.findDish(dishName)
        if (validationDish === null) throw new Error('Dish not found in menu')
        if (quantity <= 0) throw new Error('Quantity must be greater than 0')
        if (validationDish.stock < quantity) throw new Error('Insufficient stock')

        const validationItems = this.items.find(plato => plato.dishName === dishName)

        if (validationItems === undefined) {
            this.items.push({
                dishName: dishName,
                quantity: quantity,
                price: validationDish.price

            })
            return true
        } else {
            const validationItemsIndex = this.items.findIndex(plato => plato.dishName === dishName)
            return this.items[validationItemsIndex].quantity += quantity 
        }

    }

    /**
     * Elimina un plato de la orden.
     * Traducción: Eliminar Item
     *
     * Este método elimina un plato de la orden buscándolo por nombre.
     *
     * @param {string} dishName - Nombre del plato a eliminar
     * @returns {boolean} true si se eliminó correctamente
     *
     * TODO:
     * - Busca el índice del item en this.items usando findIndex()
     * - Si no se encuentra, retorna false
     * - Elimina el item del array usando splice()
     * - Retorna true si se eliminó correctamente
     */
    removeItem(dishName) {
        const findItem = this.items.findIndex(dish => dish.dishName === dishName)
        if (findItem === -1) return false
        this.items.splice(findItem, 1)
        return true
    }

    /**
     * Calcula el subtotal de la orden usando reduce().
     * Traducción: Calcular Subtotal
     *
     * Este método calcula el subtotal sumando (precio × cantidad) de todos los items.
     * Debe usar el método reduce() del array.
     *
     * @returns {number} El subtotal de la orden
     *
     * TODO:
     * - Usa this.items.reduce() para calcular el total
     * - Para cada item, suma (item.price * item.quantity) al acumulador
     * - Retorna el subtotal
     * - Si no hay items, retorna 0
     */
    calculateSubtotal() {
        if (this.items.length === 0) return 0
        return this.items.reduce((acumulador, item) => {
            return acumulador + (item.price * item.quantity)
        }, 0)

    }

    /**
     * Calcula los impuestos (8% del subtotal).
     * Traducción: Calcular Impuestos
     *
     * Este método calcula los impuestos aplicando una tasa del 8% sobre el subtotal.
     *
     * @returns {number} El monto de impuestos
     *
     * TODO:
     * - Calcula el subtotal usando calculateSubtotal()
     * - Calcula los impuestos: subtotal * 0.08
     * - Retorna el monto de impuestos
     */
    calculateTaxes() {
        const subTotal = this.calculateSubtotal()
        const taxes = subTotal * 0.08
        return taxes
    }

    /**
     * Calcula el total de la orden (subtotal + impuestos).
     * Traducción: Calcular Total
     *
     * Este método calcula el total final sumando subtotal e impuestos.
     *
     * @returns {number} El total de la orden
     *
     * TODO:
     * - Calcula el subtotal usando calculateSubtotal()
     * - Calcula los impuestos usando calculateTaxes()
     * - Suma subtotal + impuestos
     * - Retorna el total
     */
    calculateTotal() {
        const subtotal = this.calculateSubtotal()
        const taxes = this.calculateTaxes()
        const AllPay = subtotal + taxes
        return AllPay
    }

    /**
     * Marca la orden como completada.
     * Traducción: Marcar como Completada
     *
     * Este método cambia el estado de la orden a completada.
     *
     * @returns {boolean} true si se marcó como completada
     *
     * TODO:
     * - Cambia this.completed a true
     * - Retorna true
     */
    markAsCompleted() {
        this.completed = true
        return true
    }
}

/**
 * Gestiona el restaurante y sus operaciones.
 * Traducción: Restaurante
 * @class
 */
class Restaurant {
    /**
     * Constructor de la clase Restaurant
     * Traducción: Constructor de Restaurante
     *
     * Crea un nuevo restaurante con nombre.
     * Inicializa arrays vacíos para menús y órdenes.
     *
     * @param {string} name - Nombre del restaurante (no puede estar vacío)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Restaurant name is required" si el nombre es inválido
     * - Inicializa this.menus como un array vacío []
     * - Inicializa this.orders como un array vacío []
     * - Asigna el nombre validado a this.name
     */
    constructor(name) {
        if (typeof name !== 'string') throw new Error('Restaurant name is required')
        const nameFixed = name.trim()
        if (nameFixed === '') throw new Error('Restaurant name is required')

        this.menus = []
        this.orders = []
        this.name = nameFixed
    }

    /**
     * Agrega un menú al restaurante.
     * Traducción: Agregar Menú
     *
     * Este método agrega un menú al restaurante. Debe validar que sea una instancia de Menu.
     *
     * @param {Menu} menu - Instancia de Menu a agregar
     * @returns {Menu} El menú agregado
     *
     * TODO:
     * - Valida que menu sea una instancia de Menu
     * - Lanza error "Menu must be an instance of Menu" si es inválido
     * - Agrega el menú al array this.menus usando push()
     * - Retorna el menú agregado
     */
    addMenu(menu) {
        if (!(menu instanceof Menu)) throw new Error('Menu must be an instance of Menu')
        this.menus.push(menu)
        return menu
    }

    /**
     * Crea una nueva orden.
     * Traducción: Crear Orden
     *
     * Este método crea una nueva orden y la agrega al restaurante.
     *
     * @param {number} tableNumber - Número de mesa
     * @param {string} waiterName - Nombre del mesero
     * @returns {Order} La orden creada
     *
     * TODO:
     * - Crea una nueva instancia de Order con tableNumber y waiterName
     * - Agrega la orden al array this.orders usando push()
     * - Retorna la orden creada
     */
    createOrder(tableNumber, waiterName) {
        const createOrder = new Order(tableNumber, waiterName)
        this.orders.push(createOrder)
        return createOrder
    }

    /**
     * Busca una orden por índice.
     * Traducción: Obtener Orden
     *
     * Este método busca una orden por su índice en el array de órdenes.
     *
     * @param {number} orderIndex - Índice de la orden (debe ser válido)
     * @returns {Order|null} La orden encontrada o null si no existe
     *
     * TODO:
     * - Valida que orderIndex sea un número válido (>= 0 y < this.orders.length)
     * - Si el índice es inválido, retorna null
     * - Retorna la orden en el índice especificado
     */
    getOrder(orderIndex) {
        if (!(orderIndex >= 0 && orderIndex < this.orders.length)) return null
        return this.orders[orderIndex]
    }

    /**
     * Obtiene todas las órdenes activas (no completadas) usando filter().
     * Traducción: Obtener Órdenes Activas
     *
     * Este método retorna un nuevo array con todas las órdenes que no están completadas.
     * Debe usar el método filter() del array.
     *
     * @returns {Order[]} Array con las órdenes activas
     *
     * TODO:
     * - Usa this.orders.filter() para filtrar órdenes
     * - Filtra órdenes donde order.completed === false
     * - Retorna el nuevo array filtrado
     */
    getActiveOrders() {
        const ordersActive = this.orders.filter(active => active.completed === false)
        return ordersActive
    }

    /**
     * Calcula los ingresos totales de órdenes completadas usando reduce().
     * Traducción: Obtener Ingresos
     *
     * Este método calcula los ingresos totales sumando el total de todas las órdenes completadas.
     * Debe usar el método reduce() del array.
     *
     * @returns {number} Total de ingresos
     *
     * TODO:
     * - Filtra las órdenes completadas usando filter()
     * - Usa reduce() sobre las órdenes completadas
     * - Para cada orden, suma order.calculateTotal() al acumulador
     * - Retorna el total de ingresos
     * - Si no hay órdenes completadas, retorna 0
     */
    getRevenue() {
        const ordersCompleted = this.orders.filter(order => order.completed === true)
        return ordersCompleted.reduce((count, pagos) => {
            return count + (pagos.calculateTotal())
        }, 0)
    }
}



const menu1 = new Menu('Menu Principal', 'comida candela creada por armando el papi')
menu1.addDish({
    name: 'Pasta Carbonara',
    price: 16.50,
    category: 'Main Course',
    stock: 1000
})
menu1.addDish({
    name: 'Pasta putanesca',
    price: 15.99,
    category: 'Sweet',
    stock: 10
})
console.log(menu1)

const mesonero1 = new Order(1, 'Samuel Graterol')
console.log(mesonero1.addItem(menu1, 'Pasta Carbonara', 5))
console.log(mesonero1.addItem(menu1, 'Pasta Carbonara', 5))
console.log('//////////////////////')
console.log(mesonero1.removeItem('Pasta'))
console.log(mesonero1.calculateSubtotal())
console.log(mesonero1.calculateTaxes())
console.log(mesonero1.calculateTotal())
console.log(mesonero1.markAsCompleted())
console.log(mesonero1)

const restaurant1 = new Restaurant('La granDota')
console.log(restaurant1)
restaurant1.addMenu(menu1)
console.log(restaurant1.createOrder(2, 'Erick Toro'))
console.log(restaurant1.getOrder(0), '////////')
console.log(restaurant1.getActiveOrders())
console.log(restaurant1.orders[0].addItem(menu1, 'Pasta putanesca', 2))
console.log(restaurant1.orders[0].addItem(menu1, 'Pasta putanesca', 2))
console.log(restaurant1.orders[0].markAsCompleted())
console.log(restaurant1.orders[0].items)
console.log(restaurant1.getRevenue())

console.log('//////////////////////')
// console.log(menu1.removeDish('Plato Inexistente'))
console.log('//////////////////////')
console.log(restaurant1.orders[0])







module.exports = {
    Menu,
    Order,
    Restaurant
};

