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

// @desc    Login User
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
        return next(
            new ErrorResponse('Please provide an email and password', 400)
        )

    const user = await User.findOne({ email }).select('+password');
    
    if (!user)
        return next(
            new ErrorResponse('Invalid credentials', 400)
        );

    const matchedPw = await user.matchPassword(password);

    if (!matchedPw)
        return next(
            new ErrorResponse('Invalid credentials', 400)
        );

    sendTokenResponse(user, 200, res);
});

// @desc    Logout
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({ success: true, data: {}});
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({ success: true, data: user});
});

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        email,
        name
    }
})

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true        
    };

    if (process.env.NODE_ENV === 'production')
        options.secure = true;

    res.status(statusCode).cookie('token', token, options).send({
        success: true, token
    })
};