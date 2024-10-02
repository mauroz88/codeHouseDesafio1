const { faker } = require('@faker-js/faker');
const Pet = require('../models/Pet'); 

// Función para generar una mascota
function generatePet() {
    return {
        name: faker.animal.dog(),
        breed: faker.animal.dog(),
        age: faker.number.int({ min: 1, max: 15 }),
        color: faker.color.human(),
        adopted: false,
    };
}

// Función para generar y guardar mascotas en la base de datos
async function generateAndSavePets(number) {
    const pets = [];
    for (let i = 0; i < number; i++) {
        const petData = generatePet();
        pets.push(new Pet(petData)); 
    }
    
    await Pet.insertMany(pets);
    console.log(`${number} mascotas generadas y guardadas en MongoDB`);
    return pets;
}

module.exports = { generateAndSavePets };

