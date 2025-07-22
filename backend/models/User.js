const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  balance: Number,
  inventory: {
    type: Map,
    of: Number,
    default: {}
  }
});

module.exports = mongoose.model('User', UserSchema);
