const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

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
    console.log('Buy request:', { userId, quantity, productId: req.params.productId });

    const product = await Product.findById(req.params.productId);
    console.log('Found product:', product);

    const user = await User.findById(userId);
    console.log('Found user:', user);

    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (!user) return res.status(404).json({ error: 'User not found' });


    const totalCost = product.price * quantity;
    if (user.balance < totalCost) return res.status(400).json({ error: 'Insufficient balance' });

    // Update user balance and inventory
    user.balance -= totalCost;

    let invItem = user.inventory.find(i => i.product.equals(product._id));
    if (invItem) {
      invItem.quantity += quantity;
      invItem.totalSpent += totalCost;
    } else {
      user.inventory.push({ product: product._id, quantity, totalSpent: totalCost });
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

    // Update product quantity and increase price by 1%
    product.quantity -= quantity;
    product.price = parseFloat((product.price * 1.01).toFixed(2));
    await product.save();

    // Log transaction in Transaction collection
    await Transaction.create({
      userId: user._id,
      productId: product._id,
      type: 'buy',
      quantity,
      priceAtTransaction: product.price,
      total: totalCost,
    });

    res.json({ success: true, newBalance: user.balance });
  } catch (err) {
    console.error('Buy route error:', err);
    res.status(500).json({ error: 'Server error' });
  }

  console.log('Product ID param:', req.params.productId);
console.log('Body:', req.body);

const product = await Product.findById(req.params.productId);
console.log('Found product:', product);

const user = await User.findById(req.body.userId);
console.log('Found user:', user);
  if (!product || !user) return res.status(404).json({ error: 'Product or user not found' });

  if (product.quantity < quantity) return res.status(400).json({ error: 'Not enough stock' });

  const totalCost = product.price * quantity;
  if (user.balance < totalCost) return res.status(400).json({ error: 'Insufficient balance' });

  // Update user balance and inventory
  user.balance -= totalCost;

  let invItem = user.inventory.find(i => i.product.equals(product._id));
  if (invItem) {
    invItem.quantity += quantity;
    invItem.totalSpent += totalCost;
  } else {
    user.inventory.push({ product: product._id, quantity, totalSpent: totalCost });
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

  // Update product quantity and increase price by 1%
  product.quantity -= quantity;
  product.price = parseFloat((product.price * 1.01).toFixed(2));
  await product.save();

  // Log transaction in Transaction collection
  await Transaction.create({
    userId: user._id,
    productId: product._id,
    type: 'buy',
    quantity,
    priceAtTransaction: product.price,
    total: totalCost,
  });

  res.json({ success: true, newBalance: user.balance });
});



// Sell product
router.post('/sell/:productId', async (req, res) => {
  const { userId, quantity } = req.body;
  const product = await Product.findById(req.params.productId);
  const user = await User.findById(userId);

  if (!product || !user) return res.status(404).json({ error: 'Product or user not found' });

  let invItem = user.inventory.find(i => i.product.equals(product._id));
  if (!invItem || invItem.quantity < quantity) return res.status(400).json({ error: 'Not enough in inventory' });

  const totalGain = product.price * quantity;

  // Update user
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

  // Update product
  product.quantity += quantity;
  product.price = parseFloat((product.price * 0.99).toFixed(2)); // price down 1%
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

  res.json({ success: true, newBalance: user.balance });
});

module.exports = router;