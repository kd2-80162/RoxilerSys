const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// GET api/pie-chart/:month
router.get('/:month', async (req, res) => {
  try {
    const month = req.params.month;

    // Find all transactions for the given month
    const transactions = await Transaction.find({
      dateOfSale: {
        $gte: new Date(`${new Date().getFullYear()}-${month}-01`),
        $lt: new Date(`${new Date().getFullYear()}-${month}-01`).setMonth(new Date(`${new Date().getFullYear()}-${month}-01`).getMonth() + 1)
      }
    });

    // Group transactions by category
    const categories = {};
    transactions.forEach(transaction => {
      if (!categories[transaction.category]) {
        categories[transaction.category] = 0;
      }
      categories[transaction.category]++;
    });

    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
