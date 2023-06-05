const express = require('express');
const router = express.Router();
const { register, login, logout, updatePassword, resetPassword,
        getMe, updateDetails, forgotPassword } = require('../controllers/auth');

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.get('/logout', logout);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.put('/resetpassword/:resettoken', resetPassword);


module.exports = router;