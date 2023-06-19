const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
    service: String,

    price: Number,

    client: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    message: String,
    
    worker: {
        type: mongoose.Schema.ObjectId,
        ref: 'Worker',
    },
    
    workerPhone: String,

    date: {
        type: Date,
        required: true
    },

    hour: {
        type: Number
    },
    address: String,
    addressDetail: String,

    isActive: {
        type: Boolean,
        default: true
    },

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