/**
 * Sistema de Gestión de Biblioteca de Música (Music Library Management System)
 *
 * Descripción: Implementa tres clases básicas (`Song`, `Playlist` y `MusicLibrary`) para practicar
 * constructores, métodos de instancia, validaciones complejas, gestión de listas de reproducción,
 * cálculos de duración y búsqueda avanzada de canciones.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 * - Responsabilidad Única: cada clase tiene un propósito claro
 * - Uso de métodos de arrays: find, filter, reduce, some
 */

/**
 * Representa una canción.
 * Traducción: Canción
 * @class
 */
class Song {
    /**
     * Constructor de la clase Song
     * Traducción: Constructor de Canción
     *
     * Crea una nueva canción con título, artista, duración y género.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {string} title - Título de la canción (no puede estar vacío)
     * @param {string} artist - Artista de la canción (no puede estar vacío)
     * @param {number} duration - Duración en segundos (debe ser mayor que 0)
     * @param {string} genre - Género musical (no puede estar vacío)
     *
     * TODO:
     * - Valida que title sea un string no vacío (después de trim)
     * - Lanza error "Song title is required" si el título es inválido
     * - Valida que artist sea un string no vacío (después de trim)
     * - Lanza error "Song artist is required" si el artista es inválido
     * - Valida que duration sea un número mayor que 0
     * - Lanza error "Song duration must be greater than 0" si la duración es inválida
     * - Valida que genre sea un string no vacío (después de trim)
     * - Lanza error "Song genre is required" si el género es inválido
     * - Asigna los valores validados a las propiedades correspondientes
     */
    constructor(title, artist, duration, genre) {
        if (title.trim() === '' || typeof title !== 'string') throw new Error("Song title is required");
        if (artist.trim() === '' || typeof artist !== 'string') throw new Error("Song artist is required");
        if (duration <= 0) throw new Error("Song duration must be greater than 0");
        if (genre.trim() === '' || typeof genre !== 'string') throw new Error("Song genre is required");

        this.title = title
        this.artist = artist
        this.duration = duration
        this.genre = genre
    }

    /**
     * Obtiene la duración en segundos.
     * Traducción: Obtener Duración
     *
     * @returns {number} Duración en segundos
     *
     * TODO:
     * - Retorna this.duration
     */
    getDuration() {
        return this.duration
    }

    /**
     * Obtiene el artista de la canción.
     * Traducción: Obtener Artista
     *
     * @returns {string} Nombre del artista
     *
     * TODO:
     * - Retorna this.artist
     */
    getArtist() {
        return this.artist
    }

    /**
     * Obtiene el género de la canción.
     * Traducción: Obtener Género
     *
     * @returns {string} Género musical
     *
     * TODO:
     * - Retorna this.genre
     */
    getGenre() {
        return this.genre
    }

    /**
     * Formatea la duración como "MM:SS".
     * Traducción: Formatear Duración
     *
     * Este método convierte la duración en segundos a formato "MM:SS".
     *
     * @returns {string} Duración formateada como "MM:SS"
     *
     * TODO:
     * - Calcula minutos: Math.floor(this.duration / 60)
     * - Calcula segundos: this.duration % 60
     * - Formatea minutos y segundos con padStart(2, '0') para asegurar 2 dígitos
     * - Retorna el string formateado como "MM:SS"
     */
    getFormattedDuration() {
        const min = (Math.floor(this.duration / 60)).toString().padStart(2, '0')
        const sec = (this.duration % 60).toString().padStart(2, '0')
        return `${min}:${sec}`

    }
}

/**
 * Representa una lista de reproducción.
 * Traducción: Lista de Reproducción
 * @class
 */
class Playlist {
    /**
     * Constructor de la clase Playlist
     * Traducción: Constructor de Lista de Reproducción
     *
     * Crea una nueva lista de reproducción con nombre.
     * Inicializa arrays vacíos para canciones.
     *
     * @param {string} name - Nombre de la lista (no puede estar vacío)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Playlist name is required" si el nombre es inválido
     * - Inicializa this.songs como un array vacío []
     * - Asigna el nombre validado a this.name
     */
    constructor(name) {
        if (name.trim() === '' || typeof name !== 'string') throw new Error("Playlist name is required");

        this.songs = []
        this.name = name.trim()

    }

    /**
     * Agrega una canción a la lista de reproducción.
     * Traducción: Agregar Canción
     *
     * Este método agrega una canción a la lista. Debe validar que sea una instancia de Song
     * y que no esté ya en la lista.
     *
     * @param {Song} song - Instancia de Song a agregar
     * @returns {Song} La canción agregada
     *
     * TODO:
     * - Valida que song sea una instancia de Song
     * - Lanza error "Song must be an instance of Song" si es inválido
     * - Verifica si la canción ya está en la lista usando some()
     * - Si ya existe, lanza un error: "Song already in playlist"
     * - Agrega la canción al array this.songs usando push()
     * - Retorna la canción agregada
     */
    addSong(song) {
        if (!(song instanceof Song)) throw new Error("Song must be an instance of Song");
        if (this.songs.some(songi => songi.title === song.title)) throw new Error("Song already in playlist");
        else this.songs.push(song)


        return song

    }

