const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const House = require('../models/House');
const ErrorResponse = require('../utils/errorResponse');


// @desc    Get client houses
// @route   GET /api/v1/clients/houses
// @access  Private
exports.getClientHouses = asyncHandler(async (req, res, next) => {
    const houses = await House.find({client: req.user._id});
    
    res.status(200).json({success: true, data: houses});
})

// @desc    Add a house to a client
// @route   POST /api/v1/clients/houses
// @access  Private
exports.addHouse = asyncHandler(async(req, res, next) => {
    req.body.client = req.user._id;

    const house = await House.create(req.body);
    
    res.status(201).json({ success: true, data: house});
});

// @desc    Get client house
// @route   GET /api/v1/clients/houses/:houseId
// @access  Private
exports.getClientHouse = asyncHandler(async (req, res, next) => {
    const house = await House.findById(req.params.houseId);

    if (!house) {
        return next(
            new ErrorResponse('House not found', 404)
        );
    };

    if (house.client.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(
            new ErrorResponse('Not authorized', 401)
        );
    };


    res.status(200).json({success: true, data: house});
});

// @desc    Update client house
// @route   PUT /api/v1/clients/houses/:houseId
// @route   Private
exports.updateHouse = asyncHandler(async(req, res, next) => {
    let house = await House.findById(req.params.houseId);

    if (!house) {
        return next(
            new ErrorResponse('House not found', 404)
        );
    };

    if (house.client.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(
            new ErrorResponse('Not authorized', 401)
        );
    };

    house = await House.findByIdAndUpdate(req.params.houseId, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: house});
});

// @desc    Delete client house
// @route   DELETE /api/v1/clients/houses/:houseId
// @route   Private
exports.deleteHouse = asyncHandler(async(req, res, next) => {
    const house = await House.findById(req.params.houseId);

    if (!house) {
        return next(
            new ErrorResponse('House not found', 404)
        );
    };

    if (house.client.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(
            new ErrorResponse('Not authorized', 401)
        );
    };

    await house.deleteOne();

    res.status(200).json({ success: true, data: { }});
});