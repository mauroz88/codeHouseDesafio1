const express = require('express');
const router = express.Router();
const { generateUsers } = require('../modules/mockingUsers'); // Módulo que genera usuarios
const { generateAndSavePets } = require('../modules/mockingPets'); // Módulo que genera mascotas
const User = require('../models/user'); // Modelo de usuario
const Pet = require('../models/Pet'); // Modelo de mascotas



// Metodo para generar 50 usuarios con facker
router.get('/mockingusers', async (req, res) => {
    try {
        const users = [];
        for (let i = 0; i < 50; i++) {
            const user = new User({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "coder123", // El password ya está siendo encriptado en el middleware
                role: faker.helpers.arrayElement(['user', 'admin']),
                pets: []
            });
            users.push(user);
            await user.save();
        }
        res.json({ status: 'success', users });
    } catch (error) {
        res.status(500).json({ error: 'Error generando usuarios: ' + error.message });
    }
});

// metodo post para generar una cierta cantidad de users y pets 
router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;

    if (!users || !pets) {
        return res.status(400).json({ error: 'Debe proporcionar los parámetros "users" y "pets"' });
    }

    try {
        // Genero los usuarios y las mascotas solicitadas
        const generatedUsers = generateUsers(users); // Generar usuarios
        const generatedPets = generateAndSavePets(pets);   // Generar mascotas        
        await User.insertMany(generatedUsers); // Guardo los usuarios generados en la base de datos        
        await Pet.insertMany(generatedPets); // Guardo las mascotas generadas en la base de datos
        return res.status(201).json({ message: 'Datos generados e insertados correctamente', users, pets });
    } catch (error) {
        return res.status(500).json({ error: 'Error generando datos: ' + error.message });
    }
});

// Ruta GET para obtener todos los usuarios  //http://localhost:3000/api/mocks/users
router.get('/users', async (req, res) => {
    try {
      const users = await User.find(); // Obtener todos los usuarios de la base de datos
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
  
  // Ruta GET para obtener todas las mascotas //http://localhost:3000/api/mocks/pets
  router.get('/pets', async (req, res) => {
    try {
      const pets = await Pet.find(); // Obtener todas las mascotas de la base de datos
      res.status(200).json(pets);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  
module.exports = router;

