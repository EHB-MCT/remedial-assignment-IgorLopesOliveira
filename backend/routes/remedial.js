const express = require('express');
const router = express.Router();
const Remedial = require('../models/Remedial');

router.get('/', async (req, res) => {
  try {
    const data = await Remedial.find();
    res.json(data);
  } catch (err) {
    console.error('❌ Error fetching remedials:', err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
