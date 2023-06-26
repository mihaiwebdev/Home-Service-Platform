const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
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
const contracts = require('./routes/contracts');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

if (NODE_ENV === 'development')
    app.use(morgan('dev'));

app.use(mongoSanitize());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'img-src': ["'self'", "home-services-s3.s3.eu-north-1.amazonaws.com"]
    }
}));
app.use(xss());
app.use(cors());


app.use(hpp());

// Mount Routers
app.use('/api/v1/users', users);
app.use('/api/v1/workers', workers);
app.use('/api/v1/services', services);
app.use('/api/v1/schedules', schedules);
app.use('/api/v1/contracts', contracts);

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist'), { dotfiles: 'allow' }));
    app.get('*', (req, res) => res.sendFile(__dirname, 'frontend' , 'dist', 'index.html'));

} else {
    app.get('/', (req, res) => res.send('Server is ready'));
};

app.use(errorHandler);

const server = app.listen(PORT, console.log(`Server running in ${NODE_ENV} mode on ${PORT}`.yellow));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    server.close(() => process.exit(1));
});