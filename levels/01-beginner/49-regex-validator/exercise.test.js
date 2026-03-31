const validateRegex = require('./exercise');

describe('Validador de Expresiones Regulares', () => {
    // ===== CASOS BÁSICOS =====
    describe('Casos básicos - Verificación de funcionalidad principal', () => {
        test('debe validar correctamente un email válido', () => {
            // Propósito: Verificar que la función valida correctamente emails válidos
            // Entrada: "user@example.com", "email" - Email válido estándar
            // Esperado: true - Email válido debe retornar true
            expect(validateRegex("user@example.com", "email")).toBe(true);
        });

        test('debe validar correctamente un teléfono con guiones', () => {
            // Propósito: Verificar que la función valida teléfonos con formato estándar
            // Entrada: "123-456-7890", "phone" - Teléfono con guiones
            // Esperado: true - Teléfono válido debe retornar true
            expect(validateRegex("123-456-7890", "phone")).toBe(true);
        });

        test('debe validar correctamente un código postal de 5 dígitos', () => {
            // Propósito: Verificar que la función valida códigos postales básicos
            // Entrada: "12345", "postalCode" - Código postal de 5 dígitos
            // Esperado: true - Código postal válido debe retornar true
            expect(validateRegex("12345", "postalCode")).toBe(true);
        });

        test('debe validar correctamente una URL con https', () => {
            // Propósito: Verificar que la función valida URLs con protocolo https
            // Entrada: "https://example.com", "url" - URL con https
            // Esperado: true - URL válida debe retornar true
            expect(validateRegex("https://example.com", "url")).toBe(true);
        });

        test('debe validar correctamente una fecha en formato MM/DD/YYYY', () => {
            // Propósito: Verificar que la función valida fechas en formato estándar
            // Entrada: "12/25/2023", "date" - Fecha válida
            // Esperado: true - Fecha válida debe retornar true
            expect(validateRegex("12/25/2023", "date")).toBe(true);
        });
    });

    // ===== CASOS EDGE Y LÍMITES =====
    describe('Casos edge y límites - Verificación de comportamientos extremos', () => {
        test('debe retornar false para email inválido sin @', () => {
            // Propósito: Verificar comportamiento cuando el email no tiene @
            // Entrada: "invalid-email", "email" - Email sin @
            // Esperado: false - Email inválido debe retornar false
            expect(validateRegex("invalid-email", "email")).toBe(false);
        });

        test('debe retornar false para teléfono con formato incorrecto', () => {
            // Propósito: Verificar comportamiento cuando el teléfono no tiene formato válido
            // Entrada: "123", "phone" - Teléfono muy corto
            // Esperado: false - Teléfono inválido debe retornar false
            expect(validateRegex("123", "phone")).toBe(false);
        });

        test('debe retornar false para código postal con menos de 5 dígitos', () => {
            // Propósito: Verificar comportamiento cuando el código postal es muy corto
            // Entrada: "1234", "postalCode" - Código postal con 4 dígitos
            // Esperado: false - Código postal inválido debe retornar false
            expect(validateRegex("1234", "postalCode")).toBe(false);
        });

        test('debe retornar false para URL sin protocolo', () => {
            // Propósito: Verificar comportamiento cuando la URL no tiene protocolo
            // Entrada: "example.com", "url" - URL sin http/https
            // Esperado: false - URL inválida debe retornar false
            expect(validateRegex("example.com", "url")).toBe(false);
        });

        test('debe retornar false para fecha con formato incorrecto', () => {
            // Propósito: Verificar comportamiento cuando la fecha no tiene formato válido
            // Entrada: "2023-12-25", "date" - Fecha con formato diferente
            // Esperado: false - Fecha inválida debe retornar false
            expect(validateRegex("2023-12-25", "date")).toBe(false);
        });

        test('debe manejar correctamente string vacío', () => {
            // Propósito: Verificar comportamiento cuando el texto está vacío
            // Entrada: "", "email" - String vacío
            // Esperado: false - String vacío no debe coincidir con ningún patrón
            expect(validateRegex("", "email")).toBe(false);
        });

        test('debe validar código postal ZIP+4', () => {
            // Propósito: Verificar que la función valida códigos postales ZIP+4
            // Entrada: "12345-6789", "postalCode" - Código postal ZIP+4
            // Esperado: true - Código postal ZIP+4 válido debe retornar true
            expect(validateRegex("12345-6789", "postalCode")).toBe(true);
        });

        test('debe validar teléfono con paréntesis', () => {
            // Propósito: Verificar que la función valida teléfonos con paréntesis
            // Entrada: "(123) 456-7890", "phone" - Teléfono con paréntesis
            // Esperado: true - Teléfono con paréntesis válido debe retornar true
            expect(validateRegex("(123) 456-7890", "phone")).toBe(true);
        });

        test('debe validar URL con http', () => {
            // Propósito: Verificar que la función valida URLs con http
            // Entrada: "http://example.com", "url" - URL con http
            // Esperado: true - URL con http válida debe retornar true
            expect(validateRegex("http://example.com", "url")).toBe(true);
        });

        test('debe validar fecha en formato DD/MM/YYYY', () => {
            // Propósito: Verificar que la función valida fechas en formato DD/MM/YYYY
            // Entrada: "25/12/2023", "date" - Fecha en formato DD/MM/YYYY
            // Esperado: true - Fecha en formato DD/MM/YYYY válida debe retornar true
            expect(validateRegex("25/12/2023", "date")).toBe(true);
        });
    });

    // ===== VALIDACIÓN DE INPUTS (FAIL FAST) =====
    describe('Validación de inputs - Verificación de principio Fail Fast', () => {
        test('debe lanzar error cuando text no es string', () => {
            // Propósito: Verificar que la función valida tipos de datos y falla rápidamente
            // Entrada: 123, "email" - text no es string
            // Esperado: Error específico que debe lanzarse
            expect(() => validateRegex(123, "email")).toThrow();
        });

        test('debe lanzar error cuando patternType no es string', () => {
            // Propósito: Verificar validación de tipo para patternType
            // Entrada: "test@example.com", 123 - patternType no es string
            // Esperado: Error de tipo de dato
            expect(() => validateRegex("test@example.com", 123)).toThrow();
        });

        test('debe lanzar error cuando patternType no es un tipo válido', () => {
            // Propósito: Verificar validación de patternType válido
            // Entrada: "test@example.com", "invalid" - patternType inválido
            // Esperado: Error de tipo de patrón inválido
            expect(() => validateRegex("test@example.com", "invalid")).toThrow();
        });

        test('debe lanzar error cuando no se proporcionan parámetros', () => {
            // Propósito: Verificar validación de parámetros requeridos
            // Entrada: () - Sin parámetros cuando se requieren
            // Esperado: Error de parámetros faltantes
            expect(() => validateRegex()).toThrow();
        });

        test('debe lanzar error cuando text es null', () => {
            // Propósito: Verificar manejo de valores nulos
            // Entrada: null, "email" - text es null
            // Esperado: Error específico
            expect(() => validateRegex(null, "email")).toThrow();
        });

        test('debe lanzar error cuando text es undefined', () => {
            // Propósito: Verificar manejo de valores indefinidos
            // Entrada: undefined, "email" - text es undefined
            // Esperado: Error específico
            expect(() => validateRegex(undefined, "email")).toThrow();
        });
    });

    // ===== CASOS ADICIONALES Y ESPECIALES =====
    describe('Casos adicionales - Verificación de robustez y casos especiales', () => {
        test('debe validar email con subdominio', () => {
            // Propósito: Verificar funcionamiento con emails que tienen subdominios
            // Entrada: "user@mail.example.com", "email" - Email con subdominio
            // Esperado: true - Email con subdominio válido debe retornar true
            expect(validateRegex("user@mail.example.com", "email")).toBe(true);
        });

        test('debe validar teléfono con espacios', () => {
            // Propósito: Verificar funcionamiento con teléfonos que tienen espacios
            // Entrada: "123 456 7890", "phone" - Teléfono con espacios
            // Esperado: true - Teléfono con espacios válido debe retornar true
            expect(validateRegex("123 456 7890", "phone")).toBe(true);
        });

        test('debe validar URL con ruta', () => {
            // Propósito: Verificar funcionamiento con URLs que tienen rutas
            // Entrada: "https://example.com/path", "url" - URL con ruta
            // Esperado: true - URL con ruta válida debe retornar true
            expect(validateRegex("https://example.com/path", "url")).toBe(true);
        });

        test('debe retornar false para email sin dominio', () => {
            // Propósito: Verificar comportamiento cuando el email no tiene dominio
            // Entrada: "user@", "email" - Email sin dominio
            // Esperado: false - Email inválido debe retornar false
            expect(validateRegex("user@", "email")).toBe(false);
        });

        test('debe retornar false para email sin usuario', () => {
            // Propósito: Verificar comportamiento cuando el email no tiene usuario
            // Entrada: "@example.com", "email" - Email sin usuario
            // Esperado: false - Email inválido debe retornar false
            expect(validateRegex("@example.com", "email")).toBe(false);
        });

        test('debe validar múltiples formatos de teléfono', () => {
            // Propósito: Verificar que la función acepta múltiples formatos de teléfono
            // Entrada: Varios formatos de teléfono válidos
            // Esperado: Todos deben retornar true
            expect(validateRegex("1234567890", "phone")).toBe(true);
            expect(validateRegex("123-456-7890", "phone")).toBe(true);
            expect(validateRegex("(123) 456-7890", "phone")).toBe(true);
            expect(validateRegex("123 456 7890", "phone")).toBe(true);
        });
    });

    // ===== TESTS DE INMUTABILIDAD =====
    describe('Inmutabilidad - Verificación de principio de no mutación de datos originales', () => {
        test('no debe modificar el string original pasado como parámetro', () => {
            // Propósito: Verificar que la función no muta el string de entrada
            // Entrada: "test@example.com", "email" - String que se pasará a la función
            // Esperado: El string original debe permanecer exactamente igual después de la ejecución
            const originalText = "test@example.com";
            const textCopy = originalText.slice(); // Crear copia para comparación
            
            validateRegex(originalText, "email");
            
            // Verificar que el string original no ha sido modificado
            expect(originalText).toBe(textCopy);
        });
    });

    // ===== TESTS DE COMPORTAMIENTO DETERMINÍSTICO =====
    describe('Comportamiento determinístico - Verificación de consistencia en múltiples ejecuciones', () => {
        test('debe producir exactamente el mismo resultado en múltiples ejecuciones consecutivas', () => {
            // Propósito: Verificar que la función es determinística y produce resultados consistentes
            // Entrada: "user@example.com", "email" - Input que se ejecutará múltiples veces
            // Esperado: Todos los resultados deben ser idénticos
            const input = ["user@example.com", "email"];
            const results = Array.from({length: 10}, () => validateRegex(input[0], input[1]));
            
            const firstResult = results[0];
            results.forEach(result => {
                expect(result).toBe(firstResult);
            });
        });
    });

    // ===== TESTS DE ERRORES ESPECÍFICOS =====
    describe('Manejo de errores específicos - Verificación de mensajes y tipos de error apropiados', () => {
        test('debe lanzar error con mensaje descriptivo cuando text no es string', () => {
            // Propósito: Verificar que los errores tienen mensajes claros y útiles
            // Entrada: 123, "email" - Input que debe causar un error específico
            // Esperado: Mensaje de error específico y descriptivo
            expect(() => validateRegex(123, "email")).toThrow('Text must be a string');
        });

        test('debe lanzar error con mensaje descriptivo cuando patternType no es válido', () => {
            // Propósito: Verificar que los errores tienen mensajes claros para patternType inválido
            // Entrada: "test@example.com", "invalidType" - Input que debe causar un error específico
            // Esperado: Mensaje de error específico y descriptivo
            expect(() => validateRegex("test@example.com", "invalidType")).toThrow();
        });
    });
});

