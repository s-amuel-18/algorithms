const { Pet, PetRegistry } = require('./exercise');

const buildPet = (name = 'Luna', type = 'dog', age = 3) => new Pet(name, type, age);

describe('Pet Registry', () => {
    // ===== BASIC CASES =====
    describe('Basic scenarios', () => {
        test('stores properties when instantiating Pet', () => {
            // Purpose: ensure the constructor assigns base fields correctly.
            const pet = buildPet();
            expect(pet.name).toBe('Luna');
            expect(pet.type).toBe('dog');
            expect(pet.age).toBe(3);
        });

        test('getDescription handles singular and plural correctly', () => {
            // Purpose: guarantee human-readable formatting.
            const cat = buildPet('Mila', 'cat', 1);
            const dog = buildPet('Rocky', 'dog', 4);

            expect(cat.getDescription()).toBe('Mila is a cat that is 1 year old');
            expect(dog.getDescription()).toBe('Rocky is a dog that is 4 years old');
        });

        test('haveBirthday increments and returns the new age', () => {
            // Purpose: verify internal state increases by 1 and returns the new value.
            const pet = buildPet();
            expect(pet.haveBirthday()).toBe(4);
            expect(pet.age).toBe(4);
        });

        test('PetRegistry starts empty and accepts valid instances', () => {
            // Purpose: validate ideal insertion flow.
            const registry = new PetRegistry();
            const luna = buildPet();
            const mila = buildPet('Mila', 'cat', 1);

            expect(registry.pets).toEqual([]);
            expect(registry.addPet(luna)).toBe(1);
            expect(registry.addPet(mila)).toBe(2);
            expect(registry.getDescriptions()).toEqual([
                'Luna is a dog that is 3 years old',
                'Mila is a cat that is 1 year old'
            ]);
        });
    });

    // ===== EDGE CASES AND LIMITS =====
    describe('Edge cases and limits', () => {
        test('findByName returns null when the registry is empty', () => {
            // Purpose: ensure the empty state is handled.
            const registry = new PetRegistry();
            expect(registry.findByName('Luna')).toBeNull();
        });

        test('findByName ignores casing', () => {
            // Purpose: confirm case-insensitive comparisons.
            const registry = new PetRegistry();
            const rocky = buildPet('Rocky', 'dog', 4);
            registry.addPet(rocky);

            expect(registry.findByName('rocky')).toBe(rocky);
            expect(registry.findByName('ROCKY')).toBe(rocky);
        });

        test('getDescriptions reflects updated ages', () => {
            // Purpose: ensure descriptions read the current object state.
            const registry = new PetRegistry();
            const mila = buildPet('Mila', 'cat', 1);
            mila.haveBirthday(); // now 2
            registry.addPet(mila);

            expect(registry.getDescriptions()).toEqual(['Mila is a cat that is 2 years old']);
        });
    });

    // ===== INPUT VALIDATION (FAIL FAST) =====
    describe('Input validation (Fail Fast)', () => {
        test('throws when the name is empty', () => {
            // Purpose: Fail Fast in constructor with the exact message.
            expect(() => new Pet('', 'dog', 1)).toThrow('Pet name is required');
        });

        test('throws when the type is invalid', () => {
            // Purpose: ensure whitespace-only types are rejected.
            expect(() => new Pet('Luna', '   ', 1)).toThrow(        );
        });

        test('throws when the age is negative', () => {
            // Purpose: validate allowed range for age.
            expect(() => new Pet('Luna', 'dog', -1)).toThrow('Pet age must be a number greater than or equal to 0');
        });

        test('addPet only accepts Pet instances', () => {
            // Purpose: enforce the registry error message.
            const registry = new PetRegistry();
            expect(() => registry.addPet({ name: 'Invalid' })).toThrow('Pet must be an instance of Pet');
            expect(registry.pets.length).toBe(0);
        });
    });

    // ===== IMMUTABILITY AND CONSISTENCY =====
    describe('Immutability and consistency', () => {
        test('getDescriptions returns a new array on each call', () => {
            // Purpose: ensure internal array references are not leaked.
            const registry = new PetRegistry();
            registry.addPet(buildPet());
            const firstSnapshot = registry.getDescriptions();

            firstSnapshot.push('Attempt to mutate');

            expect(registry.getDescriptions()).toEqual(['Luna is a dog that is 3 years old']);
        });

        test('findByName always returns the stored instance', () => {
            // Purpose: guarantee determinism across multiple requests.
            const registry = new PetRegistry();
            const luna = buildPet();
            registry.addPet(luna);

            expect(registry.findByName('luna')).toBe(luna);
            expect(registry.findByName('LUNA')).toBe(luna);
        });
    });

    // ===== PERFORMANCE AND SCALABILITY =====
    describe('Performance and scalability', () => {
        test('handles multiple pets while preserving insertion order', () => {
            // Purpose: ensure linear performance and stable ordering.
            const registry = new PetRegistry();
            const names = Array.from({ length: 50 }, (_, index) => `Pet-${index}`);

            names.forEach((name, index) => {
                registry.addPet(buildPet(name, 'dog', index));
            });

            const descriptions = registry.getDescriptions();
            expect(descriptions).toHaveLength(50);
            expect(descriptions[0]).toBe('Pet-0 is a dog that is 0 years old');
            expect(descriptions[49]).toBe('Pet-49 is a dog that is 49 years old');
        });
    });
});

