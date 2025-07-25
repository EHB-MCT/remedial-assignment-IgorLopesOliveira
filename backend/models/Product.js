const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
  maxQuantity: Number,  // new field to store initial/max stock
});
module.exports = mongoose.model('Product', ProductSchema);
