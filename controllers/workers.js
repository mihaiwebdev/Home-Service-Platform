const Worker = require('../models/Worker');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('express-async-handler');

// @desc    Get workers
// @route   GET /api/v1/workers
// @access  Public
exports.getWorkers = asyncHandler(async(req, res, next) => {
    const workers = await Worker.find().populate({
        path: 'services',
        select: 'name'
    }).populate({
        path: 'user',
        select: 'name'
    });

    res.status(200).json({success: true, data: workers});
});

// @desc    Get single worker
// @route   GET /api/v1/workers/:workerId
// @access  Public
exports.getWorker = asyncHandler(async(req, res, next) => {
    const worker = await Worker.findById(req.params.workerId).populate({
        path: 'services',
        select: 'name'
    });

    res.status(200).json({success: true, data: worker});
});

// @desc    Create worker profile
// @route   POST /api/v1/workers
// @access  Private
exports.createWorker = asyncHandler(async(req, res, next) => {
    req.body.user = req.user._id;
    req.body._id = req.user._id;
    
    const worker = await Worker.create(req.body);

    res.status(201).json({success: true, data: worker});
});

// @desc    Update worker profile
// @route   PUT /api/v1/workers/:workerId
// @acess   Private
exports.updateWorker = asyncHandler(async(req, res, next) => {
    let worker = await Worker.findById(req.params.workerId);

    if (!worker) {
        return next(
            new ErrorResponse('Worker not found', 404)
        );
    };

    if (worker.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next (
            new ErrorResponse('Not authorized', 401)
        );
    };

    worker = await Worker.findByIdAndUpdate(req.params.workerId, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({success: true, data: worker});
});

// @desc    Delete worker profile
// @route   DELETE /api/v1/workers/:workerId
// @acess   Private
exports.deleteWorker = asyncHandler(async(req, res, next) => {
    const worker = await Worker.findById(req.params.workerId);

    if (!worker) {
        return next(
            new ErrorResponse('Worker not found', 404)
        );
    };

    if (worker.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next (
            new ErrorResponse('Not authorized', 401)
        );
    };

   await worker.deleteOne();

    res.status(200).json({success: true, data: { }});
});