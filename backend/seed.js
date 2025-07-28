// seed.js
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    await User.create({
      _id: 'USER123',
      username: 'testuser',
      balance: 200,
      inventory: [],
      transactionHistory: [],
    });
    console.log('✅ User seeded');

    const products = [
      { name: 'Gold Ore', description: 'Raw gold material.', price: 10, quantity: 100 },
      { name: 'Wood', description: 'Timber for building or burning.', price: 5, quantity: 150 },
      { name: 'Grain', description: 'Used for food and trade.', price: 3, quantity: 200 },
      { name: 'Stone', description: 'Used for construction and tools.', price: 4.5, quantity: 120 },
      { name: 'Coal', description: 'Fuel source for smelting and power.', price: 6.8, quantity: 80 },
      { name: 'Iron Ore', description: 'Essential for forging metal tools.', price: 7.3, quantity: 110 },
      { name: 'Clay', description: 'Used for pottery and construction.', price: 2.7, quantity: 90 },
      { name: 'Salt', description: 'Preserves food and enhances flavor.', price: 1.5, quantity: 130 },
      { name: 'Fish', description: 'Fresh food source.', price: 3.9, quantity: 70 },
      { name: 'Leather', description: 'Used for crafting and armor.', price: 8.6, quantity: 60 },
      { name: 'Wine', description: 'Luxury trade item.', price: 12, quantity: 40 },
      { name: 'Honey', description: 'Sweet and long-lasting food.', price: 4.2, quantity: 100 },
      { name: 'Herbs', description: 'Used in medicine and cooking.', price: 2.5, quantity: 140 },
    ];

    const productsWithImages = products.map(p => ({
      ...p,
      maxQuantity: p.quantity,  // ✅ add this
      image: `${p.name.toLowerCase().replace(/\s+/g, '')}.jpg`, // ✅ keep images working
    }));

    await Product.insertMany(productsWithImages);
    console.log('✅ Products seeded with maxQuantity and images');

    process.exit();
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}).catch(err => {
  console.error('❌ MongoDB connection failed:', err);
  process.exit(1);
});
