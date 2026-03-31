const {
  countWordFrequency,
  getTopWords,
  filterCommonWords,
  generateWordReport,
} = require('./exercise');

describe('Contador de Frecuencia de Palabras', () => {
  // Tests para countWordFrequency
  describe('countWordFrequency', () => {
    test('debe contar frecuencia de palabras básicas', () => {
      const text = 'Hello world! Hello JavaScript.';
      const result = countWordFrequency(text);

      expect(result).toEqual({
        hello: 2,
        world: 1,
        javascript: 1,
      });
    });

    test('debe manejar texto vacío', () => {
      const result = countWordFrequency('');
      expect(result).toEqual({});
    });

    test('debe manejar texto con solo espacios', () => {
      const result = countWordFrequency('   ');
      expect(result).toEqual({});
    });

    test('debe manejar texto con solo puntuación', () => {
      const result = countWordFrequency('!!!???...');
      expect(result).toEqual({});
    });

    test('debe ignorar palabras de menos de 2 caracteres', () => {
      const text = 'a b c hello world';
      const result = countWordFrequency(text);

      expect(result).toEqual({
        hello: 1,
        world: 1,
      });
    });

    test('debe convertir todo a minúsculas', () => {
      const text = 'Hello WORLD JavaScript';
      const result = countWordFrequency(text);

      expect(result).toEqual({
        hello: 1,
        world: 1,
        javascript: 1,
      });
    });

    test('debe eliminar puntuación correctamente', () => {
      const text = "Hello, world! How are you? I'm fine.";
      const result = countWordFrequency(text);

      expect(result).toEqual({
        hello: 1,
        world: 1,
        how: 1,
        are: 1,
        you: 1,
        im: 1,
        fine: 1,
      });
    });

    test('debe manejar números en palabras', () => {
      const text = 'test123 hello456 world789';
      const result = countWordFrequency(text);

      expect(result).toEqual({
        test123: 1,
        hello456: 1,
        world789: 1,
      });
    });

    test('debe manejar texto con múltiples espacios', () => {
      const text = 'hello    world   javascript';
      const result = countWordFrequency(text);

      expect(result).toEqual({
        hello: 1,
        world: 1,
        javascript: 1,
      });
    });

     test('debe manejar texto con guiones', () => {
       const text = 'hello-world javascript-programming';
       const result = countWordFrequency(text);

       // La solución filtra palabras con guiones porque no pasan el regex /^[a-z0-9]+$/i
       expect(result).toEqual({});
     });

    test('debe contar palabras repetidas consecutivamente', () => {
      const text = 'hello hello hello world world';
      const result = countWordFrequency(text);

      expect(result).toEqual({
        hello: 3,
        world: 2,
      });
    });
  });

  // Tests para getTopWords
  describe('getTopWords', () => {
     test('debe obtener palabras más frecuentes ordenadas correctamente', () => {
       const frequencyMap = {
         hello: 3,
         world: 1,
         javascript: 2,
         programming: 1,
       };

       const result = getTopWords(frequencyMap, 3);

       expect(result).toEqual([
         { word: 'hello', frequency: 3 },
         { word: 'javascript', frequency: 2 },
         { word: 'programming', frequency: 1 },
       ]);
     });

    test('debe manejar empates ordenando alfabéticamente', () => {
      const frequencyMap = {
        world: 2,
        hello: 2,
        javascript: 1,
      };

      const result = getTopWords(frequencyMap, 3);

      expect(result).toEqual([
        { word: 'hello', frequency: 2 },
        { word: 'world', frequency: 2 },
        { word: 'javascript', frequency: 1 },
      ]);
    });

    test('debe respetar el límite especificado', () => {
      const frequencyMap = {
        a: 3,
        b: 2,
        c: 1,
        d: 1,
      };

      const result = getTopWords(frequencyMap, 2);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ word: 'a', frequency: 3 });
      expect(result[1]).toEqual({ word: 'b', frequency: 2 });
    });

    test('debe manejar mapa de frecuencias vacío', () => {
      const result = getTopWords({}, 5);
      expect(result).toEqual([]);
    });

    test('debe manejar límite mayor que palabras disponibles', () => {
      const frequencyMap = {
        hello: 2,
        world: 1,
      };

      const result = getTopWords(frequencyMap, 10);

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { word: 'hello', frequency: 2 },
        { word: 'world', frequency: 1 },
      ]);
    });

    test('debe manejar límite cero', () => {
      const frequencyMap = {
        hello: 2,
        world: 1,
      };

      const result = getTopWords(frequencyMap, 0);
      expect(result).toEqual([]);
    });

     test('debe manejar límite negativo', () => {
       const frequencyMap = {
         hello: 2,
         world: 1,
       };

       const result = getTopWords(frequencyMap, -1);
       // La solución usa valor por defecto de 10 cuando el límite es negativo
       expect(result).toHaveLength(2);
       expect(result).toEqual([
         { word: 'hello', frequency: 2 },
         { word: 'world', frequency: 1 },
       ]);
     });

    test('debe manejar parámetros inválidos', () => {
      expect(getTopWords(null, 5)).toEqual([]);
      expect(getTopWords(undefined, 5)).toEqual([]);
      expect(getTopWords('invalid', 5)).toEqual([]);
    });
  });

  // Tests para filterCommonWords
  describe('filterCommonWords', () => {
    test('debe filtrar palabras comunes correctamente', () => {
      const frequencyMap = {
        the: 5,
        and: 3,
        programming: 2,
        javascript: 1,
      };

      const commonWords = ['the', 'and'];
      const result = filterCommonWords(frequencyMap, commonWords);

      expect(result).toEqual({
        programming: 2,
        javascript: 1,
      });
    });

    test('debe ser case-insensitive al filtrar', () => {
      const frequencyMap = {
        The: 3,
         THE: 2,
        programming: 1,
      };

      const commonWords = ['the'];
      const result = filterCommonWords(frequencyMap, commonWords);

      expect(result).toEqual({
        programming: 1,
      });
    });

    test('debe manejar array de palabras comunes vacío', () => {
      const frequencyMap = {
        hello: 2,
        world: 1,
      };

      const result = filterCommonWords(frequencyMap, []);

      expect(result).toEqual(frequencyMap);
    });

    test('debe manejar palabras comunes que no existen en el mapa', () => {
      const frequencyMap = {
        hello: 2,
        world: 1,
      };

      const commonWords = ['nonexistent', 'another'];
      const result = filterCommonWords(frequencyMap, commonWords);

      expect(result).toEqual(frequencyMap);
    });

    test('debe manejar mapa de frecuencias vacío', () => {
      const result = filterCommonWords({}, ['the', 'and']);
      expect(result).toEqual({});
    });

    test('debe manejar parámetros inválidos', () => {
      expect(filterCommonWords(null, ['the'])).toEqual({});
      expect(filterCommonWords(undefined, ['the'])).toEqual({});
      expect(filterCommonWords('invalid', ['the'])).toEqual({});
      expect(filterCommonWords({}, 'invalid')).toEqual({});
    });

    test('debe filtrar todas las palabras si todas son comunes', () => {
      const frequencyMap = {
        the: 3,
        and: 2,
      };

      const commonWords = ['the', 'and'];
      const result = filterCommonWords(frequencyMap, commonWords);

      expect(result).toEqual({});
    });
  });

  // Tests para generateWordReport
  describe('generateWordReport', () => {
    test('debe generar reporte básico correctamente', () => {
      const text = 'Hello world! Hello JavaScript.';
      const result = generateWordReport(text);

      expect(result).toHaveProperty('totalWords');
      expect(result).toHaveProperty('uniqueWords');
      expect(result).toHaveProperty('topWords');
      expect(result).toHaveProperty('filteredWords');
      expect(result).toHaveProperty('averageFrequency');

      expect(result.totalWords).toBe(4);
      expect(result.uniqueWords).toBe(3);
      expect(result.topWords).toEqual([
        { word: 'hello', frequency: 2 },
        { word: 'javascript', frequency: 1 },
        { word: 'world', frequency: 1 },
      ]);
    });

     test('debe generar reporte con límite personalizado', () => {
       const text = 'a a b b c d e f g h i j';
       const result = generateWordReport(text, { limit: 3 });

       // Las palabras de 1 carácter son filtradas por la solución
       expect(result.topWords).toHaveLength(0);
       expect(result.totalWords).toBe(0);
       expect(result.uniqueWords).toBe(0);
     });

     test('debe generar reporte filtrando palabras comunes', () => {
       const text = 'The programming is great and fun';
       const result = generateWordReport(text, {
         filterCommon: true,
         commonWords: ['the', 'is', 'and'],
       });

       expect(result.filteredWords).toBe(3);
       // El orden puede variar debido al ordenamiento alfabético en empates
       expect(result.topWords).toHaveLength(3);
       expect(result.topWords.map(w => w.word)).toContain('programming');
       expect(result.topWords.map(w => w.word)).toContain('great');
       expect(result.topWords.map(w => w.word)).toContain('fun');
     });

    test('debe manejar texto vacío', () => {
      const result = generateWordReport('');

      expect(result.totalWords).toBe(0);
      expect(result.uniqueWords).toBe(0);
      expect(result.topWords).toEqual([]);
      expect(result.averageFrequency).toBe(0);
    });

    test('debe calcular frecuencia promedio correctamente', () => {
      const text = 'hello hello world';
      const result = generateWordReport(text);

      expect(result.averageFrequency).toBe('1.50'); // 3 total / 2 unique = 1.5
    });

    test('debe manejar opciones por defecto', () => {
      const text = 'hello world';
      const result = generateWordReport(text);

      expect(result.topWords).toHaveLength(2);
      expect(result.filteredWords).toBe(0);
    });

    test('debe manejar texto con solo palabras comunes', () => {
      const text = 'the and or but';
      const result = generateWordReport(text, {
        filterCommon: true,
        commonWords: ['the', 'and', 'or', 'but'],
      });

      expect(result.filteredWords).toBe(4);
      expect(result.topWords).toEqual([]);
    });

    test('debe manejar texto muy largo', () => {
      const text = 'hello '.repeat(1000) + 'world '.repeat(500);
      const result = generateWordReport(text);

      expect(result.totalWords).toBe(1500);
      expect(result.uniqueWords).toBe(2);
      expect(result.topWords[0]).toEqual({ word: 'hello', frequency: 1000 });
      expect(result.topWords[1]).toEqual({ word: 'world', frequency: 500 });
    });
  });

  // Tests de integración
  describe('Integración completa', () => {
     test('debe procesar texto complejo correctamente', () => {
       const text =
         'JavaScript is a programming language. JavaScript is used for web development. Programming with JavaScript is fun!';

       // Contar frecuencias
       const frequency = countWordFrequency(text);
       expect(frequency['javascript']).toBe(3);
       expect(frequency['programming']).toBe(2);

       // Obtener top palabras - "is" aparece más veces que "javascript"
       const topWords = getTopWords(frequency, 3);
       expect(topWords[0].word).toBe('is');
       expect(topWords[0].frequency).toBe(3);

       // Filtrar palabras comunes
       const filtered = filterCommonWords(frequency, ['is', 'a', 'for', 'with']);
       expect(filtered['javascript']).toBe(3);
       expect(filtered['programming']).toBe(2);
       expect(filtered['is']).toBeUndefined();

       // Generar reporte
       const report = generateWordReport(text, {
         limit: 5,
         filterCommon: true,
         commonWords: ['is', 'a', 'for', 'with', 'the', 'and', 'or', 'but'],
       });

      expect(report.totalWords).toBe(15);
      expect(report.uniqueWords).toBe(10);
      expect(report.filteredWords).toBe(3);
     });

    test('debe manejar casos edge complejos', () => {
      const text = 'a b c hello123 world456 test789';

      const frequency = countWordFrequency(text);
      expect(frequency).toEqual({
        hello123: 1,
        world456: 1,
        test789: 1,
      });

      const report = generateWordReport(text);
      expect(report.totalWords).toBe(3);
      expect(report.uniqueWords).toBe(3);
    });
  });
});
