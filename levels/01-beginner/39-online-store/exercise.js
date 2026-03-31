/**
 * Sistema de Gestión de Tienda Online (Online Store Management System)
 *
 * Descripción: Implementa tres clases básicas (`Product`, `Cart` y `Store`) para practicar
 * constructores, métodos de instancia, validaciones complejas, gestión de carrito de compras,
 * cálculos financieros y gestión de inventario.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 * - Responsabilidad Única: cada clase tiene un propósito claro
 * - Uso de métodos de arrays: find, filter, reduce
 */

/**
 * Representa un producto en la tienda.
 * Traducción: Producto
 * @class
 */
class Product {
    /**
     * Constructor de la clase Product
     * Traducción: Constructor de Producto
     *
     * Crea un nuevo producto con nombre, precio, stock y categoría.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {string} name - Nombre del producto (no puede estar vacío)
     * @param {number} price - Precio del producto (debe ser mayor que 0)
     * @param {number} stock - Cantidad en stock (debe ser >= 0)
     * @param {string} category - Categoría del producto (no puede estar vacío)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Product name is required" si el nombre es inválido
     * - Valida que price sea un número mayor que 0
     * - Lanza error "Product price must be greater than 0" si el precio es inválido
     * - Valida que stock sea un número mayor o igual a 0
     * - Lanza error "Product stock must be greater than or equal to 0" si el stock es inválido
     * - Valida que category sea un string no vacío (después de trim)
     * - Lanza error "Product category is required" si la categoría es inválida
     * - Asigna los valores validados a las propiedades correspondientes (usando trim para strings)
     */
    constructor(name, price, stock, category) {
        if (name.trim() === '' || typeof name !== 'string') throw new Error("Product name is required");
        if (price <= 0) throw new Error("Product price must be greater than 0");
        if (stock < 0) throw new Error("Product stock must be greater than or equal to 0");
        if (category.trim() === '' || typeof category !== 'string') throw new Error("Product category is required");

        this.name = name
        this.price = price
        this.stock = stock
        this.category = category


    }

    /**
     * Obtiene el precio del producto.
     * Traducción: Obtener Precio
     *
     * @returns {number} Precio del producto
     *
     * TODO:
     * - Retorna this.price
     */
    getPrice() {
        return this.price
    }

    /**
     * Obtiene el stock disponible.
     * Traducción: Obtener Stock
     *
     * @returns {number} Cantidad en stock
     *
     * TODO:
     * - Retorna this.stock
     */
    getStock() {
        return this.stock
    }

    /**
     * Obtiene la categoría del producto.
     * Traducción: Obtener Categoría
     *
     * @returns {string} Categoría del producto
     *
     * TODO:
     * - Retorna this.category
     */
    getCategory() {
        return this.category
    }

    /**
     * Verifica si el producto está disponible (tiene stock).
     * Traducción: Está Disponible
     *
     * @returns {boolean} true si stock > 0
     *
     * TODO:
     * - Retorna true si this.stock > 0
     * - Retorna false en caso contrario
     */
    isAvailable() {
        if (this.stock > 0) return true
        else return false
    }

    /**
     * Reduce el stock del producto.
     * Traducción: Reducir Stock
     *
     * @param {number} quantity - Cantidad a reducir
     * @returns {boolean} true si se redujo correctamente
     *
     * TODO:
     * - Valida que quantity sea un número mayor que 0
     * - Lanza error "Quantity must be greater than 0" si es inválido
     * - Valida que haya suficiente stock disponible (this.stock >= quantity)
     * - Lanza error "Insufficient stock" si no hay suficiente stock
     * - Reduce el stock: this.stock -= quantity
     * - Retorna true
     */
    reduceStock(quantity) {
        if (quantity <= 0) throw new Error("Quantity must be greater than 0");
        if (quantity >= this.stock) throw new Error("Insufficient stock");
        this.stock -= quantity
        return true


    }
}

/**
 * Representa un carrito de compras.
 * Traducción: Carrito
 * @class
 */
class Cart {
    /**
     * Constructor de la clase Cart
     * Traducción: Constructor de Carrito
     *
     * Crea un carrito vacío.
     *
     * TODO:
     * - Inicializa this.items como un array vacío
     * - Inicializa this.discount como 0
     */
    constructor() {
        this.items = []
        this.discount = 0
    }

