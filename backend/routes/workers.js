const express = require('express');
const router = express.Router();

const { getWorkers, getAvailableWorkers, getWorker, createWorker,
    updateWorker, deleteWorker, uploadWorkerPhoto } = require('../controllers/workers');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(getWorkers)
    .post(protect, authorize('worker', 'admin'), createWorker);

router.get('/radius', getAvailableWorkers);

router.route('/:workerId')
    .get(getWorker)
    .put(protect, authorize('worker', 'admin'), updateWorker)
    .delete(protect, authorize('worker', 'admin'), deleteWorker)
    
router.put('/:workerId/upload-photo', protect, authorize('worker', 'admin'), uploadWorkerPhoto)
module.exports = router;