const Worker = require('../models/Worker');
const geocoder = require('../utils/geocoder');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('express-async-handler');
const pagination = require('../utils/pagination');

// @desc    Get workers
// @route   GET /api/v1/workers
// @access  Public
exports.getWorkers = asyncHandler(async(req, res, next) => {    
    const workers = await Worker.find().populate({
        path: 'user',
        select: 'name'
    });

    res.status(200).json({success: true, count:workers.length, data: workers});
});

// @desc    Get available workers for the client request
// @route   GET /api/v1/workers/radius
// @access  Public
exports.getAvailableWorkers = asyncHandler(async(req, res, next) => {   
    const reqQuery = {...req.query};
    const reqDate  = req.query.date;
    const reqHour = req.query.hour;
    console.log(reqHour)
    // Remove fields that are not queryable
    const removeFields = ['select', 'sort', 'page', 'date', 'hour', 'address'];
    removeFields.map(field => delete reqQuery[field]);

    // Set location query
    const loc = await geocoder.geocode(req.query.address);

    const lat = loc[0].latitude;
    const long = loc[0].longitude;
    const radius = 20 / 6378;
    reqQuery.location = { $geoWithin: { $centerSphere: [ [long, lat], radius ]}}

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in|elemMatch)\b/g, match => `$${match}`);

    // Get workers matching filters
    const filteredWorkers = await Worker.find(JSON.parse(queryStr)).populate({
        path: 'user',
        select: 'name'
    }).populate('schedule');
    
    if (!filteredWorkers) {
        return next(
            new ErrorResponse('No workers found', 404)
        );
    };
    
    let availableWorkers = [];

    for (let i = 0; i < filteredWorkers.length; i++) {
        
        for (let j = 0; j < filteredWorkers[i].schedule.length; j++) {
            
            if (filteredWorkers[i].schedule[j].date.toDateString() === reqDate
                && filteredWorkers[i].schedule[j].availability.get(reqHour) ) 
            {
                availableWorkers.push(filteredWorkers[i])                                        
            };
        };
    };

    const result = pagination(availableWorkers, req.query.page);

    res.status(200).json(result);
});

// @desc    Get single worker
// @route   GET /api/v1/workers/:workerId
// @access  Public
exports.getWorker = asyncHandler(async(req, res, next) => {
    const worker = await Worker.findById(req.params.workerId).populate({
        path: 'services',
        select: 'name'
    }).populate({
        path: 'user',
        select: 'name'
    });
    
    if (!worker) {
        return next(
            new ErrorResponse('Profile not found', 404)
        );
    };

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