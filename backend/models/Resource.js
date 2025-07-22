const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  name: String,
  basePrice: Number,
  currentPrice: Number,
  stock: Number,
});

module.exports = mongoose.model('Resource', ResourceSchema);
