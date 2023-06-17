const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const hpp = require('hpp');
const errorHandler = require('./middleware/error');
const cron = require('node-cron');
const cleanupExpiredDate = require('./utils/cleanupExpiredDate')

require('colors');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV;

connectDB();

// Run cleanup job every day at midnight
cron.schedule('0 0 * * *', cleanupExpiredDate);

// Route files
const users = require('./routes/users');
const workers = require('./routes/workers');
const services = require('./routes/services');
const schedules = require('./routes/schedules');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

if (NODE_ENV === 'development')
    app.use(morgan('dev'));

app.use(fileUpload());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(cors());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
});

app.use(limiter);
app.use(hpp());

// app.use(express.static(path.join(__dirname, 'public')));

// Mount Routers
app.use('/api/v1/users', users);
app.use('/api/v1/workers', workers);
app.use('/api/v1/services', services);
app.use('/api/v1/schedules', schedules);

app.use(errorHandler);

const server = app.listen(PORT, console.log(`Server running in ${NODE_ENV} mode on ${PORT}`.yellow));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    server.close(() => process.exit(1));
});