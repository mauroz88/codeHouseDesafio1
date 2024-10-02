const express = require('express');
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');


const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB (local)
mongoose.connect('mongodb://localhost:27017/usuarios', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((error) => console.error('Error al conectar a MongoDB:', error));

// Definir un esquema y modelo de ejemplo
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
});

const User = mongoose.model('User', userSchema);

// Ruta para generar y guardar usuarios falsos
app.get('/generar', async (req, res) => {
    const fakeUsers = [];

    // Generar 10 usuarios falsos
    for (let i = 0; i < 10; i++) {
        const fakeUser = new User({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            address: faker.location.streetAddress(),
        });

        fakeUsers.push(fakeUser);
    }

    try {
        // Guardar los usuarios generados en la base de datos
        await User.insertMany(fakeUsers);
        res.status(201).json({ message: 'Usuarios falsos generados y guardados con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al generar usuarios' });
    }
});

// Ruta para obtener todos los usuarios
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
