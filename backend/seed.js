// backend/seed.js
require('dotenv').config();
const connectDB = require('./config/connectDB');
const Product = require('./models/Product');

const seedProducts = async () => {
  await connectDB();

  const sampleProducts = [
    {
      name: 'Gold Ore',
      price: 10,
      description: 'Raw iron material.',
      quantity: 100
    },
    {
      name: 'Wood',
      price: 5,
      description: 'Timber for building or burning.',
      quantity: 150
    },
    {
      name: 'Grain',
      price: 3,
      description: 'Used for food and trade.',
      quantity: 200
    }
  ];

  try {
    await Product.deleteMany(); // Clean slate
    await Product.insertMany(sampleProducts);
    console.log('🌱 Seed complete!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedProducts();
