const db = require('../database/db');

class Conversion {
  static async create(clickId, amount, currency) {
    const result = await db.query(
      'INSERT INTO conversions (click_id, amount, currency) VALUES ($1, $2, $3) RETURNING *',
      [clickId, amount, currency]
    );
    return result.rows[0];
  }

  static async getByClickId(clickId) {
    const result = await db.query(
      'SELECT * FROM conversions WHERE click_id = $1',
      [clickId]
    );
    return result.rows;
  }

  static async getByAffiliateId(affiliateId) {
    const result = await db.query(
      `SELECT conv.*, c.affiliate_id, c.campaign_id, camp.name as campaign_name 
       FROM conversions conv 
       JOIN clicks c ON conv.click_id = c.click_id 
       JOIN campaigns camp ON c.campaign_id = camp.id 
       WHERE c.affiliate_id = $1 
       ORDER BY conv.timestamp DESC`,
      [affiliateId]
    );
    return result.rows;
  }
}

module.exports = Conversion;