    /**
     * Elimina una canción de la lista de reproducción.
     * Traducción: Eliminar Canción
     *
     * Este método elimina una canción de la lista buscándola por título.
     *
     * @param {string} songTitle - Título de la canción a eliminar
     * @returns {boolean} true si se eliminó correctamente
     *
     * TODO:
     * - Encuentra el índice de la canción usando findIndex()
     * - Compara song.title con songTitle
     * - Si no se encuentra, retorna false
     * - Elimina la canción del array usando splice()
     * - Retorna true si se eliminó correctamente
     */
    removeSong(songTitle) {
        const ind = this.songs.findIndex(ind => ind.title === songTitle)
        console.log(ind, 'chequeo')
        if (ind !== -1) this.songs.splice(ind, 1)
        else return false

        return true
    }

    /**
     * Calcula la duración total de la lista usando reduce().
     * Traducción: Obtener Duración Total
     *
     * Este método calcula la duración total sumando la duración de todas las canciones.
     * Debe usar el método reduce() del array.
     *
     * @returns {number} Duración total en segundos
     *
     * TODO:
     * - Usa this.songs.reduce() para calcular la duración total
     * - Para cada canción, suma song.getDuration() al acumulador
     * - Retorna la duración total
     * - Si la lista está vacía, retorna 0
     */
    getTotalDuration() {
        if (this.songs.length === 0) return 0
        return this.songs.reduce((contador, time) => {
            return contador + (time.getDuration())
        }, 0)
    }

    /**
     * Obtiene todas las canciones de un artista específico usando filter().
     * Traducción: Obtener Canciones por Artista
     *
     * Este método retorna un nuevo array con todas las canciones del artista especificado.
     * Debe usar el método filter() del array.
     *
     * @param {string} artist - Nombre del artista
     * @returns {Song[]} Array con las canciones de ese artista
     *
     * TODO:
     * - Usa this.songs.filter() para filtrar canciones
     * - Filtra canciones donde song.getArtist() === artist
     * - Retorna el nuevo array filtrado
     */
    getSongsByArtist(artist) {
        const songOfArtist = this.songs.filter(song => song.getArtist() === artist)
        return songOfArtist

    }

    /**
     * Obtiene todas las canciones de un género específico usando filter().
     * Traducción: Obtener Canciones por Género
     *
     * Este método retorna un nuevo array con todas las canciones del género especificado.
     * Debe usar el método filter() del array.
     *
     * @param {string} genre - Género musical
     * @returns {Song[]} Array con las canciones de ese género
     *
     * TODO:
     * - Usa this.songs.filter() para filtrar canciones
     * - Filtra canciones donde song.getGenre() === genre
     * - Retorna el nuevo array filtrado
     */
    getSongsByGenre(genre) {
        return this.songs.filter(song => song.getGenre() === genre)
    }

    /**
     * Mezcla las canciones de la lista aleatoriamente.
     * Traducción: Mezclar Canciones
     *
     * Este método reorganiza las canciones en orden aleatorio.
     *
     * @returns {boolean} true si se mezcló correctamente
     *
     * TODO:
     * - Crea una copia del array this.songs
     * - Usa el algoritmo Fisher-Yates para mezclar aleatoriamente
     * - O usa sort() con Math.random() - 0.5
     * - Asigna el array mezclado a this.songs
     * - Retorna true
     */
    shuffle() {
        const shuffled = [...this.songs]

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return true
    }

    /**
     * Obtiene el número total de canciones.
     * Traducción: Obtener Total de Canciones
     *
     * @returns {number} Número total de canciones en la lista
     *
     * TODO:
     * - Retorna this.songs.length
     */
    getSongCount() {
        return this.songs.length
    }
}

/**
 * Gestiona la biblioteca de música y sus operaciones.
 * Traducción: Biblioteca de Música
 * @class
 */
class MusicLibrary {
    /**
     * Constructor de la clase MusicLibrary
     * Traducción: Constructor de Biblioteca de Música
     *
     * Crea una nueva biblioteca de música con nombre.
     * Inicializa arrays vacíos para canciones y listas de reproducción.
     *
     * @param {string} name - Nombre de la biblioteca (no puede estar vacío)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Library name is required" si el nombre es inválido
     * - Inicializa this.songs como un array vacío []
     * - Inicializa this.playlists como un array vacío []
     * - Asigna el nombre validado a this.name
     */
    constructor(name) {
        if (name.trim() === '' || typeof name !== 'string') throw new Error("Library name is required");
        this.songs = []
        this.playlists = []
        this.name = name.trim()

    }

