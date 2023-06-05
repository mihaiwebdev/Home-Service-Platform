const express = require('express');
const Service = require('../models/Service');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get services
// @route   GET /api/v1/services
// @access  Public
exports.getServices = asyncHandler(async (req, res, next) => {
    const services = await Service.find();

    res.status(201).json({ success: true, data: services});
});

// @desc    Create service
// @route   POST /api/v1/services
// @access  Private - Admin
exports.createService = asyncHandler(async (req, res, next) => {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service});
});

// @desc    Update service
// @route   PUT /api/v1/services/:serviceId
// @access  Private - Admin
exports.updateService = asyncHandler(async (req, res, next) => {
    const service = await Service.findByIdAndUpdate(req.params.serviceId, req.body, {
        runValidators: true,
        new: true
    });

    if(!service) {
        return next(
            new ErrorResponse('Service not found', 404)
        );
    };

    res.status(201).json({ success: true, data: service});
});

// @desc    Get Single Service
// @route   GET /api/v1/services/:serviceId
// @access  Public
exports.getService = asyncHandler(async (req, res, next) => {
    const service = await Service.findById(req.params.serviceId);

    if(!service) {
        return next(
            new ErrorResponse('Service not found', 404)
        );
    };

    res.status(201).json({ success: true, data: service});
});

// @desc    Delete Service
// @route   Delete /api/v1/services/:serviceId
// @access  Private - Admin
exports.deleteService = asyncHandler(async (req, res, next) => {
    const service = await Service.findById(req.params.serviceId);

    if(!service) {
        return next(
            new ErrorResponse('Service not found', 404)
        );
    };

    await service.deleteOne();

    res.status(201).json({ success: true, data: {}});
});