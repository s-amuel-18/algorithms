/**
 * Sistema de books (Library System)
 *
 * Descripción: Implementa dos clases básicas (`Book` y `Library`) para practicar
 * constructores, métodos de instancia, validaciones básicas y gestión de estado.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 * - Responsabilidad Única: cada clase tiene un propósito claro
 * - Uso de métodos de arrays: find
 */

/**
 * Representa un libro en la books.
 * Traducción: Libro
 * @class
 */
class Book {
  /**
   * Constructor de la clase Book
   * Traducción: Constructor de Libro
   *
   * Crea un nuevo libro con título, autor e ISBN.
   * Inicializa el libro como disponible por defecto.
   *
   * @param {string} title - Título del libro
   * @param {string} author - Autor del libro
   * @param {string} isbn - ISBN del libro
   *
   * TODO:
   * - Asigna this.title = title
   * - Asigna this.author = author
   * - Asigna this.isbn = isbn
   * - Inicializa this.isAvailable = true (el libro está disponible por defecto)
   */
  constructor(title, author, isbn) {
    this.title = title,
      this.author = author,
      this.isbn = isbn,
      this.isAvailable = true

  }


  /**
   * Alterna el estado de disponibilidad del libro.
   * Traducción: Alternar Disponibilidad
   *
   * Este método cambia el estado de disponibilidad del libro.
   * Si está disponible (true), lo marca como no disponible (false) y viceversa.
   *
   * @returns {boolean} El nuevo estado de disponibilidad
   *
   * TODO:
   * - Cambia this.isAvailable al valor opuesto (si es true, lo pone en false y viceversa)
   * - Retorna el nuevo valor de this.isAvailable
   */
  toggleAvailability() {
    if (this.isAvailable) this.isAvailable = false
    else this.isAvailable = true
  }
}



const libro1 = new Book('The Hobbit', 'J.R.R. Tolkien', '123')
const libro2 = new Book('The ....', 'J.R.R. ', '12')
const libro3 = new Book('The carrl', ' Tolkien', '13')


/**
 * Gestiona la books y sus operaciones.
 * Traducción: books
 * @class
 */
class Library {
  /**
   * Constructor de la clase Library
   * Traducción: Constructor de books
   *
   * Crea una nueva books.
   * Inicializa un array vacío para libros.
   *
   * TODO:
   * - Inicializa this.books como un array vacío []
   */

  books = []

  constructor() {

  }

  /**
   * Agrega un libro a la books.
   * Traducción: Agregar Libro
   *
   * Este método agrega un libro al array de libros de la books.
   *
   * @param {Book} book - Instancia de Book a agregar
   * @returns {Book} El libro agregado
   *
   * TODO:
   * - Agrega el libro al array this.books usando push()
   * - Retorna el libro agregado
   */
  addBook(book) {
    if (!(book instanceof Book)) throw new Error('el elemnto no es instancia')
    this.books.push(book)

    return book
  }

  /**
   * Busca un libro por ISBN usando find().
   * Traducción: Buscar Libro
   *
   * Este método busca un libro cuyo ISBN coincida exactamente con el parámetro recibido.
   * Debe usar el método find() del array.
   *
   * @param {string} isbn - ISBN del libro a buscar
   * @returns {Book|undefined} El libro encontrado o undefined si no existe
   *
   * TODO:
   * - Usa this.books.find() para buscar un libro cuyo isbn coincida exactamente
   * - Retorna el libro encontrado o undefined si no se encuentra
   */
  findBook(isbn) {
    const bookFound = this.books.find(books => books.isbn === isbn)
    return bookFound
  }

  /**
   * Presta un libro de la books.
   * Traducción: Prestar Libro
   *
   * Este método presta un libro si está disponible.
   * Marca el libro como no disponible después de prestarlo.
   *
   * @param {string} isbn - ISBN del libro a prestar
   * @returns {Book|null} El libro prestado o null si no está disponible o no existe
   *
   * TODO:
   * - Busca el libro usando findBook(isbn)
   * - Si el libro no existe, retorna null
   * - Si el libro no está disponible (isAvailable === false), retorna null
   * - Si el libro está disponible, marca isAvailable = false usando toggleAvailability()
   * - Retorna el libro prestado
   */
  borrowBook(isbn) {
    const searchBook = this.findBook(isbn)
    if (searchBook === undefined) return null
    if (searchBook instanceof Book && !searchBook.isAvailable) return null
    if (searchBook instanceof Book) searchBook.toggleAvailability()
    return searchBook
  }

  /**
   * Devuelve un libro prestado a la books.
   * Traducción: Devolver Libro
   *
   * Este método devuelve un libro prestado y lo marca como disponible.
   *
   * @param {string} isbn - ISBN del libro a devolver
   * @returns {Book|null} El libro devuelto o null si ya está disponible o no existe
   *
   * TODO:
   * - Busca el libro usando findBook(isbn)
   * - Si el libro no existe, retorna null
   * - Si el libro ya está disponible (isAvailable === true), retorna null
   * - Si el libro está prestado, marca isAvailable = true usando toggleAvailability()
   * - Retorna el libro devuelto
   */
  returnBook(isbn) {
    const searchBook = this.findBook(isbn)
    console.log(searchBook)
    if (searchBook === undefined) return null
    if (searchBook.isAvailable) return null
    if (!searchBook.isAvailable) searchBook.toggleAvailability()
    return searchBook
  }
}


const books = new Library()
books.addBook(libro1)
books.addBook(libro2)
books.addBook(libro3)

console.log(books)
console.log(books.findBook('123'))
console.log(books.borrowBook('123'))
console.log(books.returnBook('13'))

module.exports = { Book, Library };
