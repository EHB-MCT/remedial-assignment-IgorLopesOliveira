require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Allow ALL origins — good for local testing
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Parse JSON bodies before routes
app.use(express.json());

// Import routes
const tradeRoutes = require('./routes/trade');
const remedialRoutes = require('./routes/remedial'); // if you have this route too

// Use routes
app.use('/api/trade', tradeRoutes);
app.use('/api/remedial', remedialRoutes); // optional, remove if unused

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Simple test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
