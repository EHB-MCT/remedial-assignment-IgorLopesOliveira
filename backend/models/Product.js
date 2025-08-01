const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  maxQuantity: Number,
  image: String // <-- new field
});

module.exports = mongoose.model('Product', ProductSchema);
