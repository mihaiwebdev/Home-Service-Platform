const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    worker: {
        type: mongoose.Schema.ObjectId,
        ref: 'Worker',
        required: true
    },

    date: {
        type: Date,
        required: [true, 'Please add a date'],
    },

    availability: {
        type: Map,
        of: Boolean,
        required: [true, 'Please add your available hours'],
    }
});

ScheduleSchema.pre('save', async function(next) {
    const worker = await this.model('Worker').findById(this.worker);
    worker.schedule = worker.schedule.concat(this._id);
    await worker.save();

    next();
});

module.exports = mongoose.model('Schedule', ScheduleSchema);