const mongoose = require('mongoose');

const RemedialSchema = new mongoose.Schema({
  name: String,
  title: String,
  genre: String,
  image: String
});

module.exports = mongoose.model('Remedial', RemedialSchema);
