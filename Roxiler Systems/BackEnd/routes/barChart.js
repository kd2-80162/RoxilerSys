const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');

// GET api/bar-chart/:month
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

    // Group transactions by price range
    const priceRanges = {
      '0-100': 0,
      '101-200': 0,
      '201-300': 0,
      '301-400': 0,
      '401-500': 0,
      '501-600': 0,
      '601-700': 0,
      '701-800': 0,
      '801-900': 0,
      '901-above': 0
    };
    transactions.forEach(transaction => {
      if (transaction.price <= 100) {
        priceRanges['0-100']++;
      } else if (transaction.price <= 200) {
        priceRanges['101-200']++;
      } else if (transaction.price <= 300) {
        priceRanges['201-300']++;
      } else if (transaction.price <= 400) {
        priceRanges['301-400']++;
      } else if (transaction.price <= 500) {
        priceRanges['401-500']++;
      } else if (transaction.price <= 600) {
        priceRanges['501-600']++;
      } else if (transaction.price <= 700) {
        priceRanges['601-700']++;
      } else if (transaction.price <= 800) {
        priceRanges['701-800']++;
      } else if (transaction.price <= 900) {
        priceRanges['801-900']++;
      } else {
        priceRanges['901-above']++;
      }
    });

    res.json(priceRanges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
