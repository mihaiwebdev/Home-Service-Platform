const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    service: {
        type: mongoose.Schema.ObjectId,
        ref: 'Service',
        required: true
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

    city: String,
    address: String,
    addressDetail: String,
    price: Number,

    isCompleted: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Job', JobSchema);