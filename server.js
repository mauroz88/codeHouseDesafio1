const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

const mocksRouter = require('./routes/mocks.router');
const petsRouter = require('./routes/pets.router');

// conexion a Mongo
mongoose.connect('mongodb://localhost:27017/', {  
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));


app.use('/api/mocks', mocksRouter); // GET http://localhost:3000/api/mocks/mockingusers
app.use('/api', petsRouter); // GET http://localhost:3000/api/mockingpets



// servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});