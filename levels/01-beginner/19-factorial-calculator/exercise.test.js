const { calculateFactorial,
  isFactorialOf,
  findFactorialDigits,
  factorialRange,
  countTrailingZeros,
} = require('./exercise');
// } = require('../../../solutions/01-beginner/19-factorial-calculator/solution');

describe('Calculadora de Factoriales', () => {
  // Tests para calculateFactorial
  describe('calculateFactorial', () => {
    test('debe calcular factorial de 0', () => {
      expect(calculateFactorial(0)).toBe(1);
    });

    test('debe calcular factorial de 1', () => {
      expect(calculateFactorial(1)).toBe(1);
    });

    test('debe calcular factorial de 5', () => {
      expect(calculateFactorial(5)).toBe(120);
    });

    test('debe calcular factorial de 3', () => {
      expect(calculateFactorial(3)).toBe(6);
    });

    test('debe calcular factorial de 7', () => {
      expect(calculateFactorial(7)).toBe(5040);
    });

    test('debe calcular factorial de 10', () => {
      expect(calculateFactorial(10)).toBe(3628800);
    });

    test('debe manejar número negativo', () => {
      expect(calculateFactorial(-5)).toBeNull();
    });

    test('debe manejar números decimales', () => {
      expect(calculateFactorial(5.5)).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(calculateFactorial('5')).toBeNull();
      expect(calculateFactorial(null)).toBeNull();
      expect(calculateFactorial(undefined)).toBeNull();
    });
  });

  // Tests para isFactorialOf
  describe('isFactorialOf', () => {
    test('debe verificar que 120 es factorial de 5', () => {
      expect(isFactorialOf(5, 120)).toBe(true);
    });

    test('debe verificar que 6 es factorial de 3', () => {
      expect(isFactorialOf(3, 6)).toBe(true);
    });

    test('debe verificar que 1 es factorial de 0', () => {
      expect(isFactorialOf(0, 1)).toBe(true);
    });

    test('debe verificar que 100 NO es factorial de 5', () => {
      expect(isFactorialOf(5, 100)).toBe(false);
    });

    test('debe verificar con números incorrectos', () => {
      expect(isFactorialOf(4, 23)).toBe(false);
      expect(isFactorialOf(10, 1000000)).toBe(false);
    });

    test('debe manejar números negativos', () => {
      expect(isFactorialOf(-5, 120)).toBe(false);
      expect(isFactorialOf(5, -120)).toBe(false);
    });

    test('debe manejar entrada inválida', () => {
      expect(isFactorialOf('5', 120)).toBe(false);
      expect(isFactorialOf(5, '120')).toBe(false);
      expect(isFactorialOf(null, 120)).toBe(false);
      expect(isFactorialOf(5, null)).toBe(false);
    });

    test('debe verificar factorial de números grandes', () => {
      expect(isFactorialOf(7, 5040)).toBe(true);
    });
  });

  // Tests para findFactorialDigits
  describe('findFactorialDigits', () => {
    test('debe calcular dígitos de 0!', () => {
      expect(findFactorialDigits(0)).toBe(1);
    });

    test('debe calcular dígitos de 5!', () => {
      expect(findFactorialDigits(5)).toBe(3); // 120 tiene 3 dígitos
    });

    test('debe calcular dígitos de 10!', () => {
      expect(findFactorialDigits(10)).toBe(7); // 3628800 tiene 7 dígitos
    });

    test('debe calcular dígitos de 7!', () => {
      expect(findFactorialDigits(7)).toBe(4); // 5040 tiene 4 dígitos
    });

    test('debe manejar número negativo', () => {
      expect(findFactorialDigits(-5)).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(findFactorialDigits('5')).toBeNull();
      expect(findFactorialDigits(null)).toBeNull();
      expect(findFactorialDigits(undefined)).toBeNull();
    });

    test('debe calcular dígitos de 1!', () => {
      expect(findFactorialDigits(1)).toBe(1);
    });
  });

  // Tests para factorialRange
  describe('factorialRange', () => {
    test('debe calcular factoriales en rango básico', () => {
      const result = factorialRange(0, 5);
      
      expect(result).toEqual([
        { number: 0, factorial: 1 },
        { number: 1, factorial: 1 },
        { number: 2, factorial: 2 },
        { number: 3, factorial: 6 },
        { number: 4, factorial: 24 },
        { number: 5, factorial: 120 },
      ]);
    });

    test('debe calcular factoriales en rango pequeño', () => {
      const result = factorialRange(3, 7);
      
      expect(result).toEqual([
        { number: 3, factorial: 6 },
        { number: 4, factorial: 24 },
        { number: 5, factorial: 120 },
        { number: 6, factorial: 720 },
        { number: 7, factorial: 5040 },
      ]);
    });

    test('debe manejar rango de un solo elemento', () => {
      const result = factorialRange(5, 5);
      
      expect(result).toEqual([
        { number: 5, factorial: 120 },
      ]);
    });

    test('debe manejar rango inválido (start > end)', () => {
      expect(factorialRange(5, 3)).toBeNull();
    });

    test('debe manejar números negativos en el rango', () => {
      expect(factorialRange(-3, 5)).toBeNull();
      expect(factorialRange(3, -5)).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(factorialRange('3', 5)).toBeNull();
      expect(factorialRange(3, '5')).toBeNull();
      expect(factorialRange(null, 5)).toBeNull();
      expect(factorialRange(3, null)).toBeNull();
    });

    test('debe calcular rango empezando desde 0', () => {
      const result = factorialRange(0, 3);
      
      expect(result).toEqual([
        { number: 0, factorial: 1 },
        { number: 1, factorial: 1 },
        { number: 2, factorial: 2 },
        { number: 3, factorial: 6 },
      ]);
    });
  });

  // Tests para countTrailingZeros
  describe('countTrailingZeros', () => {
    test('debe contar ceros finales de 5!', () => {
      expect(countTrailingZeros(5)).toBe(1); // 120 tiene 1 cero final
    });

    test('debe contar ceros finales de 10!', () => {
      expect(countTrailingZeros(10)).toBe(2); // 3628800 tiene 2 ceros finales
    });

    test('debe contar ceros finales de 25!', () => {
      expect(countTrailingZeros(25)).toBe(6);
    });

    test('debe contar ceros finales de 0!', () => {
      expect(countTrailingZeros(0)).toBe(0);
    });

    test('debe contar ceros finales de 4!', () => {
      expect(countTrailingZeros(4)).toBe(0); // 24 no tiene ceros finales
    });

    test('debe manejar número negativo', () => {
      expect(countTrailingZeros(-5)).toBeNull();
    });

    test('debe manejar entrada inválida', () => {
      expect(countTrailingZeros('5')).toBeNull();
      expect(countTrailingZeros(null)).toBeNull();
      expect(countTrailingZeros(undefined)).toBeNull();
    });

    test('debe contar ceros finales de números más grandes', () => {
      expect(countTrailingZeros(20)).toBe(4);
      expect(countTrailingZeros(30)).toBe(7);
    });
  });

  // Tests de integración
  describe('Integración completa', () => {
    test('debe integrar todas las funciones correctamente', () => {
      const n = 7;
      
      // Calcular factorial
      const factorial = calculateFactorial(n);
      expect(factorial).toBe(5040);
      
      // Verificar que es correcto
      expect(isFactorialOf(n, factorial)).toBe(true);
      
      // Contar dígitos
      const digits = findFactorialDigits(n);
      expect(digits).toBe(4);
      
      // Contar ceros finales
      const zeros = countTrailingZeros(n);
      expect(zeros).toBe(1);
    });

    test('debe trabajar con rango y análisis simultáneo', () => {
      const range = factorialRange(5, 10);
      expect(range).toBeDefined();
      
      // Verificar que cada factorial sea correcto
      range.forEach(item => {
        const calculated = calculateFactorial(item.number);
        expect(calculated).toBe(item.factorial);
      });
    });

    test('debe manejar casos edge complejos', () => {
      // 0 debería funcionar en todos los casos
      expect(calculateFactorial(0)).toBe(1);
      expect(isFactorialOf(0, 1)).toBe(true);
      expect(findFactorialDigits(0)).toBe(1);
      expect(countTrailingZeros(0)).toBe(0);
      
      // Valores en el rango deberían incluir 0
      const range = factorialRange(0, 2);
      expect(range[0].factorial).toBe(1);
    });

    test('debe validar consistencia entre funciones', () => {
      const tests = [3, 6, 8, 10];
      
      tests.forEach(n => {
        const factorial = calculateFactorial(n);
        const digits = findFactorialDigits(n);
        
        // Verificar que isFactorialOf funciona
        expect(isFactorialOf(n, factorial)).toBe(true);
        
        // Verificar que los dígitos sean correctos
        expect(String(factorial).length).toBe(digits);
      });
    });
  });
});

