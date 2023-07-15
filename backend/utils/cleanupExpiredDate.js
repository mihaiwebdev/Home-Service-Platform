const Schedule = require("../models/Schedule");

const cleanupExpiredDate = async () => {
  const today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const query = { date: { $lt: tomorrow } };

  await Schedule.deleteMany(query);
};

module.exports = cleanupExpiredDate;
