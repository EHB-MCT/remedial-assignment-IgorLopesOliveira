const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user wallet and transaction history
router.get('/:userId/wallet', async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ balance: user.balance, transactionHistory: user.transactionHistory });
});

// Get user inventory
router.get('/:userId/inventory', async (req, res) => {
  const user = await User.findById(req.params.userId).populate('inventory.product');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user.inventory);
});

module.exports = router;