    /**
     * Agrega una canción a la biblioteca.
     * Traducción: Agregar Canción
     *
     * Este método agrega una canción a la biblioteca. Debe validar que sea una instancia de Song
     * y que no exista ya una canción con el mismo título y artista.
     *
     * @param {Song} song - Instancia de Song a agregar
     * @returns {Song} La canción agregada
     *
     * TODO:
     * - Valida que song sea una instancia de Song
     * - Lanza error "Song must be an instance of Song" si es inválido
     * - Verifica si ya existe una canción con el mismo título y artista usando some()
     * - Si existe, lanza un error: "Song already exists in library"
     * - Agrega la canción al array this.songs usando push()
     * - Retorna la canción agregada
     */
    addSong(song) {
        if (!(song instanceof Song)) throw new Error("Song must be an instance of Song");
        const validationSong = this.songs.some(songIn => songIn.title === song.title && songIn.artist === song.artist)
        if (validationSong) throw new Error("Song already exists in library");
        else this.songs.push(song)

        return song

    }

    /**
     * Busca una canción por título usando find().
     * Traducción: Buscar Canción
     *
     * Este método busca una canción cuyo título coincida exactamente con el parámetro recibido.
     *
     * @param {string} title - Título de la canción a buscar
     * @returns {Song|null} La canción encontrada o null si no existe
     *
     * TODO:
     * - Usa this.songs.find() para buscar una canción cuyo title coincida exactamente
     * - Retorna la canción encontrada o null si no se encuentra
     */
    findSong(title) {
        const findSong = this.songs.find(song => song.title === title)
        if (findSong === undefined) return null
        else return findSong
    }

    /**
     * Crea una nueva lista de reproducción.
     * Traducción: Crear Lista de Reproducción
     *
     * Este método crea una nueva lista de reproducción y la agrega a la biblioteca.
     *
     * @param {string} playlistName - Nombre de la lista de reproducción
     * @returns {Playlist} La lista de reproducción creada
     *
     * TODO:
     * - Crea una nueva instancia de Playlist con el nombre recibido
     * - Agrega la lista al array this.playlists usando push()
     * - Retorna la lista creada
     */
    createPlaylist(playlistName) {
        const newPlaylist = new Playlist(playlistName)
        this.playlists.push(newPlaylist)

        return newPlaylist
    }

    /**
     * Obtiene todas las canciones de un artista específico usando filter().
     * Traducción: Obtener Canciones por Artista
     *
     * Este método retorna un nuevo array con todas las canciones del artista especificado.
     * Debe usar el método filter() del array.
     *
     * @param {string} artist - Nombre del artista
     * @returns {Song[]} Array con las canciones de ese artista
     *
     * TODO:
     * - Usa this.songs.filter() para filtrar canciones
     * - Filtra canciones donde song.getArtist() === artist
     * - Retorna el nuevo array filtrado
     */
    getSongsByArtist(artist) {
        return this.songs.filter(song => song.artist === artist)
    }

    /**
     * Obtiene todas las canciones de un género específico usando filter().
     * Traducción: Obtener Canciones por Género
     *
     * Este método retorna un nuevo array con todas las canciones del género especificado.
     * Debe usar el método filter() del array.
     *
     * @param {string} genre - Género musical
     * @returns {Song[]} Array con las canciones de ese género
     *
     * TODO:
     * - Usa this.songs.filter() para filtrar canciones
     * - Filtra canciones donde song.getGenre() === genre
     * - Retorna el nuevo array filtrado
     */
    getSongsByGenre(genre) {
        return this.songs.filter(song => song.genre === genre)
    }

    /**
     * Calcula la duración total de todas las canciones usando reduce().
     * Traducción: Obtener Duración Total
     *
     * Este método calcula la duración total sumando la duración de todas las canciones en la biblioteca.
     * Debe usar el método reduce() del array.
     *
     * @returns {number} Duración total en segundos
     *
     * TODO:
     * - Usa this.songs.reduce() para calcular la duración total
     * - Para cada canción, suma song.getDuration() al acumulador
     * - Retorna la duración total
     * - Si no hay canciones, retorna 0
     */
    getTotalDuration() {
        if (this.songs.length === 0) return 0
        return this.songs.reduce((contador, song) => {
            return contador + (song.getDuration())
        }, 0)
    }

