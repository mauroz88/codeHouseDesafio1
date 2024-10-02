const mongoose = require('mongoose');


const petSchema = new mongoose.Schema({
    name: { type: String},
    breed: { type: String},
    age: { type: Number},
    color: { type: String},
    adopted: { type: Boolean},
});


const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
