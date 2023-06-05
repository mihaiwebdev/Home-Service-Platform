const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.ObjectId,
        ref: 'Client',
        required: true
    },
    housingType: {
        type: String,
        required: [true, 'Va rugam adaugati tipul locuintei, ex: casa, apartament']
    },
    yardArea: {
        type: String,
    },
    rooms: {
        type: Number,
        required: [true, 'Va rugam adaugati numarul de camere']
    },
    address: {
        type: String,
        required: [true, 'Va rugam adaugati adresa locuintei']
    }
});

module.exports = mongoose.model('House', HouseSchema);