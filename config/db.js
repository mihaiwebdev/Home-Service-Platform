const mongoose = require('mongoose');

const connectDB = async() => {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Mongo DB connected at ${conn.connection.host}`.cyan.underline)
}

module.exports = connectDB;