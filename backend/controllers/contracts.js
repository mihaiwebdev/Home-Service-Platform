const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const Contract = require("../models/Contract");
const pagination = require("../utils/pagination");

// @desc    Get contracts
// @route   GET /api/v1/contracts
// @access  Private
exports.getContracts = asyncHandler(async (req, res, next) => {
  let contracts;

  if (req.user.role === "client") {
    contracts = await Contract.find({ client: req.user._id }).sort(
      "-createdAt"
    );
  }

  if (req.user.role === "worker") {
    contracts = await Contract.find({ worker: req.user._id }).sort(
      "-createdAt"
    );
  }

  if (!contracts) {
    return next(new ErrorResponse("Not found", 404));
  }

  const result = pagination(contracts, req.query.page);

  res.status(200).json(result);
});

// @desc    Create contract
// @route   POST /api/v1/contracts/
// @access  Private
exports.createContract = asyncHandler(async (req, res, next) => {
  const contract = await Contract.create(req.body);

  res.status(200).json({ success: true, data: contract });
});

// @desc    Get contract
// @route   GET /api/v1/contracts/:contractId
// @access  Private
exports.getContract = asyncHandler(async (req, res, next) => {
  const contract = await Contract.findById(req.params.contractId);

  if (!contract) {
    return next(new ErrorResponse("Contract not found", 404));
  }

  res.status(200).json({ success: true, data: contract });
});

// @desc    Update contract
// @route   PUT /api/v1/contracts/:contractId
// @access  Private
exports.updateContract = asyncHandler(async (req, res, next) => {
  let contract = await Contract.findById(req.params.contractId);

  if (!contract) {
    return next(new ErrorResponse("Contract not found", 404));
  }

  contract = await Contract.findByIdAndUpdate(req.params.contractId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: contract });
});

// @desc    Delete contract
// @route   DELETE /api/v1/contracts/:contractId
// @access  Private
exports.deleteContract = asyncHandler(async (req, res, next) => {
  const contract = await Contract.findById(req.params.contractId);

  if (!contract) {
    return next(new ErrorResponse("Contract not found", 404));
  }

  await Contract.findByIdAndDelete(req.params.contractId);

  res.status(200).json({ success: true });
});
