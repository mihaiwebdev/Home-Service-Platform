const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    sendTokenResponse(user, 201, res);
});

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true        
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    };

    res.status(statusCode).cookie('token', token, options).send({
        success: true, token
    })
}