const mongoose = require('mongoose');
require('dotenv').config();

async function connectToMongoose() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Mongoose connected!');
  } catch (err) {
    console.error('❌ Mongoose connection error:', err);
    throw err;
  }
}

module.exports = connectToMongoose;
