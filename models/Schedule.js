const mongoose = require('mongoose');
const Worker = require('../models/Worker');

const ScheduleSchema = new mongoose.Schema({
    worker: {
        type: mongoose.Schema.ObjectId,
        ref: 'Worker',
        required: true
    },

    date: {
        type: Date,
        required: true,
    },

    availability: {
        type: Map,
        of: Boolean,
        required: true
    }
});

ScheduleSchema.pre('save', async function(next) {
    const worker = await Worker.findById(this.worker);
    worker.schedule = worker.schedule.concat(this._id);
    await worker.save();

    next();
})

module.exports = mongoose.model('Schedule', ScheduleSchema);