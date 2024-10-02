
const express = require('express');
const { generateAndSavePets } = require('../modules/mockingPets'); 
const router = express.Router();


router.get('/mockingpets', async (req, res) => {
    try {
        const pets = await generateAndSavePets(100);
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ message: 'Error al generar mascotas', error });
    }
});

module.exports = router;

