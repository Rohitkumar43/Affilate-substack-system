const express = require('express');
const router = express.Router();
const affiliateController = require('../controllers/affiliateController');

// Get all affiliates
router.get('/affiliates', affiliateController.getAllAffiliates);

// Get affiliate by ID
router.get('/affiliates/:id', affiliateController.getAffiliateById);

module.exports = router;