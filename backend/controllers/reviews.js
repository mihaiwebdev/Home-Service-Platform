const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const Review = require("../models/Review");
const Worker = require("../models/Worker");
const Contract = require("../models/Contract");

// @desc    Create worker review
// @route   POST /api/v1/reviews
// @access  Private
exports.createReview = asyncHandler(async (req, res, next) => {
  const contract = await Contract.findById(req.body.contractId);

  const worker = await Worker.findById(contract.worker);

  if (!worker) {
    return next(new ErrorResponse("Worker not found", 404));
  }

  const review = await Review.create({
    text: req.body.text,
    rating: req.body.rating,
    client: contract.client,
    worker: contract.worker,
  });

  contract.hasReview = true;
  await contract.save();

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

  const reviews = await Review.find({ worker: worker })
    .sort("-createdAt")
    .populate({
      path: "client",
      select: "name",
    });

  res.status(201).json({ success: true, data: reviews });
});