    /**
     * Obtiene el artista más popular (con más canciones).
     * Traducción: Obtener Artista Más Popular
     *
     * Este método encuentra el artista que tiene más canciones en la biblioteca.
     *
     * @returns {string|null} Nombre del artista más popular o null si no hay canciones
     *
     * TODO:
     * - Si no hay canciones, retorna null
     * - Agrupa las canciones por artista y cuenta cuántas canciones tiene cada uno
     * - Encuentra el artista con más canciones
     * - Retorna el nombre del artista más popular
     * - Si hay empate, retorna el primero encontrado
     */
    getMostPopularArtist() {
        if (this.songs.length === 0) return null
        let allArtist = []
        let max = {}
        let artist = this.songs.map(song => {
            const eachArtist = this.getSongsByArtist(song.artist)
            if (allArtist.find(artist => artist.artist === song.artist) === undefined || allArtist.length === 0) {
                allArtist.push({
                    artist: song.artist,
                    numberSongs: eachArtist.length
                })

                if (Object.keys(max).length === 0 || eachArtist.length > max.numberSongs) {
                    max = {
                        artist: song.artist,
                        numberSongs: eachArtist.length
                    }
                }
            }


        })

        // let numbers =  Math.max(...(allArtist.map(num => num.numberSongs)))
        // let MaxNumber = Math.max( numbers)

        return max.artist
    }

    /**
     * Obtiene estadísticas de la biblioteca.
     * Traducción: Obtener Estadísticas
     *
     * Este método retorna un objeto con estadísticas de la biblioteca:
     * - totalSongs: número total de canciones
     * - totalPlaylists: número total de listas de reproducción
     * - totalDuration: duración total en segundos
     * - artists: número de artistas únicos
     * - genres: número de géneros únicos
     *
     * @returns {Object} Objeto con las estadísticas de la biblioteca
     *
     * TODO:
     * - Crea un objeto con las estadísticas solicitadas
     * - totalSongs: this.songs.length
     * - totalPlaylists: this.playlists.length
     *  - totalDuration: usa getTotalDuration()
     * - artists: cuenta artistas únicos usando Set
     * - genres: cuenta géneros únicos usando Set
     * - Retorna el objeto con todas las estadísticas
     */
    getStatistics() {
        const artistSet = new Set()
        const genreSet = new Set()
        this.songs.forEach(art => artistSet.add(art.artist))
        this.songs.forEach(genr => genreSet.add(genr.genre))
        return {
            totalSongs: this.songs.length,
            totalPlaylists: this.playlists.length,
            totalDuration: this.getTotalDuration(),
            artists: artistSet.size,
            genres : genreSet.size
        }
    }
}


// const veneca = new Song('veneca', 'Raguayana', 200, 'reggue')
// const vida = new Song('vida', 'canserbero', 375, 'rap')
// const muerte = new Song('muerte', 'canserbero', 400, 'rap')
// const limfao = new Song('shufel', 'limfao', 720, 'pop')
// console.log(veneca.getFormattedDuration())
// console.log(vida.getFormattedDuration())

// const play1 = new Playlist('la rompedora')
// console.log(play1.addSong(veneca))
// console.log(play1.addSong(vida))
// console.log(play1.addSong(muerte))
// // console.log(play1.removeSong('veneca'))
// console.log(play1.getTotalDuration())
// console.log(play1.getSongsByArtist('canserbero'))
// console.log(play1.getSongsByGenre('reggue'))
// console.log(play1.shuffle(), 'chequeoooooo')
// console.log(play1.getSongCount())
// console.log(play1)

// console.log('??????????')
// console.log('??????????')
// console.log('??????????')
// console.log('??????????')
// const libreria = new MusicLibrary('musiquita Chill')
// console.log(libreria)
// console.log(libreria.addSong(limfao), 'AGREGADO')
// console.log(libreria.addSong(veneca), 'AGREGADO')
// console.log(libreria.addSong(vida), 'AGREGADO')
// console.log(libreria.addSong(muerte), 'AGREGADO')
// console.log(libreria.findSong(veneca.title), 'ENCONTRADO')
// console.log(libreria.createPlaylist('musiquita'))
// console.log(libreria.getSongsByArtist('canserbero'))
// console.log(libreria.getSongsByGenre('reggue'))
// console.log(libreria.getTotalDuration())
// console.log(libreria.getMostPopularArtist())
// console.log(libreria.getStatistics())
// console.log(libreria)


const library = new MusicLibrary('Mi Biblioteca');
console.log(library)
console.log(library.name == 'Mi Biblioteca')


// const library = new MusicLibrary('Test');
// const playlist = library.createPlaylist('Mis Favoritas');
// console.log(library.playLists.length)
// console.log(playlist.name === 'Mis Favoritas')

// const library = new MusicLibrary('Test');
// const song1 = new Song('Song 1', 'Artist A', 180, 'Pop');
// const song2 = new Song('Song 2', 'Artist B', 200, 'Rock');
// library.addSong(song1);
// library.addSong(song2);
// library.createPlaylist('Playlist 1');
// const stats = library.getStatistics();
// console.log(stats)


module.exports = {
    Song,
    Playlist,
    MusicLibrary
};

