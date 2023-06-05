const mongoose = require('mongoose');
const slugify = require('slugify');

const ServiceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true
    }
});

ServiceSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

ServiceSchema.pre('deleteOne', { document: true }, async function(next) {
    const workers = await this.model('Worker').find(
        {
            services: { $elemMatch: { service: this.slug }}
        }
    );

    workers.map(async worker => {    
        worker.services = worker.services.filter(obj => obj.service !== this.slug);
        await worker.save();
    });

    next();
})

module.exports = mongoose.model('Service', ServiceSchema);