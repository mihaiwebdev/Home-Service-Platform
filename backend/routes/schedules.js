const express = require('express');
const router = express.Router();

const { protect, authorize } = require('../middleware/auth');
const { getSchedule, getSchedules, deleteSchedule ,
        updateSchedule, addSchedule } = require('../controllers/schedules');

router.route('/')
    .get(protect, authorize('worker', 'admin'), getSchedules)
    .post(protect, authorize('worker', 'admin'), addSchedule)

router.route('/:scheduleId')
    .get(protect, authorize('worker', 'admin'), getSchedule)
    .put(protect, authorize('worker', 'admin'), updateSchedule)
    .delete(protect, authorize('worker', 'admin'), deleteSchedule);

module.exports = router;