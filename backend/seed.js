const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await User.deleteMany();
  await User.create({ _id: 'USER123', username: 'testuser', balance: 100, inventory: [], transactionHistory: [] });
  console.log('User seeded');
  process.exit();
});
