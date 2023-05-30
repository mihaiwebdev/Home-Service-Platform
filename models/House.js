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
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    }
});

module.exports = mongoose.model('House', HouseSchema);