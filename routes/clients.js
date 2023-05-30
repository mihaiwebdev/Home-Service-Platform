const express = require('express');
const router = express.Router();
const { addHouse, updateHouse, getClientHouses,
        getClientHouse, deleteHouse } = require('../controllers/clients');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('client', 'admin'));

router.route('/houses')
    .get(getClientHouses)
    .post(addHouse);

router.route('/houses/:houseId')
    .get(getClientHouse)
    .put(updateHouse)
    .delete(deleteHouse);

module.exports = router;
