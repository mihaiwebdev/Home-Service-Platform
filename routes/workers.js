const express = require('express');
const router = express.Router();
const { getWorkers, getWorker, createWorker,
    updateWorker, deleteWorker } = require('../controllers/workers');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(getWorkers)
    .post(protect, authorize('worker', 'admin'), createWorker);

router.route('/:workerId')
    .get(getWorker)
    .put(protect, authorize('worker', 'admin'), updateWorker)
    .delete(protect, authorize('worker', 'admin'), deleteWorker);

module.exports = router;