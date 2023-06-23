const path = require('path');
const Worker = require('../models/Worker');
const geocoder = require('../utils/geocoder');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('express-async-handler');
const pagination = require('../utils/pagination');
const { S3Client, PutObjectCommand } =  require('@aws-sdk/client-s3');

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


// @desc    Update worker profile
// @route   PUT /api/v1/workers
// @acess   Private
exports.updateWorker = asyncHandler(async(req, res, next) => {
    let worker = await Worker.findOne({user: req.user._id});

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

    worker = await Worker.findByIdAndUpdate(worker._id, req.body, {
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

// @desc    Upload worker photo
// @route   PUT /ap1/v1/workers/:workerId/photo
// @access  Private
exports.uploadWorkerPhoto = asyncHandler(async (req, res, next) => {
    let worker = await Worker.findById(req.params.workerId);

    if (!worker) {
        return next(
            new ErrorResponse('User not found', 404)
        );
    };

    if (worker._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return next( 
            new ErrorResponse('Not authorized', 401)
        )
    };
    
    if (!req.file) {
        return next (
            new ErrorResponse('Please upload an image', 400)
        );
    };

    if (!req.file.mimetype.startsWith('image')) {
        return next (
            new ErrorResponse('Please upload an image', 404)
        )
    };

    req.file.name = `photo_${req.params.workerId}${path.parse(req.file.originalname).ext}`;

    const s3Client = new S3Client({ 
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        },
        region: process.env.AWS_REGION 
    });

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: req.file.name,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    };
    
    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);
    
    if (!data) {
        return next (
            new ErrorResponse('Something went wrong', 500)
        );
    };

    worker = await Worker.findByIdAndUpdate(req.params.workerId, {
        photo: `https://home-services-s3.s3.eu-north-1.amazonaws.com/${req.file.name}`
    }, {
        new: true,
        runValidators: true
    })

    res.status(200).json({success: true, data: worker});
});