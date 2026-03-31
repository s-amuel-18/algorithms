const { Song, Playlist, MusicLibrary } = require('./exercise');

describe('Sistema de Gestión de Biblioteca de Música', () => {
    // ===== CLASE SONG =====
    describe('Clase Song', () => {
        describe('Casos básicos', () => {
            test('crea una canción correctamente', () => {
                // Propósito: Verificar que el constructor asigna correctamente las propiedades
                // Entrada: title='Bohemian Rhapsody', artist='Queen', duration=355, genre='Rock'
                // Esperado: Song creada con todas las propiedades correctas
                const song = new Song('Bohemian Rhapsody', 'Queen', 355, 'Rock');
                expect(song.title).toBe('Bohemian Rhapsody');
                expect(song.artist).toBe('Queen');
                expect(song.duration).toBe(355);
                expect(song.genre).toBe('Rock');
            });

            test('obtiene la duración correctamente', () => {
                // Propósito: Verificar que getDuration retorna la duración
                // Entrada: duration=180
                // Esperado: Retorna 180
                const song = new Song('Test', 'Artist', 180, 'Genre');
                expect(song.getDuration()).toBe(180);
            });

            test('obtiene el artista correctamente', () => {
                // Propósito: Verificar que getArtist retorna el artista
                // Entrada: artist='The Beatles'
                // Esperado: Retorna 'The Beatles'
                const song = new Song('Test', 'The Beatles', 180, 'Genre');
                expect(song.getArtist()).toBe('The Beatles');
            });

            test('obtiene el género correctamente', () => {
                // Propósito: Verificar que getGenre retorna el género
                // Entrada: genre='Pop'
                // Esperado: Retorna 'Pop'
                const song = new Song('Test', 'Artist', 180, 'Pop');
                expect(song.getGenre()).toBe('Pop');
            });

            test('formatea la duración correctamente', () => {
                // Propósito: Verificar que getFormattedDuration formatea como "MM:SS"
                // Entrada: duration=125 segundos
                // Esperado: Retorna "02:05"
                const song = new Song('Test', 'Artist', 125, 'Genre');
                expect(song.getFormattedDuration()).toBe('02:05');
            });

            test('formatea duración con minutos y segundos de un solo dígito', () => {
                // Propósito: Verificar que getFormattedDuration usa padStart correctamente
                // Entrada: duration=65 segundos (1 minuto, 5 segundos)
                // Esperado: Retorna "01:05"
                const song = new Song('Test', 'Artist', 65, 'Genre');
                expect(song.getFormattedDuration()).toBe('01:05');
            });
        });

        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando el título está vacío', () => {
                // Propósito: Verificar validación de title no vacío
                // Entrada: title=''
                // Esperado: Error "Song title is required"
                expect(() => new Song('', 'Artist', 180, 'Genre')).toThrow('Song title is required');
            });

            test('lanza error cuando el artista está vacío', () => {
                // Propósito: Verificar validación de artist no vacío
                // Entrada: artist=''
                // Esperado: Error "Song artist is required"
                expect(() => new Song('Test', '', 180, 'Genre')).toThrow('Song artist is required');
            });

            test('lanza error cuando la duración es inválida', () => {
                // Propósito: Verificar validación de duration > 0
                // Entrada: duration=0 o negativo
                // Esperado: Error "Song duration must be greater than 0"
                expect(() => new Song('Test', 'Artist', 0, 'Genre')).toThrow('Song duration must be greater than 0');
            });

            test('lanza error cuando el género está vacío', () => {
                // Propósito: Verificar validación de genre no vacío
                // Entrada: genre=''
                // Esperado: Error "Song genre is required"
                expect(() => new Song('Test', 'Artist', 180, '')).toThrow('Song genre is required');
            });
        });
    });

    // ===== CLASE PLAYLIST =====
    describe('Clase Playlist', () => {
        let song1;
        let song2;

        beforeEach(() => {
            song1 = new Song('Song 1', 'Artist A', 180, 'Pop');
            song2 = new Song('Song 2', 'Artist B', 200, 'Rock');
        });

        describe('Casos básicos', () => {
            test('crea una lista de reproducción correctamente', () => {
                // Propósito: Verificar que el constructor inicializa correctamente
                // Entrada: name='Mis Favoritas'
                // Esperado: Playlist creada con name correcto, songs inicializado como array vacío
                const playlist = new Playlist('Mis Favoritas');
                expect(playlist.name).toBe('Mis Favoritas');
                expect(Array.isArray(playlist.songs)).toBe(true);
                expect(playlist.songs.length).toBe(0);
            });

            test('agrega una canción correctamente', () => {
                // Propósito: Verificar que addSong agrega una canción válida
                // Entrada: song (instancia de Song)
                // Esperado: Canción agregada al array songs
                const playlist = new Playlist('Test');
                const added = playlist.addSong(song1);
                expect(playlist.songs.length).toBe(1);
                expect(added).toBe(song1);
            });

            test('elimina una canción correctamente', () => {
                // Propósito: Verificar que removeSong elimina una canción existente
                // Entrada: songTitle='Song 1' que existe
                // Esperado: Canción eliminada
                const playlist = new Playlist('Test');
                playlist.addSong(song1);
                const result = playlist.removeSong('Song 1');
                expect(result).toBe(true);
                expect(playlist.songs.length).toBe(0);
            });

            test('retorna false cuando se intenta eliminar canción inexistente', () => {
                // Propósito: Verificar que removeSong retorna false cuando la canción no existe
                // Entrada: songTitle='Inexistente'
                // Esperado: Retorna false
                const playlist = new Playlist('Test');
                expect(playlist.removeSong('Inexistente')).toBe(false);
            });

            test('calcula la duración total correctamente', () => {
                // Propósito: Verificar que getTotalDuration calcula correctamente usando reduce()
                // Entrada: Múltiples canciones con diferentes duraciones
                // Esperado: Suma de todas las duraciones
                const playlist = new Playlist('Test');
                playlist.addSong(song1); // 180
                playlist.addSong(song2); // 200
                expect(playlist.getTotalDuration()).toBe(380);
            });

            test('obtiene canciones por artista correctamente', () => {
                // Propósito: Verificar que getSongsByArtist filtra por artista usando filter()
                // Entrada: artist='Artist A'
                // Esperado: Retorna solo canciones de ese artista
                const playlist = new Playlist('Test');
                playlist.addSong(song1);
                playlist.addSong(song2);
                const artistSongs = playlist.getSongsByArtist('Artist A');
                expect(artistSongs.length).toBe(1);
                expect(artistSongs[0]).toBe(song1);
            });

            test('obtiene canciones por género correctamente', () => {
                // Propósito: Verificar que getSongsByGenre filtra por género usando filter()
                // Entrada: genre='Rock'
                // Esperado: Retorna solo canciones de ese género
                const playlist = new Playlist('Test');
                playlist.addSong(song1);
                playlist.addSong(song2);
                const rockSongs = playlist.getSongsByGenre('Rock');
                expect(rockSongs.length).toBe(1);
                expect(rockSongs[0]).toBe(song2);
            });

            test('mezcla las canciones correctamente', () => {
                // Propósito: Verificar que shuffle reorganiza las canciones
                // Entrada: Lista con múltiples canciones
                // Esperado: Canciones reorganizadas (puede ser diferente orden)
                const playlist = new Playlist('Test');
                playlist.addSong(song1);
                playlist.addSong(song2);
                const originalOrder = [...playlist.songs];
                const result = playlist.shuffle();
                expect(result).toBe(true);
                // Verifica que todas las canciones siguen presentes
                expect(playlist.songs.length).toBe(2);
                expect(playlist.songs).toContain(song1);
                expect(playlist.songs).toContain(song2);
            });

            test('obtiene el número total de canciones correctamente', () => {
                // Propósito: Verificar que getSongCount retorna el número correcto
                // Entrada: Lista con múltiples canciones
                // Esperado: Retorna el número de canciones
                const playlist = new Playlist('Test');
                playlist.addSong(song1);
                playlist.addSong(song2);
                expect(playlist.getSongCount()).toBe(2);
            });
        });

        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando el nombre está vacío', () => {
                // Propósito: Verificar validación de name no vacío
                // Entrada: name=''
                // Esperado: Error "Playlist name is required"
                expect(() => new Playlist('')).toThrow('Playlist name is required');
            });

            test('lanza error cuando song no es instancia de Song', () => {
                // Propósito: Verificar validación de instancia de Song en addSong
                // Entrada: song={}
                // Esperado: Error "Song must be an instance of Song"
                const playlist = new Playlist('Test');
                expect(() => playlist.addSong({})).toThrow('Song must be an instance of Song');
            });

            test('lanza error cuando se intenta agregar canción duplicada', () => {
                // Propósito: Verificar validación de canciones duplicadas
                // Entrada: Agregar la misma canción dos veces
                // Esperado: Error "Song already in playlist" en el segundo intento
                const playlist = new Playlist('Test');
                playlist.addSong(song1);
                expect(() => playlist.addSong(song1)).toThrow('Song already in playlist');
            });
        });
    });

    // ===== CLASE MUSICLIBRARY =====
    describe('Clase MusicLibrary', () => {
        describe('Casos básicos', () => {
            test('crea una biblioteca correctamente', () => {
                // Propósito: Verificar que el constructor inicializa correctamente
                // Entrada: name='Mi Biblioteca'
                // Esperado: MusicLibrary creada con name correcto, arrays inicializados
                const library = new MusicLibrary('Mi Biblioteca');
                expect(library.name === 'Mi Biblioteca').toBe(true);
                expect(Array.isArray(library.songs)).toBe(true);
                expect(Array.isArray(library.playlists)).toBe(true);
            });

            test('agrega una canción correctamente', () => {
                // Propósito: Verificar que addSong agrega una canción válida
                // Entrada: song (instancia de Song)
                // Esperado: Canción agregada al array songs
                const library = new MusicLibrary('Test');
                const song = new Song('Test', 'Artist', 180, 'Genre');
                const added = library.addSong(song);
                expect(library.songs.length).toBe(1);
                expect(added).toBe(song);
            });

            test('encuentra una canción por título correctamente', () => {
                // Propósito: Verificar que findSong busca y retorna una canción existente
                // Entrada: title='Test' que existe
                // Esperado: Retorna la canción encontrada
                const library = new MusicLibrary('Test');
                const song = new Song('Test', 'Artist', 180, 'Genre');
                library.addSong(song);
                const found = library.findSong('Test');
                expect(found).toBe(song);
            });

            test('retorna null cuando no encuentra una canción', () => {
                // Propósito: Verificar que findSong retorna null cuando la canción no existe
                // Entrada: title='Inexistente'
                // Esperado: Retorna null
                const library = new MusicLibrary('Test');
                expect(library.findSong('Inexistente')).toBeNull();
            });

            test('crea una lista de reproducción correctamente', () => {
                // Propósito: Verificar que createPlaylist crea y agrega una lista
                // Entrada: playlistName='Mis Favoritas'
                // Esperado: Lista creada y agregada
                const library = new MusicLibrary('Test');
                const playlist = library.createPlaylist('Mis Favoritas');
                expect(library.playlists.length).toBe(1);
                expect(playlist.name).toBe('Mis Favoritas');
            });

            test('obtiene canciones por artista correctamente', () => {
                // Propósito: Verificar que getSongsByArtist filtra por artista usando filter()
                // Entrada: artist='Artist A'
                // Esperado: Retorna solo canciones de ese artista
                const library = new MusicLibrary('Test');
                const song1 = new Song('Song 1', 'Artist A', 180, 'Pop');
                const song2 = new Song('Song 2', 'Artist B', 200, 'Rock');
                library.addSong(song1);
                library.addSong(song2);
                const artistSongs = library.getSongsByArtist('Artist A');
                expect(artistSongs.length).toBe(1);
                expect(artistSongs[0]).toBe(song1);
            });

            test('obtiene canciones por género correctamente', () => {
                // Propósito: Verificar que getSongsByGenre filtra por género usando filter()
                // Entrada: genre='Rock'
                // Esperado: Retorna solo canciones de ese género
                const library = new MusicLibrary('Test');
                const song1 = new Song('Song 1', 'Artist A', 180, 'Pop');
                const song2 = new Song('Song 2', 'Artist B', 200, 'Rock');
                library.addSong(song1);
                library.addSong(song2);
                const rockSongs = library.getSongsByGenre('Rock');
                expect(rockSongs.length).toBe(1);
                expect(rockSongs[0]).toBe(song2);
            });

            test('calcula la duración total correctamente', () => {
                // Propósito: Verificar que getTotalDuration calcula correctamente usando reduce()
                // Entrada: Múltiples canciones con diferentes duraciones
                // Esperado: Suma de todas las duraciones
                const library = new MusicLibrary('Test');
                const song1 = new Song('Song 1', 'Artist', 180, 'Genre');
                const song2 = new Song('Song 2', 'Artist', 200, 'Genre');
                library.addSong(song1);
                library.addSong(song2);
                expect(library.getTotalDuration()).toBe(380);
            });

            test('obtiene el artista más popular correctamente', () => {
                // Propósito: Verificar que getMostPopularArtist encuentra el artista con más canciones
                // Entrada: Múltiples canciones de diferentes artistas
                // Esperado: Retorna el artista con más canciones
                const library = new MusicLibrary('Test');
                const song1 = new Song('Song 1', 'Artist A', 180, 'Genre');
                const song2 = new Song('Song 2', 'Artist A', 200, 'Genre');
                const song3 = new Song('Song 3', 'Artist B', 150, 'Genre');
                library.addSong(song1);
                library.addSong(song2);
                library.addSong(song3);
                expect(library.getMostPopularArtist()).toBe('Artist A');
            });

            test('retorna null cuando no hay canciones para getMostPopularArtist', () => {
                // Propósito: Verificar que getMostPopularArtist retorna null sin canciones
                // Entrada: Biblioteca sin canciones
                // Esperado: Retorna null
                const library = new MusicLibrary('Test');
                expect(library.getMostPopularArtist()).toBeNull();
            });

            test('obtiene estadísticas correctamente', () => {
                // Propósito: Verificar que getStatistics retorna todas las estadísticas
                // Entrada: Biblioteca con canciones y listas
                // Esperado: Objeto con todas las estadísticas solicitadas
                const library = new MusicLibrary('Test');
                const song1 = new Song('Song 1', 'Artist A', 180, 'Pop');
                const song2 = new Song('Song 2', 'Artist B', 200, 'Rock');
                library.addSong(song1);
                library.addSong(song2);
                library.createPlaylist('Playlist 1');
                const stats = library.getStatistics();
                expect(stats.totalSongs).toBe(2);
                expect(stats.totalPlaylists).toBe(1);
                expect(stats.totalDuration).toBe(380);
                expect(stats.artists).toBe(2);
                expect(stats.genres).toBe(2);
            });
        });

        describe('Validación de entradas (Fail Fast)', () => {
            test('lanza error cuando el nombre está vacío', () => {
                // Propósito: Verificar validación de name no vacío
                // Entrada: name=''
                // Esperado: Error "Library name is required"
                expect(() => new MusicLibrary('')).toThrow('Library name is required');
            });

            test('lanza error cuando song no es instancia de Song', () => {
                // Propósito: Verificar validación de instancia de Song en addSong
                // Entrada: song={}
                // Esperado: Error "Song must be an instance of Song"
                const library = new MusicLibrary('Test');
                expect(() => library.addSong({})).toThrow('Song must be an instance of Song');
            });

            test('lanza error cuando se intenta agregar canción duplicada', () => {
                // Propósito: Verificar validación de canciones duplicadas (mismo título y artista)
                // Entrada: Agregar dos canciones con mismo título y artista
                // Esperado: Error "Song already exists in library" en el segundo intento
                const library = new MusicLibrary('Test');
                const song1 = new Song('Test', 'Artist', 180, 'Genre');
                const song2 = new Song('Test', 'Artist', 200, 'Genre');
                library.addSong(song1);
                expect(() => library.addSong(song2)).toThrow('Song already exists in library');
            });
        });
    });
});

