const {
    searchWord,
    searchWordDetailed,
    searchMultipleWords,
    searchPattern,
    findMostFrequentWord,
    generateTextStats,
    cleanText
} = require('./exercise');



describe('Búsqueda de Palabras en Texto', () => {
    
    const sampleText = "El gato negro está en el jardín. El gato es muy inteligente y el jardín es hermoso.";
    const longText = "JavaScript es un lenguaje de programación. JavaScript es muy popular. Programación en JavaScript es divertida. JavaScript, JavaScript, JavaScript!";
    
    describe('searchWord', () => {
        test('debe encontrar palabra en texto', () => {
            expect(searchWord(sampleText, "gato")).toBe(2);
            expect(searchWord(sampleText, "jardín")).toBe(2);
            expect(searchWord(sampleText, "negro")).toBe(1);
        });

        test('debe retornar 0 si la palabra no existe', () => {
            expect(searchWord(sampleText, "perro")).toBe(0);
            expect(searchWord(sampleText, "casa")).toBe(0);
            expect(searchWord(sampleText, "programación")).toBe(0);
        });

        test('debe ser sensible a mayúsculas por defecto', () => {
            expect(searchWord(sampleText, "El")).toBe(2);
            expect(searchWord(sampleText, "el")).toBe(2);
            expect(searchWord(sampleText, "EL")).toBe(2);
        });

        test('debe respetar el parámetro caseSensitive', () => {
            expect(searchWord(sampleText, "El", true)).toBe(2);
            expect(searchWord(sampleText, "el", true)).toBe(2);
            expect(searchWord(sampleText, "EL", true)).toBe(0);
        });

        test('debe manejar texto vacío', () => {
            expect(searchWord("", "palabra")).toBe(0);
            expect(searchWord("   ", "palabra")).toBe(0);
        });

        test('debe manejar palabra vacía', () => {
            expect(searchWord(sampleText, "")).toBe(0);
            expect(searchWord(sampleText, "   ")).toBe(0);
        });

        test('debe buscar palabras completas', () => {
            const text = "casa casas casamiento";
            expect(searchWord(text, "casa")).toBe(1);
            expect(searchWord(text, "casas")).toBe(1);
            expect(searchWord(text, "cas")).toBe(0);
        });

        test('debe manejar puntuación', () => {
            const text = "¡Hola! ¿Cómo estás? Bien, gracias.";
            expect(searchWord(text, "Hola")).toBe(1);
            expect(searchWord(text, "estás")).toBe(1);
            expect(searchWord(text, "gracias")).toBe(1);
        });
    });

    describe('searchWordDetailed', () => {
        test('debe retornar información detallada de la búsqueda', () => {
            const result = searchWordDetailed(sampleText, "gato");
            
            expect(result).toHaveProperty('count');
            expect(result).toHaveProperty('positions');
            expect(result).toHaveProperty('firstPosition');
            expect(result).toHaveProperty('lastPosition');
            expect(result).toHaveProperty('wordLength');
            
            expect(result.count).toBe(2);
            expect(result.positions).toEqual([0, 1]);
            expect(result.firstPosition).toBe(0);
            expect(result.lastPosition).toBe(1);
            expect(result.wordLength).toBe(4);
        });

        test('debe retornar -1 para posiciones si no encuentra la palabra', () => {
            const result = searchWordDetailed(sampleText, "perro");
            
            expect(result.count).toBe(0);
            expect(result.positions).toEqual([]);
            expect(result.firstPosition).toBe(-1);
            expect(result.lastPosition).toBe(-1);
            expect(result.wordLength).toBe(5);
        });

        test('debe manejar una sola ocurrencia', () => {
            const result = searchWordDetailed(sampleText, "negro");
            
            expect(result.count).toBe(1);
            expect(result.positions).toEqual([0]);
            expect(result.firstPosition).toBe(0);
            expect(result.lastPosition).toBe(0);
        });

        test('debe respetar caseSensitive', () => {
            const result = searchWordDetailed(sampleText, "El", true);
            
            expect(result.count).toBe(2);
            expect(result.positions).toEqual([0, 1]);
        });
    });

    describe('searchMultipleWords', () => {
        test('debe buscar múltiples palabras', () => {
            const words = ["gato", "jardín", "negro"];
            const result = searchMultipleWords(sampleText, words);
            
            expect(result).toEqual({
                gato: 2,
                jardín: 2,
                negro: 1
            });
        });

        test('debe manejar palabras que no existen', () => {
            const words = ["gato", "perro", "casa"];
            const result = searchMultipleWords(sampleText, words);
            
            expect(result).toEqual({
                gato: 2,
                perro: 0,
                casa: 0
            });
        });

        test('debe manejar array vacío', () => {
            const result = searchMultipleWords(sampleText, []);
            
            expect(result).toEqual({});
        });

        test('debe respetar caseSensitive', () => {
            const words = ["El", "el", "EL"];
            const result = searchMultipleWords(sampleText, words, true);
            
            expect(result).toEqual({
                El: 2,
                el: 2,
                EL: 0
            });
        });
    });

    describe('searchPattern', () => {
        test('debe buscar palabras que empiecen con un patrón', () => {
            const result = searchPattern(sampleText, "ga*");
            
            expect(result).toContain("gato");
            expect(result).toContain("gato");
        });

        test('debe buscar palabras que terminen con un patrón', () => {
            const result = searchPattern(sampleText, "*ín");
            
            expect(result).toContain("jardín");
        });

        test('debe buscar palabras que contengan un patrón', () => {
            const result = searchPattern(sampleText, "*at*");
            
            expect(result).toContain("gato");
        });

        test('debe retornar array vacío si no hay coincidencias', () => {
            const result = searchPattern(sampleText, "xyz*");
            
            expect(result).toEqual([]);
        });

        test('debe manejar patrón sin comodines', () => {
            const result = searchPattern(sampleText, "gato");
            
            expect(result).toContain("gato");
        });

        test('debe respetar caseSensitive', () => {
            const result = searchPattern(sampleText, "El*", true);
            
            expect(result).toContain("El");
        });
    });

    describe('findMostFrequentWord', () => {
        test('debe encontrar la palabra más frecuente', () => {
            const result = findMostFrequentWord(longText);
            
            expect(result).toHaveProperty('word');
            expect(result).toHaveProperty('count');
            expect(result.word).toBe("JavaScript");
            expect(result.count).toBe(5);
        });

        test('debe manejar texto con una sola palabra', () => {
            const result = findMostFrequentWord("hola hola hola");
            
            expect(result.word).toBe("hola");
            expect(result.count).toBe(3);
        });

        test('debe manejar texto con palabras de igual frecuencia', () => {
            const result = findMostFrequentWord("a b c d");
            
            expect(result.count).toBe(1);
            expect(["a", "b", "c", "d"]).toContain(result.word);
        });

        test('debe manejar texto vacío', () => {
            const result = findMostFrequentWord("");
            
            expect(result.word).toBe("");
            expect(result.count).toBe(0);
        });

        test('debe respetar caseSensitive', () => {
            const result = findMostFrequentWord("A a A a", true);
            
            expect(result.word).toBe("A");
            expect(result.count).toBe(2);
        });
    });

    describe('generateTextStats', () => {
        test('debe generar estadísticas completas', () => {
            const result = generateTextStats(sampleText);
            
            expect(result).toHaveProperty('totalWords');
            expect(result).toHaveProperty('uniqueWords');
            expect(result).toHaveProperty('mostFrequentWord');
            expect(result).toHaveProperty('averageWordLength');
            expect(result).toHaveProperty('longestWord');
            expect(result).toHaveProperty('shortestWord');
        });

        test('debe calcular estadísticas correctamente', () => {
            const result = generateTextStats("hola mundo hola");
            
            expect(result.totalWords).toBe(3);
            expect(result.uniqueWords).toBe(2);
            expect(result.mostFrequentWord.word).toBe("hola");
            expect(result.mostFrequentWord.count).toBe(2);
            expect(result.averageWordLength).toBeCloseTo(4.33, 1);
            expect(result.longestWord).toBe("mundo");
            expect(result.shortestWord).toBe("hola");
        });

        test('debe manejar texto vacío', () => {
            const result = generateTextStats("");
            
            expect(result.totalWords).toBe(0);
            expect(result.uniqueWords).toBe(0);
            expect(result.averageWordLength).toBe(0);
            expect(result.longestWord).toBe("");
            expect(result.shortestWord).toBe("");
        });

        test('debe respetar caseSensitive', () => {
            const result = generateTextStats("A a A a", true);
            
            expect(result.uniqueWords).toBe(2);
            expect(result.mostFrequentWord.word).toBe("A");
        });
    });

    describe('cleanText', () => {
        test('debe limpiar caracteres especiales', () => {
            const dirtyText = "¡Hola! ¿Cómo estás? Bien, gracias.";
            const result = cleanText(dirtyText);
            
            expect(result).toBe("Hola Cómo estás Bien gracias");
        });

        test('debe normalizar espacios múltiples', () => {
            const text = "hola    mundo   bien";
            const result = cleanText(text);
            
            expect(result).toBe("hola mundo bien");
        });

        test('debe manejar caseSensitive', () => {
            const text = "Hola MUNDO";
            const result = cleanText(text, true);
            
            expect(result).toBe("Hola MUNDO");
        });

        test('debe manejar texto vacío', () => {
            const result = cleanText("");
            
            expect(result).toBe("");
        });

        test('debe manejar solo espacios', () => {
            const result = cleanText("   ");
            
            expect(result).toBe("");
        });

        test('debe preservar números', () => {
            const text = "Tengo 5 gatos y 3 perros.";
            const result = cleanText(text);
            
            expect(result).toBe("Tengo 5 gatos y 3 perros");
        });
    });

    describe('Casos edge y validación', () => {
        test('debe manejar texto con solo puntuación', () => {
            const result = searchWord("!!!???...", "palabra");
            
            expect(result).toBe(0);
        });

        test('debe manejar texto con solo números', () => {
            const result = searchWord("123 456 789", "123");
            
            expect(result).toBe(1);
        });

        test('debe manejar texto muy largo', () => {
            const longText = "palabra ".repeat(1000);
            const result = searchWord(longText, "palabra");
            
            expect(result).toBe(1000);
        });

        test('debe manejar palabra muy larga', () => {
            const longWord = "a".repeat(1000);
            const result = searchWord(`texto ${longWord} más texto`, longWord);
            
            expect(result).toBe(1);
        });

        test('debe manejar caracteres especiales en la palabra', () => {
            const text = "café naïve résumé";
            const result = searchWord(text, "café");
            
            expect(result).toBe(1);
        });

        test('debe manejar texto con saltos de línea', () => {
            const text = "primera línea\nsegunda línea\ntercera línea";
            const result = searchWord(text, "línea");
            
            expect(result).toBe(3);
        });

        test('debe manejar texto con tabs', () => {
            const text = "primera\tsegunda\ttercera";
            const result = searchWord(text, "primera");
            
            expect(result).toBe(1);
        });
    });
});
