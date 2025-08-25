const db = require('../database/db');

class Click {
  static async create(affiliateId, campaignId, clickId) {
    const result = await db.query(
      'INSERT INTO clicks (affiliate_id, campaign_id, click_id) VALUES ($1, $2, $3) RETURNING *',
      [affiliateId, campaignId, clickId]
    );
    return result.rows[0];
  }

  static async getByClickId(clickId, affiliateId) {
    const result = await db.query(
      'SELECT * FROM clicks WHERE click_id = $1 AND affiliate_id = $2',
      [clickId, affiliateId]
    );
    return result.rows[0];
  }

  static async getByAffiliateId(affiliateId) {
    const result = await db.query(
      `SELECT c.*, camp.name as campaign_name 
       FROM clicks c 
       JOIN campaigns camp ON c.campaign_id = camp.id 
       WHERE c.affiliate_id = $1 
       ORDER BY c.timestamp DESC`,
      [affiliateId]
    );
    return result.rows;
  }
}

module.exports = Click;