// backend/routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  balance: Number,
  inventory: Object
});

const resourceSchema = new mongoose.Schema({
  name: String,
  basePrice: Number,
  currentPrice: Number,
  stock: Number
});

const User = mongoose.model('User', userSchema);
const Resource = mongoose.model('Resource', resourceSchema);

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/resources', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
