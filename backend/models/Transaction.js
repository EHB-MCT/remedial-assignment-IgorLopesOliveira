const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User' }, // <-- Must be String
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  type: String,
  quantity: Number,
  priceAtTransaction: Number,
  total: Number,
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Transaction', TransactionSchema);