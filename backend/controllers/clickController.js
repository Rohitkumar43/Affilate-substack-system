const Click = require('../model/click');

const clickController = {
  // Handle click tracking
  trackClick: async (req, res) => {
    try {
      const { affiliate_id, campaign_id, click_id } = req.query;

      // Validate required parameters
      if (!affiliate_id || !campaign_id || !click_id) {
        return res.status(400).json({
          status: 'error',
          message: 'Missing required parameters: affiliate_id, campaign_id, and click_id are required'
        });
      }

      // Store the click in the database
      const click = await Click.create(affiliate_id, campaign_id, click_id);

      // Return success response
      return res.status(200).json({
        status: 'success',
        message: 'Click tracked successfully',
        data: { click_id }
      });
    } catch (error) {
      console.error('Error tracking click:', error);

      // Handle duplicate click_id
      if (error.code === '23505') { // PostgreSQL unique violation code
        return res.status(409).json({
          status: 'error',
          message: 'Click with this ID already exists for this affiliate and campaign'
        });
      }

      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  },

  // Get clicks for an affiliate
  getClicksByAffiliateId: async (req, res) => {
    try {
      const { affiliate_id } = req.params;

      if (!affiliate_id) {
        return res.status(400).json({
          status: 'error',
          message: 'Affiliate ID is required'
        });
      }

      const clicks = await Click.getByAffiliateId(affiliate_id);

      return res.status(200).json({
        status: 'success',
        data: clicks
      });
    } catch (error) {
      console.error('Error getting clicks:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }
};

module.exports = clickController;