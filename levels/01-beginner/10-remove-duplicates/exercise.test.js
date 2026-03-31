const removeDuplicates = require('./exercise');

describe('Remove Duplicates', () => {
    
    test('debe eliminar duplicados manteniendo el orden', () => {
        expect(removeDuplicates([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
        expect(removeDuplicates([3, 7, 2, 9, 2, 7, 1])).toEqual([3, 7, 2, 9, 1]);
        expect(removeDuplicates([10, 5, 8, 3, 5, 10])).toEqual([10, 5, 8, 3]);
    });

    test('debe manejar arrays con todos los elementos iguales', () => {
        expect(removeDuplicates([5, 5, 5, 5])).toEqual([5]);
        expect(removeDuplicates([1, 1, 1])).toEqual([1]);
        expect(removeDuplicates([0, 0, 0, 0, 0])).toEqual([0]);
    });

    test('debe manejar arrays sin duplicados', () => {
        expect(removeDuplicates([1, 2, 3])).toEqual([1, 2, 3]);
        expect(removeDuplicates([5, 4, 3, 2, 1])).toEqual([5, 4, 3, 2, 1]);
        expect(removeDuplicates([100, 200, 300])).toEqual([100, 200, 300]);
    });

    test('debe manejar arrays vacíos', () => {
        expect(removeDuplicates([])).toEqual([]);
    });

    test('debe manejar arrays con un solo elemento', () => {
        expect(removeDuplicates([42])).toEqual([42]);
        expect(removeDuplicates([-5])).toEqual([-5]);
        expect(removeDuplicates([0])).toEqual([0]);
    });

    test('debe manejar duplicados consecutivos', () => {
        expect(removeDuplicates([1, 1, 2, 2, 3, 3])).toEqual([1, 2, 3]);
        expect(removeDuplicates([5, 5, 3, 3, 1, 1])).toEqual([5, 3, 1]);
        expect(removeDuplicates([10, 10, 10, 20, 20, 30])).toEqual([10, 20, 30]);
    });

    test('debe manejar duplicados no consecutivos', () => {
        expect(removeDuplicates([1, 2, 1, 2, 1, 2])).toEqual([1, 2]);
        expect(removeDuplicates([3, 1, 3, 2, 3, 1, 3])).toEqual([3, 1, 2]);
        expect(removeDuplicates([5, 1, 5, 2, 5, 3, 5])).toEqual([5, 1, 2, 3]);
    });

    test('debe manejar números negativos', () => {
        expect(removeDuplicates([-1, -1, 0, 1, 1])).toEqual([-1, 0, 1]);
        expect(removeDuplicates([-5, -3, -5, -1, -3])).toEqual([-5, -3, -1]);
        expect(removeDuplicates([-10, 5, -10, 0, 5])).toEqual([-10, 5, 0]);
    });

    test('debe manejar números decimales', () => {
        expect(removeDuplicates([1.5, 1.5, 2.5])).toEqual([1.5, 2.5]);
        expect(removeDuplicates([3.14, 2.71, 3.14, 1.41])).toEqual([3.14, 2.71, 1.41]);
        expect(removeDuplicates([0.5, 0.5, 0.5])).toEqual([0.5]);
    });

    test('debe manejar arrays mixtos (enteros y decimales)', () => {
        expect(removeDuplicates([1, 1.5, 2, 1.5, 3])).toEqual([1, 1.5, 2, 3]);
        expect(removeDuplicates([5, 5.0, 5.5, 5, 6])).toEqual([5, 5.5, 6]);
    });

    test('debe mantener el orden de aparición', () => {
        // El primer elemento debe aparecer primero
        expect(removeDuplicates([2, 1, 2, 3, 1, 4])).toEqual([2, 1, 3, 4]);
        
        // El último elemento único debe aparecer al final
        expect(removeDuplicates([1, 2, 3, 2, 1, 4, 3])).toEqual([1, 2, 3, 4]);
        
        // Orden específico con múltiples duplicados
        expect(removeDuplicates([5, 3, 5, 1, 3, 7, 5, 1])).toEqual([5, 3, 1, 7]);
    });

    test('debe manejar arrays largos', () => {
        const input = [1, 2, 3, 1, 4, 2, 5, 3, 6, 4, 7, 5, 8, 6, 9, 7, 10];
        const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        expect(removeDuplicates(input)).toEqual(expected);
    });

    test('casos edge adicionales', () => {
        // Array con ceros
        expect(removeDuplicates([0, 1, 0, 2, 0])).toEqual([0, 1, 2]);
        
        // Array con números grandes
        expect(removeDuplicates([1000, 500, 1000, 750, 500])).toEqual([1000, 500, 750]);
        
        // Array ordenado descendente
        expect(removeDuplicates([5, 4, 3, 2, 1, 4, 3, 2])).toEqual([5, 4, 3, 2, 1]);
        
        // Array ordenado ascendente con duplicados
        expect(removeDuplicates([1, 1, 2, 2, 3, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });
});
