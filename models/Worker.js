const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const WorkerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: [true, 'Please add a description about you']
    },

    photo: {
        type: String,
        default: 'no-photo.jpg'
    },

    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating can not be more than 5']
    },

    address: {
        type: String,
        required: [true, 'Please add an address']
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
        streetNumber: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },

    idPhoto: {
        type: String,
    },

    phone: {
        type: String,
        required: [true, 'Please add your phone number'],
        match: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                'Please add a valid number']
    },

    services: [{
        service: {
            type: String,
            required: [true, 'Please select a service']
        },
        price: {
            type: Number,
            required: [true, 'Please add a price']
        },
    }]
});

WorkerSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        country: loc[0].countryCode,
        zipcode: loc[0].zipcode
    };

    this.address = undefined;

    next();
});

module.exports = mongoose.model('Worker', WorkerSchema);