    /**
     * Agrega un producto al carrito.
     * Traducción: Agregar Producto
     *
     * @param {Product} product - Producto a agregar
     * @param {number} quantity - Cantidad a agregar
     * @returns {boolean} true si se agregó correctamente
     *
     * TODO:
     * - Valida que product sea una instancia de Product
     * - Lanza error "Product must be an instance of Product" si es inválido
     * - Valida que quantity sea un número mayor que 0
     * - Lanza error "Quantity must be greater than 0" si es inválido
     * - Valida que el producto esté disponible usando isAvailable()
     * - Lanza error "Product is not available" si no está disponible
     * - Busca si el producto ya está en el carrito usando find()
     * - Si ya existe:
     *   - Calcula la nueva cantidad total (existingItem.quantity + quantity)
     *   - Valida que haya suficiente stock para la nueva cantidad total
     *   - Lanza error "Insufficient stock" si no hay suficiente stock
     *   - Actualiza la cantidad del item existente
     * - Si no existe:
     *   - Valida que haya suficiente stock para la cantidad solicitada
     *   - Lanza error "Insufficient stock" si no hay suficiente stock
     *   - Agrega un nuevo item al array: { product, quantity }
     * - Retorna true
     */
    addProduct(product, quantity) {
        if (!(product instanceof Product)) throw new Error("Product must be an instance of Product");
        if (quantity <= 0) throw new Error("Quantity must be greater than 0");
        if (!(product.isAvailable())) throw new Error("Product is not available");


        const findItem = this.items.find(item => item.product.name === product.name)


        if (findItem === undefined) {
            if (product.getStock() < quantity) throw new Error("Insufficient stock");
            else this.items.push({ product, quantity })
        } else {
            findItem.quantity += quantity
            // console.log(findItem, 'cambio de quantility')
            if (findItem.quantity > product.getStock()) throw new Error("Insufficient stock");
            const ind = this.items.findIndex(item => item.product.name === findItem.product.name)
            this.items[ind].quantity = findItem.quantity

        }

        return true
    }

    /**
     * Elimina un producto del carrito.
     * Traducción: Eliminar Producto
     *
     * @param {string} productName - Nombre del producto a eliminar
     * @returns {boolean} true si se eliminó, false si no se encontró
     *
     * TODO:
     * - Encuentra el índice del producto usando findIndex()
     *   - Compara item.product.name con productName
     * - Si no se encuentra (índice === -1), retorna false
     * - Elimina el item del array usando splice()
     * - Retorna true
     */
    removeProduct(productName) {
        const ind = this.items.findIndex(indd => indd.product.name === productName)
        if (ind === -1) return false
        else this.items.splice(ind, 1)
        return true
    }

    /**
     * Actualiza la cantidad de un producto en el carrito.
     * Traducción: Actualizar Cantidad
     *
     * @param {string} productName - Nombre del producto
     * @param {number} newQuantity - Nueva cantidad
     * @returns {boolean} true si se actualizó correctamente
     *
     * TODO:
     * - Valida que newQuantity sea un número mayor que 0
     * - Lanza error "Quantity must be greater than 0" si es inválido
     * - Busca el producto en el carrito usando find()
     * - Si no se encuentra, lanza error "Product not found in cart"
     * - Actualiza la cantidad del item: item.quantity = newQuantity
     * - Retorna true
     */
    updateQuantity(productName, newQuantity) {
        if (newQuantity <= 0) throw new Error("Quantity must be greater than 0");
        const product = this.items.find(item => item.product.name === productName)
        if (product === undefined) throw new Error("Product not found in cart");


        const ind = this.items.findIndex(ind => ind.product.name === product.product.name)
        this.items[ind].quantity = newQuantity
        return true
    }

    /**
     * Establece un descuento porcentual.
     * Traducción: Establecer Descuento
     *
     * @param {number} discountPercent - Porcentaje de descuento (0-100)
     * @returns {boolean} true si se estableció correctamente
     *
     * TODO:
     * - Valida que discountPercent sea un número entre 0 y 100
     * - Lanza error "Discount must be between 0 and 100" si es inválido
     * - Asigna this.discount = discountPercent
     * - Retorna true
     */
    setDiscount(discountPercent) {
        if (!(discountPercent <= 100 && discountPercent >= 0)) throw new Error("Discount must be between 0 and 100");
        this.discount = discountPercent
        return true

    }

