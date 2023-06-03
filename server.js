const express = require('express');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const hpp = require('hpp');
const errorHandler = require('./middleware/error');

require('colors');
require('dotenv').config({path: './config/config.env'});
const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV;

connectDB();

// Route files
const auth = require('./routes/auth');
const clients = require('./routes/clients');
const workers = require('./routes/workers');
const services = require('./routes/services');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

if (NODE_ENV === 'development')
    app.use(morgan('dev'));

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

// Mount Routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/clients', clients);
app.use('/api/v1/workers', workers);
app.use('/api/v1/services', services);

app.use(errorHandler);

const server = app.listen(PORT, console.log(`Server running in ${NODE_ENV} mode on ${PORT}`.yellow));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    server.close(() => process.exit(1));
});