const mongoose = require('mongoose');

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
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },

    idPhoto: {
        type: String,
    },

    price: {
        type: Number,
        required: [true, 'Please add your hourly rate']
    },

    phone: {
        type: String,
        required: [true, 'Please add your phone number'],
        match: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
                'Please add a valid number']
    },

    services: {
        type: [mongoose.Schema.ObjectId],
        ref: 'Service',
    }
});

module.exports = mongoose.model('Worker', WorkerSchema);