    /**
     * Calcula el subtotal del carrito (sin descuento).
     * Traducción: Obtener Subtotal
     *
     * @returns {number} Subtotal del carrito
     *
     * TODO:
     * - Si el carrito está vacío (this.items.length === 0), retorna 0
     * - Usa reduce() para calcular el subtotal
     *   - Para cada item: suma (item.product.getPrice() * item.quantity)
     * - Retorna el subtotal
     */
    getSubtotal() {
        if (this.items.length === 0) return 0
        return this.items.reduce((contador, item) => {
            return contador + (item.product.getPrice() * item.quantity)
        }, 0)
    }

    /**
     * Calcula el total del carrito (con descuento aplicado).
     * Traducción: Obtener Total
     *
     * @returns {number} Total del carrito con descuento
     *
     * TODO:
     * - Calcula el subtotal usando getSubtotal()
     * - Calcula el monto del descuento: subtotal * (this.discount / 100)
     * - Calcula el total: subtotal - discountAmount
     * - Retorna el total
     */
    getTotal() {
        const subTotal = this.getSubtotal()
        const discount = subTotal * (this.discount / 100)
        const total = subTotal - discount
        return total
    }

    /**
     * Calcula el total de items en el carrito (suma de todas las cantidades).
     * Traducción: Obtener Total de Items
     *
     * @returns {number} Total de items en el carrito
     *
     * TODO:
     * - Si el carrito está vacío (this.items.length === 0), retorna 0
     * - Usa reduce() para sumar todas las cantidades
     *   - Para cada item: suma item.quantity
     * - Retorna el total
     */
    getTotalItems() {
        if (this.items.length === 0) return 0
        return this.items.reduce((contador, item) => {
            return contador + (item.quantity)
        }, 0)

    }

    /**
     * Vacía el carrito.
     * Traducción: Limpiar
     *
     * @returns {boolean} true si se limpió correctamente
     *
     * TODO:
     * - Vacía el array: this.items = []
     * - Resetea el descuento: this.discount = 0
     * - Retorna true
     */
    clear() {
        this.items = []
        this.discount = 0
        return true
    }
}

/**
 * Representa una tienda online.
 * Traducción: Tienda
 * @class
 */
class Store {
    /**
     * Constructor de la clase Store
     * Traducción: Constructor de Tienda
     *
     * Crea una nueva tienda con nombre.
     *
     * @param {string} name - Nombre de la tienda (no puede estar vacío)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Store name is required" si el nombre es inválido
     * - Asigna this.name con el nombre validado (usando trim)
     * - Inicializa this.products como un array vacío
     */
    constructor(name) {
        if (name.trim() === '' || typeof name !== 'string') throw new Error("Store name is required");
        this.name = name.trim()
        this.products = []

    }

    /**
     * Agrega un producto a la tienda.
     * Traducción: Agregar Producto
     *
     * @param {Product} product - Producto a agregar
     * @returns {Product} El producto agregado
     *
     * TODO:
     * - Valida que product sea una instancia de Product
     * - Lanza error "Product must be an instance of Product" si es inválido
     * - Verifica si ya existe un producto con ese nombre usando findProduct()
     * - Si ya existe, lanza error "Product already exists"
     * - Agrega el producto al array usando push()
     * - Retorna el producto agregado
     */
    addProduct(product) {
        if (!(product instanceof Product)) throw new Error("Product must be an instance of Product");
        const validationProduct = this.findProduct(product.name)
        if (validationProduct !== null) throw new Error("Product already exists");
        else this.products.push(product)
        return product


    }

    /**
     * Busca un producto por nombre.
     * Traducción: Buscar Producto
     *
     * @param {string} productName - Nombre del producto a buscar
     * @returns {Product|null} El producto encontrado o null si no existe
     *
     * TODO:
     * - Usa find() para buscar un producto cuyo name coincida exactamente con productName
     * - Retorna el producto encontrado o null si no existe
     */
    findProduct(productName) {
        const checking = this.products.find(prod => prod.name === productName)
        if (checking === undefined) return null
        else return checking
    }

    /**
     * Obtiene todos los productos disponibles (con stock > 0).
     * Traducción: Obtener Productos Disponibles
     *
     * @returns {Array<Product>} Array de productos disponibles
     *
     * TODO:
     * - Usa filter() para obtener productos disponibles
     * - Usa isAvailable() para verificar disponibilidad
     * - Retorna el array filtrado
     */
    getAvailableProducts() {
        const available = this.products.filter(prod => prod.isAvailable())
        return available
    }

