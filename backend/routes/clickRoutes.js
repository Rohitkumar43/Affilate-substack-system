const express = require('express');
const router = express.Router();
const clickController = require('../controllers/clickController');

// Track click endpoint
router.get('/click', clickController.trackClick);

// Get clicks for an affiliate
router.get('/affiliate/:affiliate_id/clicks', clickController.getClicksByAffiliateId);

module.exports = router;