const Schedule = require('../models/Schedule');

const cleanupExpiredDate = async () => {
    const currentDate = new Date();

    const query = { date: { $lt: currentDate }};

    await Schedule.deleteMany(query);
};

module.exports = cleanupExpiredDate;