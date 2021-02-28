const express = require('express');
const router = express.Router();
const { getTransactions, getBlog, postTransaction, deleteTransaction } = require('../controllers/transactionController');

router.route('/').get(getTransactions).post(postTransaction);

router.route('/blog/:id').get(getBlog);

router.route('/:id').delete(deleteTransaction);

module.exports = router;