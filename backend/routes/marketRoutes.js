const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const PriceChange = require('../models/priceChange'); // New import

// Get user by ID (test route)
router.get('/testuser/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Buy product
router.post('/buy/:productId', async (req, res) => {
  try {
    const { userId, quantity } = req.body;
    const productId = req.params.productId;

    if (!userId || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'Missing or invalid parameters' });
    }

    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    if (!product || !user) {
      return res.status(404).json({ error: 'Product or user not found' });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ error: 'Not enough stock' });
    }

    const totalCost = product.price * quantity;
    if (user.balance < totalCost) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Update user's balance and inventory
    user.balance -= totalCost;

    let invItem = user.inventory.find(i => i.product.equals(product._id));
    if (invItem) {
      invItem.quantity += quantity;
      invItem.totalSpent += totalCost;
    } else {
      user.inventory.push({
        product: product._id,
        quantity,
        totalSpent: totalCost,
      });
    }

    user.transactionHistory.push({
      type: 'buy',
      product: product.name,
      quantity,
      price: product.price,
      total: totalCost,
      date: new Date(),
    });

    await user.save();

    // Update product quantity
    product.quantity -= quantity;

    // Calculate price change (supply-demand)
    const supplyRatio = product.quantity / product.maxQuantity;
    const demandFactor = 1 - supplyRatio;
    const priceIncreasePercent = demandFactor * 0.10; // max 10%
    const oldPrice = product.price;
    product.price = parseFloat((product.price * (1 + priceIncreasePercent)).toFixed(2));
    const percentChange = ((product.price - oldPrice) / oldPrice) * 100;

    await product.save();

    // Log transaction
    await Transaction.create({
      userId: user._id,
      productId: product._id,
      type: 'buy',
      quantity,
      priceAtTransaction: product.price,
      total: totalCost,
    });

    // Log price change
    await PriceChange.create({
      productId: product._id,
      productName: product.name,
      changeType: 'buy',
      percentage: parseFloat(percentChange.toFixed(2)),
      newPrice: product.price,
      timestamp: new Date(),
    });

    res.json({ success: true, newBalance: user.balance });
  } catch (err) {
    console.error('Buy route error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Sell product
router.post('/sell/:productId', async (req, res) => {
  try {
    const { userId, quantity } = req.body;
    const productId = req.params.productId;

    if (!userId || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'Missing or invalid parameters' });
    }

    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    if (!product || !user) {
      return res.status(404).json({ error: 'Product or user not found' });
    }

    let invItem = user.inventory.find(i => i.product.equals(product._id));
    if (!invItem || invItem.quantity < quantity) {
      return res.status(400).json({ error: 'Not enough in inventory' });
    }

    const totalGain = product.price * quantity;

    // Update user's balance and inventory
    user.balance += totalGain;
    invItem.quantity -= quantity;

    if (invItem.quantity === 0) {
      user.inventory = user.inventory.filter(i => !i.product.equals(product._id));
    }

    user.transactionHistory.push({
      type: 'sell',
      product: product.name,
      quantity,
      price: product.price,
      total: totalGain,
      date: new Date(),
    });

    await user.save();

    // Update product quantity
    product.quantity += quantity;

    // Calculate price change (supply-demand)
    const supplyRatio = product.quantity / product.maxQuantity;
    const abundanceFactor = supplyRatio;
    const priceDecreasePercent = abundanceFactor * 0.10; // max 10%
    const oldPrice = product.price;
    product.price = parseFloat((product.price * (1 - priceDecreasePercent)).toFixed(2));
    const percentChange = ((product.price - oldPrice) / oldPrice) * 100;

    await product.save();

    // Log transaction
    await Transaction.create({
      userId: user._id,
      productId: product._id,
      type: 'sell',
      quantity,
      priceAtTransaction: product.price,
      total: totalGain,
    });

    // Log price change
    await PriceChange.create({
      productId: product._id,
      productName: product.name,
      changeType: 'sell',
      percentage: parseFloat(percentChange.toFixed(2)),
      newPrice: product.price,
      timestamp: new Date(),
    });

    res.json({ success: true, newBalance: user.balance });
  } catch (err) {
    console.error('Sell route error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get price history for a product
router.get('/price-history/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const history = await PriceChange.find({ productId }).sort({ timestamp: 1 });

    if (!history || history.length === 0) {
      return res.json({ hasHistory: false, data: [] });
    }

    // Return array with timestamp and price
    const formatted = history.map(h => ({
      timestamp: h.timestamp,
      price: h.newPrice,
    }));

    res.json({ hasHistory: true, data: formatted });
  } catch (err) {
    console.error('Price history error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
