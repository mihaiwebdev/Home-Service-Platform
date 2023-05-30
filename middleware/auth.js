const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization &&  req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];

    else if (req.cookies.token)
        token = req.cookies.token;

    if (!token)
        return next(
            new ErrorResponse('Not authorized to access this route', 401)
        );

        const decoded = jwt.decode(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);

        if (!req.user) {
            return next(
                new ErrorResponse('Not authorized to access this route', 401)
            );
        };
    
        next();
});

exports.authorize = (...roles) => (req, res, next) =>{
    if (!roles.includes(req.user.role)) {
        return next (
            new ErrorResponse('Not authorized', 401)
        );
    };

    next();
}