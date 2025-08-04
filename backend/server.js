const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

app.use('/images', express.static(path.join(__dirname, 'public/images')));


dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/market', require('./routes/marketRoutes'));


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to DB');
    app.listen(8080, () => {
      console.log('🚀 Server running on http://localhost:8080');
    });
  })
  .catch((err) => console.error(err));

// Catch-all 404 handler (for API routes)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
