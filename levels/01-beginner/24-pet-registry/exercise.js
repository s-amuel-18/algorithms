/**
 * Pet Registry
 *
 * Description: implement two basic classes (`Pet` and `PetRegistry`)
 * to practice constructors, instance methods, internal collections,
 * and Fail Fast validations with `instanceof`.
 * Difficulty: BEGINNER
 *
 * Suggested principles:
 * - KISS and expressive naming to keep methods small
 * - Fail Fast when validating inputs
 * - Prefer immutability when returning derived data
 */

/**
 * Represents a single pet inside the registry.
 * @class
 */
class Pet {
    /**
     * @param {string} name - Public name of the pet (non-empty).
     * @param {string} type - Animal type (dog, cat, etc.).
     * @param {number} age - Age in years, integer greater or equal to 0.
     *
     * TODO:
     * - Validate each argument and throw the errors described in the README.
     * - Assign the validated values to `this`.
     */
    constructor(name, type, age) {
        type = type.trim()
        name = name.trim()

        if (name === '') {
            throw new Error('Pet name is required')
        } else if (type === '') {
            throw new Error('Pet type is required')
        }else if(age < 0){
            throw new Error('Pet age must be a number greater than or equal to 0')
        }



        this.name = name
        this.type = type
        this.age = age


        // throw new Error('Pet constructor not implemented');
    }


    /**
     * Generates a human-friendly description of the pet.
     * @returns {string} Text such as "Luna  dog that is 3 years old".
     *
     * TODO:
     * - Use template literals.
     * - Handle singular versus plural for the word "year".
     */
    getDescription() {
        if (this.age >= 2 || this.age === 0) {
            console.log(this.name + ' is a ' + this.type + ' that is ' + this.age + ' years old')
            return this.name + ' is a ' + this.type + ' that is ' + this.age + ' years old'
        } else {
            console.log(this.name + ' is a ' + this.type + ' that is ' + this.age + ' year old')
            return this.name + ' is a ' + this.type + ' that is ' + this.age + ' year old'
        }

        // throw new Error('Method getDescription not implemented');
    }

    /**
     * Increments the pet age by one year.
     * @returns {number} The updated age.
     *
     * TODO:
     * - Add 1 to `this.age`.
     * - Return the new value so callers can chain assertions.
     */
    haveBirthday() {
        this.age++
        return this.age
        // throw new Error('Method haveBirthday not implemented');
    }
}

const igor = new Pet('igor', 'cat', 2)

// console.log(igor.getDescription())
igor.getDescription()

console.log('igor' instanceof Pet)
/**
 * Manages the entire registry of pets.
 * @class
 */
class PetRegistry {
    /**
     * Creates an empty registry.
     *
     * TODO:
     * - Initialize an internal array (`this.pets = []`).
     */
    pets = []
    constructor() {

        // throw new Error('PetRegistry constructor not implemented');
    }

    /**
     * Adds a new pet to the registry.
     * @param {Pet} pet - Valid `Pet` instance.
     * @returns {number} Total number of pets stored after insertion.
     *
     * TODO:
     * - Validate using `instanceof Pet`.
     * - Throw `new Error("Pet must be an instance of Pet")` if validation fails.
     * - Push into the internal array and return its `length`.
     */
    addPet(pet) {

        if (pet instanceof Pet) {

            this.pets.push(pet)
        } else {
            throw new Error("Pet must be an instance of Pet")
        }



        console.log(this.pets.length)
        return this.pets.length
        // throw new Error('Method addPet not implemented');
    }

    /**
     * Finds the first pet whose name matches (case-insensitive).
     * @param {string} name - Name to search for.
     * @returns {Pet|null} The match or `null`.
     *
     * TODO:
     * - Normalize both names with `toLowerCase()` before comparing.
     */
    findByName(name) {
        name = name.toLowerCase()
        for (let i = 0; i < this.pets.length; i++) {
            let petNow = this.pets[i].name.toLowerCase()
            if (petNow === name) {
                console.log(this.pets[i])
                return this.pets[i]
            }

        }
        return null

        // throw new Error('Method findByName not implemented');
    }

    /**
     * Returns readable descriptions for every stored pet.
     * @returns {string[]} Fresh array containing each `getDescription()` result.
     *
     * TODO:
     * - Use `map` so the internal array is never exposed or mutated.
     */
    getDescriptions() {
        let descriptions = this.pets.map(pet => pet.getDescription())
        console.log(descriptions)

        return descriptions
        // throw new Error('Method getDescriptions not implemented');
    }
}
const carlos = new Pet('carlos', 'dog', 2)
const monchi = new Pet('monchi', 'parrot', 2)
const azucar = new Pet('azucar', 'bunny', 2)
// const qq = new Pet('', 'sdsad', 2)


console.log(new PetRegistry())

const registro = new PetRegistry()
registro.addPet(igor)
registro.addPet(carlos)
registro.addPet(monchi)
registro.addPet(azucar)
// registro.addPet(qq)
console.log(registro)


registro.findByName('igor')
registro.getDescriptions()


console.log(igor)
console.log(igor.haveBirthday())
console.log(igor)

registro.getDescriptions()
module.exports = {

    Pet,
    PetRegistry
};
