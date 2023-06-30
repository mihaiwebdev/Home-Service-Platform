const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const Review = require("../models/Review");
const Worker = require("../models/Worker");

// @desc    Create worker review
// @route   POST /api/v1/reviews
// @access  Private
exports.createReview = asyncHandler(async (req, res, next) => {
  const worker = await Worker.findById(req.body.worker);

  if (!worker) {
    return next(new ErrorResponse("Worker not found", 404));
  }

  const review = await Review.create(req.body);

  res.status(201).json({ success: true, data: review });
});
