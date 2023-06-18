const Schedule = require('../models/Schedule');
const Worker = require('../models/Worker');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Add schedule as a worker
// @route   POST /api/v1/schedules
// @access  Private
exports.addSchedule = asyncHandler(async (req, res, next) => {
    const dates = [];

    req.body.map(date => dates.push({
        date,
        worker: req.user._id
    }));
    
    const worker = await Worker.findById(req.user._id);
    worker.schedule = [];
    await worker.save();

    await Schedule.deleteMany({worker: req.user._id});

    await Schedule.create(dates);

    res.status(201).json({success: true});
});

// @desc    Update schedule as a worker
// @route   PUT /api/v1/schedules/:scheduleId
// @access  Private
exports.updateSchedule = asyncHandler(async (req, res, next) => {

    let schedule = await Schedule.findById(req.params.scheduleId);

    if (!schedule) {
        return next(
            new ErrorResponse('Resource not found', 404)
        );
    };

    if (schedule.worker.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next (
            new ErrorResponse('Not authorized', 401)
        );
    };

    schedule = await Schedule.findByIdAndUpdate(req.params.scheduleId, req.body, {
        runValidators: true,
        new: true        
    });

    res.status(200).json({success: true, data: schedule});
});

// @desc    Get all worker schedules
// @route   GET /api/v1/schedule
// @access  Private
exports.getSchedules = asyncHandler(async (req, res, next) => {

    const schedules = await Schedule.find({worker: req.user._id});

    if (!schedules) {
        return next (
            new ErrorResponse('Resource not found', 404)
        );
    };

    res.status(200).json({success: true, data: schedules});
});

// @desc    Get worker single schedule
// @route   GET /api/v1/schedule/:scheduleId
// @access  Private
exports.getSchedule = asyncHandler(async (req, res, next) => {
    const schedule = await Schedule.findById(req.params.scheduleId);

    if (!schedule) {
        return next (
            new ErrorResponse('Resource not found', 404)
        );
    };

    if (schedule.worker.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(
            new ErrorResponse('Not authorized', 404)
        );
    };

    res.status(200).json({success:true, data: schedule});
});

// @desc    Delete worker schedule
// @route   DELETE /api/v1/schedule/:scheduleId
// @access  Private
exports.deleteSchedule = asyncHandler(async (req, res, next) => {
    const schedule = await Schedule.findById(req.params.scheduleId);

    if (!schedule) {
        return next (
            new ErrorResponse('Resource not found', 404)
        );
    };

    if (schedule.worker.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next(
            new ErrorResponse('Not authorized', 404)
        );
    };

    await schedule.deleteOne();

    res.status(200).json({success:true, data: { }});
});
