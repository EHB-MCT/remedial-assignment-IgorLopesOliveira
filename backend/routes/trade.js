const express = require('express');
const router = express.Router();
const { trade } = require('../services/tradeService');

router.post('/', async (req, res) => {
  const { userId, resourceName, quantity, action } = req.body;

  try {
    const result = await trade({ userId, resourceName, quantity, action });
    res.json({ message: 'Trade successful', result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
