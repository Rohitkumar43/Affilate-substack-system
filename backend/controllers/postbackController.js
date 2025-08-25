const Click = require('../model/click');
const Conversion = require('../model/conversion');

const postbackController = {
  // Handle postback (conversion tracking)
  trackConversion: async (req, res) => {
    try {
      const { affiliate_id, click_id, amount, currency } = req.query;

      // Validate required parameters
      if (!affiliate_id || !click_id || !amount || !currency) {
        return res.status(400).json({
          status: 'error',
          message: 'Missing required parameters: affiliate_id, click_id, amount, and currency are required'
        });
      }

      // Validate that the click exists for this affiliate
      const click = await Click.getByClickId(click_id, affiliate_id);
      if (!click) {
        return res.status(404).json({
          status: 'error',
          message: 'Click not found for the given affiliate and click ID'
        });
      }

      // Store the conversion
      const conversion = await Conversion.create(click_id, amount, currency);

      // Return success response
      return res.status(200).json({
        status: 'success',
        message: 'Conversion tracked successfully',
        data: { conversion_id: conversion.id }
      });
    } catch (error) {
      console.error('Error tracking conversion:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  },

  // Get conversions for an affiliate
  getConversionsByAffiliateId: async (req, res) => {
    try {
      const { affiliate_id } = req.params;

      if (!affiliate_id) {
        return res.status(400).json({
          status: 'error',
          message: 'Affiliate ID is required'
        });
      }

      const conversions = await Conversion.getByAffiliateId(affiliate_id);

      return res.status(200).json({
        status: 'success',
        data: conversions
      });
    } catch (error) {
      console.error('Error getting conversions:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }
};

module.exports = postbackController;