const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

// ServiceSchema.pre('deleteOne', { document: true }, function(next) {
//     // this.model('Worker').services.filter(service => service !== this._id.toString());
//     console.log(this.model('Worker'))
//     console.log(this.model('Worker').services)
//     next();
// })

module.exports = mongoose.model('Service', ServiceSchema);