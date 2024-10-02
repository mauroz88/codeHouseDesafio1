const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

// Función para generar usuarios
function generateUsers(numUsers) {
    const users = [];
    for (let i = 0; i < numUsers; i++) {
        const user = {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: bcrypt.hashSync("coder123", 10), // Encriptando el password
            role: faker.helpers.arrayElement(['user', 'admin']),
            pets: [] // Pets array vacío por defecto
        };
        users.push(user);
    }
    return users;
}

module.exports = { generateUsers };
