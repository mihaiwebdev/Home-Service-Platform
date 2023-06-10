const express = require('express');
const router = express.Router();
const { register, login, logout, updatePassword, resetPassword,
        getMe, updateDetails, forgotPassword, deleteMe } = require('../controllers/users');

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.delete('/deleteme', protect, deleteMe);


module.exports = router;