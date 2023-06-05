const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'development'){
        console.log(err.stack.red);
    };

    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = new ErrorResponse(message, 404);
    };

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(item => item.message);
        error = new ErrorResponse(message, 400);
    };
    
    if (err.code === 11000) {
        const message = `${Object.keys(err.keyValue)} already exists`
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false, error: error.message || 'Server error'
    })

};

module.exports = errorHandler;