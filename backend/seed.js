const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  // Clear existing data
  await User.deleteMany();
  await Product.deleteMany();

  // Seed user
  await User.create({
    _id: 'USER123',
    username: 'testuser',
    balance: 100,
    inventory: [],
    transactionHistory: [],
  });

  // Seed products
  await Product.insertMany([
    {
      name: "Gold Ore",
      description: "Raw iron material.",
      price: 9.12,
      quantity: 100,
      maxQuantity: 100,
    },
    {
      name: "Wood",
      description: "Timber for building or burning.",
      price: 5,
      quantity: 150,
      maxQuantity: 150,
    },
    {
      name: "Grain",
      description: "Used for food and trade.",
      price: 3,
      quantity: 200,
      maxQuantity: 200,
    },
    {
      name: "Stone",
      description: "Strong building material.",
      price: 4.5,
      quantity: 180,
      maxQuantity: 180,
    },
    {
      name: "Iron Ingot",
      description: "Smelted iron ready for crafting.",
      price: 15,
      quantity: 75,
      maxQuantity: 75,
    },
    {
      name: "Coal",
      description: "Fuel for smelting and heating.",
      price: 7,
      quantity: 120,
      maxQuantity: 120,
    },
    {
      name: "Leather",
      description: "Material for clothing and armor.",
      price: 10,
      quantity: 90,
      maxQuantity: 90,
    },
    {
      name: "Cloth",
      description: "Fabric for making garments.",
      price: 6,
      quantity: 130,
      maxQuantity: 130,
    },
    {
      name: "Fish",
      description: "Fresh fish for food.",
      price: 8,
      quantity: 110,
      maxQuantity: 110,
    },
    {
      name: "Wheat",
      description: "Basic grain used for bread.",
      price: 2.5,
      quantity: 210,
      maxQuantity: 210,
    },
    {
      name: "Copper Ore",
      description: "Ore used to craft copper items.",
      price: 8.5,
      quantity: 85,
      maxQuantity: 85,
    },
    {
      name: "Silk",
      description: "Luxury fabric for fine clothes.",
      price: 20,
      quantity: 50,
      maxQuantity: 50,
    },
    {
      name: "Honey",
      description: "Sweetener and food ingredient.",
      price: 12,
      quantity: 60,
      maxQuantity: 60,
    }
  ]);

  console.log('Database seeded successfully!');
  process.exit();
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
