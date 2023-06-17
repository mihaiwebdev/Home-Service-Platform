const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
    service: {
        service: String,
        price: Number
    },

    client: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    worker: {
        type: mongoose.Schema.ObjectId,
        ref: 'Worker',
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    hour: {
        type: Number
    },

    city: String,
    address: String,
    addressDetail: String,

    isCompleted: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Contract', ContractSchema);