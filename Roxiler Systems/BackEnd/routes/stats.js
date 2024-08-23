const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// GET api/stats/:month
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

    // Calculate total sale amount
    const totalSaleAmount = transactions.reduce((sum, transaction) => sum + transaction.price, 0);

    // Calculate total number of sold items
    const totalSoldItems = transactions.filter(transaction => transaction.isSold).length;

    // Calculate total number of not sold items
    const totalNotSoldItems = transactions.filter(transaction => !transaction.isSold).length;

    res.json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