    /**
     * Obtiene todos los productos de una categoría específica.
     * Traducción: Obtener Productos por Categoría
     *
     * @param {string} category - Categoría para filtrar
     * @returns {Array<Product>} Array de productos de la categoría especificada
     *
     * TODO:
     * - Usa filter() para obtener productos de la categoría especificada
     * - Usa getCategory() para obtener la categoría de cada producto
     * - Retorna el array filtrado
     */
    getProductsByCategory(category) {
        return this.products.filter(prod => prod.getCategory() === category)
    }

    /**
     * Procesa una compra del carrito.
     * Traducción: Procesar Compra
     *
     * Valida stock, reduce inventario y vacía el carrito.
     *
     * @param {Cart} cart - Carrito de compras a procesar
     * @returns {number} Total de la compra
     *
     * TODO:
     * - Valida que cart sea una instancia de Cart
     * - Lanza error "Cart must be an instance of Cart" si es inválido
     * - Valida que el carrito no esté vacío (cart.items.length > 0)
     * - Lanza error "Cart is empty" si está vacío
     * - Valida que todos los productos tengan suficiente stock disponible
     *   - Itera sobre cart.items usando forEach()
     *   - Para cada item, verifica: item.product.getStock() >= item.quantity
     *   - Si algún producto no tiene suficiente stock, lanza error "Insufficient stock for product: [nombre]"
     * - Reduce el stock de cada producto usando reduceStock()
     *   - Itera sobre cart.items usando forEach()
     *   - Llama item.product.reduceStock(item.quantity) para cada item
     * - Calcula el total usando cart.getTotal()
     * - Vacía el carrito usando cart.clear()
     * - Retorna el total de la compra
     */
    processPurchase(cart) {
        if (!(cart instanceof Cart)) throw new Error("Cart must be an instance of Cart");
        if (cart.items.length <= 0) throw new Error("Cart is empty");
        cart.items.forEach(item => { if (item.product.getStock() <= item.quantity) throw new Error(`Insufficient stock for product: ${item.product.name}`); });

        cart.items.forEach(item => item.product.reduceStock(item.quantity))
        // total
        const total = cart.getTotal()
        cart.clear()
        return total


    }

    /**
     * Calcula el valor total del inventario.
     * Traducción: Obtener Valor del Inventario
     *
     * @returns {number} Valor total del inventario (precio × stock de todos los productos)
     *
     * TODO:
     * - Si no hay productos (this.products.length === 0), retorna 0
     * - Usa reduce() para calcular el valor total
     *   - Para cada producto: suma (product.getPrice() * product.getStock())
     * - Retorna el valor total
     */
    getInventoryValue() {
        if (this.products.length === 0) return 0
        return this.products.reduce((contador, item) => {
            return contador + (item.getPrice() * item.getStock())
        }, 0)
    }
}

const caraotas = new Product('caraotas', 1, 44, 'granos')
const arbejas = new Product('arbejas', 1, 44, 'granos')
const pollo = new Product('pollo', 1, 44, 'pollos')
// console.log(caraotas.getCategory())
// console.log(caraotas.getPrice())
// console.log(caraotas.getStock())
// console.log(caraotas.isAvailable())
// console.log(caraotas.reduceStock(34))
// console.log(caraotas)

console.log(caraotas)
console.log(arbejas)
const carrito1 = new Cart()
console.log(carrito1.addProduct(caraotas, 1))
console.log(carrito1.addProduct(caraotas, 10))
console.log(carrito1.addProduct(arbejas, 1))
console.log(carrito1.addProduct(arbejas, 22))
console.log(carrito1.updateQuantity('caraotas', 12))
console.log(carrito1.setDiscount(10))
console.log(carrito1.getSubtotal())
console.log(carrito1.getTotal())
console.log(carrito1.getTotalItems())
// console.log(carrito1.clear())
console.log(carrito1)
console.log('//////////////////////')
console.log('//////////////////////')

const storeArmando = new Store('storeArmando')
console.log(storeArmando.addProduct(caraotas))
console.log(storeArmando.addProduct(arbejas))
console.log(storeArmando.addProduct(pollo))
console.log(storeArmando.getAvailableProducts())
console.log(storeArmando.getProductsByCategory('pollos'))
console.log(storeArmando.processPurchase(carrito1))
console.log(storeArmando.getInventoryValue())
console.log(storeArmando)



module.exports = {
    Product,
    Cart,
    Store
};
