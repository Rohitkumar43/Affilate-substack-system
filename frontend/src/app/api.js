import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = {
  // Affiliate methods
  getAffiliates: async () => {
     console.log('Calling:', `${API_URL}/affiliates`); // Debug log
    const response = await axios.get(`${API_URL}/affiliates`);
    console.log('Response:', response.data); // Debug log
    return response.data;
    
  },

  getAffiliateById: async (id) => {
    const response = await axios.get(`${API_URL}/affiliates/${id}`);
    return response.data;
  },

  // Click methods
  getClicksByAffiliateId: async (affiliateId) => {
    const response = await axios.get(`${API_URL}/affiliate/${affiliateId}/clicks`);
    return response.data;
  },
  // Track a click (for testing)
  trackClick: async ({ affiliateId, campaignId, clickId }) => {
    const response = await axios.get(
      `${API_URL}/click?affiliate_id=${encodeURIComponent(affiliateId)}&campaign_id=${encodeURIComponent(campaignId)}&click_id=${encodeURIComponent(clickId)}`
    );
    return response.data;
  },

  // Conversion methods
  getConversionsByAffiliateId: async (affiliateId) => {
    const response = await axios.get(`${API_URL}/affiliate/${affiliateId}/conversions`);
    return response.data;
  },

  // Generate postback URL for an affiliate
  getPostbackUrl: (affiliateId) => {
    return `${API_URL}/postback?affiliate_id=${affiliateId}&click_id={click_id}&amount={amount}&currency={currency}`;
  }
};

export default api;