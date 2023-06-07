const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env'});
require('colors');

const User = require('./models/User');
const Worker = require('./models/Worker');
const Schedule = require('./models/Schedule');

mongoose.connect(process.env.MONGO_URI);

const users = JSON.parse(fs.readFileSync(path.join(`${__dirname}/_data/users.json`), 'utf-8'));
const workers = JSON.parse(fs.readFileSync(path.join(`${__dirname}/_data/workers.json`), 'utf-8'));
const schedules = JSON.parse(fs.readFileSync(path.join(`${__dirname}/_data/schedules.json`), 'utf-8'));

const importData = async () => {
    try {
        await User.create(users);
        await Worker.create(workers);
        await Schedule.create(schedules);

        console.log('Data imported...'.green.inverse);
        process.exit();

    } catch (error) {
        console.log(error);
        process.exit();
    }
};

const deleteData = async () => {
    try {
        await User.deleteMany();
        await Worker.deleteMany();
        await Schedule.deleteMany();

        console.log(`Data destroied`.red.inverse);
        process.exit();

    } catch (error) {
        console.log(error);
        process.exit();
    }
};

if (process.argv[2] === '-i') {
    importData();
};

if (process.argv[2] === '-d') {
    deleteData();
};
