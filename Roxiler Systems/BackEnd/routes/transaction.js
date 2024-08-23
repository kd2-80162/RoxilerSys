const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// GET api/transactions/:month?page=1&perPage=10&search=
router.get('/:month', async (req, res) => {
  try {
    const month = req.params.month;
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const search = req.query.search || '';

    // Find all transactions for the given month
    const transactions = await Transaction.find({
      dateOfSale: {
        $gte: new Date(`${new Date().getFullYear()}-${month}-01`),
        $lt: new Date(`${new Date().getFullYear()}-${month}-01`).setMonth(new Date(`${new Date().getFullYear()}-${month}-01`).getMonth() + 1)
      },
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: { $regex: search, $options: 'i' } }
      ]
    })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
