const express = require('express');
const router = express.Router();
const postbackController = require('../controllers/postbackController');

// Track conversion endpoint
router.get('/postback', postbackController.trackConversion);

// Get conversions for an affiliate
router.get('/affiliate/:affiliate_id/conversions', postbackController.getConversionsByAffiliateId);

module.exports = router;