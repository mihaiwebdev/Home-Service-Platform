const express = require('express');
const router = express.Router();
const { getService, getServices, updateService,
    deleteService, createService } = require('../controllers/services');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(getServices)
    .post(protect, authorize('admin'), createService)

router.route('/:serviceId')
    .get(getService)
    .put(protect, authorize('admin'), updateService)
    .delete(protect, authorize('admin'), deleteService);

module.exports = router;