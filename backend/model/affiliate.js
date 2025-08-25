const db = require('../database/db');

class Affiliate {
  static async getAll() {
    const result = await db.query('SELECT * FROM affiliates ORDER BY id');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM affiliates WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(name) {
    const result = await db.query(
      'INSERT INTO affiliates (name) VALUES ($1) RETURNING *',
      [name]
    );
    return result.rows[0];
  }
}

module.exports = Affiliate;