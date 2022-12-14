const express = require('express');
const router = express.Router();
const supportRoutes = require('./support');
router.use('/support', supportRoutes);

module.exports = router;