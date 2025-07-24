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
    type: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  }],
});

module.exports = mongoose.model('User', userSchema);
