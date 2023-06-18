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
        default: { 
            "05": true,
            "06": true,
            "07": true,
            "08": true,
            "09": true,
            "10": true,
            "11": true,
            "12": true,
            "13": true,
            "14": true,
            "15": true,
            "16": true,
            "17": true,
            "18": true,
            "19": true,
            "20": true,
            "21": true,
            "22": true,
            "23": true,
        },
    }
});

ScheduleSchema.pre('save', async function(next) {
    const worker = await this.model('Worker').findById(this.worker);
    
    worker.schedule.push(this._id);
    await worker.save();

    next();
});

module.exports = mongoose.model('Schedule', ScheduleSchema);