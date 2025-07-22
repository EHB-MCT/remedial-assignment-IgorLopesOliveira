// seed.js
const mongoose = require('mongoose');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: String,
  balance: Number,
  inventory: Object
});

const resourceSchema = new mongoose.Schema({
  name: String,
  basePrice: Number,
  currentPrice: Number,
  stock: Number
});

const User = mongoose.model('User', userSchema);
const Resource = mongoose.model('Resource', resourceSchema);

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Mongoose connected');

    await User.deleteMany({});
    await Resource.deleteMany({});

    const users = [
      { name: "Alice", balance: 1000, inventory: { wheat: 10, gold: 2, tech: 1 } },
      { name: "Bob", balance: 1200, inventory: { wheat: 5, gold: 3, tech: 0 } }
    ];

    const resources = [
      { name: "wheat", basePrice: 10, currentPrice: 10, stock: 500 },
      { name: "gold", basePrice: 100, currentPrice: 100, stock: 200 },
      { name: "tech", basePrice: 50, currentPrice: 50, stock: 300 }
    ];

    await User.insertMany(users);
    await Resource.insertMany(resources);

    console.log('🌱 Seed data inserted successfully');
  } catch (err) {
    console.error('❌ Seed error:', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
