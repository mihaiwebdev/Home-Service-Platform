const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const Review = require("../models/Review");
const Worker = require("../models/Worker");
const Contract = require("../models/Contract");

// @desc    Create worker review
// @route   POST /api/v1/reviews
// @access  Private
exports.createReview = asyncHandler(async (req, res, next) => {
  const worker = await Worker.findById(req.body.worker);

  if (!worker) {
    return next(new ErrorResponse("Worker not found", 404));
  }

  const review = await Review.create(req.body);
  const contract = await Contract.findOneAndUpdate(
    { client: req.user._id },
    {
      hasReview: true,
    }
  );

  res.status(201).json({ success: true, data: review });
});

// @desc    Get all worker reviews
// @route   GET /api/v1/reviews/workerId
// @access  Private
exports.getReviews = asyncHandler(async (req, res, next) => {
  const worker = await Worker.findById(req.params.workerId);

  if (!worker) {
    return next(new ErrorResponse("Worker not found", 404));
  }

  const reviews = await Review.find({ worker: worker }).populate({
    path: "client",
    select: "name",
  });

  res.status(201).json({ success: true, data: reviews });
});
