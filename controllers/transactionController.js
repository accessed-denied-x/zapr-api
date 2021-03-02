const Transaction = require('../models/Transaction');

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
	try {
		const transactions = await Transaction.find();

		return res.status(200).json({
			success: true,
			count: transactions.length, //not sure if we'll need this but just in case
			data: transactions,
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Server Error',
		});
	}
};

// @desc	Get a blog by ID
// @route	GET /api/transactions
// @acess	Public
exports.getBlog = async (req, res, next) => {
	try {
		const transaction = await Transaction.findById(req.params.id);

		if (!transaction) {
			return res.status(404).json({
				success: false,
				error: 'No such ID found',
			});
		}

		return res.status(200).json({
			success: true,
			data: transaction,
		});
	} catch (err) {
		return res.status(404).json({
			success: false,
			error: 'Blog not found',
		});
	}
};

//Alternate way of doing the same thing as above
/* exports.getTransactions = async (req, res, next) => {
	Transaction.find((err, data) => {
		if(err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	})
} */

// @desc    Post all transaction (blog)
// @route   POST /api/transactions
// @access  Public
exports.postTransaction = async (req, res, next) => {
	try {
		const { title, description, body, user, userId, timestamp } = req.body;

		const transaction = await Transaction.create(req.body);

		return res.status(201).json({
			success: true,
			data: transaction,
		});
	} catch (err) {
		if (err.name === 'ValidationError') {
			const messages = Object.values(err.errors).map((val) => val.message);

			return res.status(400).json({
				success: false,
				error: messages,
			});
		} else {
			return res.status(500).json({
				success: false,
				error: 'Server error',
			});
		}
	}
};

// @desc    Delete a transaction
// @route   DELETE /api/transactions
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
	try {
		const transaction = await Transaction.findById(req.params.id);

		if (!transaction) {
			return res.status(404).json({
				success: false,
				error: 'No such ID found',
			});
		}

		await transaction.remove();

		return res.status(200).json({
			success: true,
			data: {},
		});
	} catch (err) {
		return res.status(500).json({
			success: false,
			error: 'Server Error',
		});
	}
};
