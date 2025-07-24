const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: String,
  username: String,
  balance: { type: Number, default: 100 },
  inventory: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    totalSpent: Number,
  }],
  transactionHistory: [{
    type: String,
    product: String,
    quantity: Number,
    price: Number,
    total: Number,
    date: Date,
  }],
});

module.exports = mongoose.model('User', userSchema);