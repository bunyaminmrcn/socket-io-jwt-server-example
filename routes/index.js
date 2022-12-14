const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const supportRoutes = require('./support');

router.use('/auth', authRoutes);
router.use('/support', supportRoutes);

module.exports = router;