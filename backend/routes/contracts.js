const express = require('express');
const router = express.Router();

const { getContract, getContracts, createContract,
    updateContract, deleteContract } = require('../controllers/contracts');
const { protect } = require('../middleware/auth');

router.route('/')
    .get(protect, getContracts)
    .post(protect, createContract)

router.route('/:contractId')
    .get(protect, getContract)
    .put(protect, updateContract)
    .delete(protect, deleteContract)

module.exports = router