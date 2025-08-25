const Affiliate = require('../model/affiliate');

const affiliateController = {
  // Get all affiliates
  getAllAffiliates: async (req, res) => {
    try {
      const affiliates = await Affiliate.getAll();
      return res.status(200).json({
        status: 'success',
        data: affiliates
      });
    } catch (error) {
      console.error('Error getting affiliates:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  },

  // Get affiliate by ID
  getAffiliateById: async (req, res) => {
    try {
      const { id } = req.params;
      const affiliate = await Affiliate.getById(id);
      
      if (!affiliate) {
        return res.status(404).json({
          status: 'error',
          message: 'Affiliate not found'
        });
      }

      return res.status(200).json({
        status: 'success',
        data: affiliate
      });
    } catch (error) {
      console.error('Error getting affiliate:', error);
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }
};

module.exports = affiliateController;