const mongoose = require('mongoose');

const PriceChangeSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productName: String,
  changeType: { type: String, enum: ['buy', 'sell'] },
  percentage: Number,
  newPrice: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PriceChange', PriceChangeSchema);
