const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const User = require('../models/User');

// @desc    Register User
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    let user = await User.create(req.body);
    
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
    res.cookie('token', '', {
        expires: new Date(0),
        httpOnly: true
    });

    res.status(200).json({ success: true, data: {}});
});

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({ success: true, data: user});
});

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        email: req.body.email,
        name: req.body.name
    };

    let user = await User.findById(req.user._id);

    user = await User.findByIdAndUpdate(req.user._id, fieldsToUpdate, {
        new: true,
        runValidators: true
    });

    res.status(200).json({success: true, data: user});
});

// @desc    Update user password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id).select('+password');

    const matchedPw = await user.matchPassword(req.body.currentPassword);

    if (!matchedPw) {
        return next(
            new ErrorResponse('Invalid password', 400)
        );
    };

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async(req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if(!user) {
        return next(
            new ErrorResponse('User not found',404)
        );
    };

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false});

    const url = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`
    const message = `You are receiving this email because you (or someone else) has 
    requested the reset of a password. Please make a PUT request to: \n\n ${url}`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        });

        res.status(200).json({ success: true, data: 'Email sent'});

    } catch (error) {
        console.log(error);
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;

        await user.save({ validateBeforeSave: false });

        return next(
            new ErrorResponse('Email could not be sent', 500)
        );
    };

});

// @desc    Reset Password
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @access  Private
exports.resetPassword = asyncHandler(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(
            new ErrorResponse('Not valid token', 400)
        );
    };
  
    user.password = req.body.newPassword;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save({ validateBeforeSave: false });

    sendTokenResponse(user, 200, res);
})

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'strict'        
    };

    if (process.env.NODE_ENV === 'production')
        options.secure = true;

    res.status(statusCode).cookie('token', token, options).send({
        success: true,
    })
};