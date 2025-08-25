const db = require('../database/db');

class Campaign {
  static async getAll() {
    const result = await db.query('SELECT * FROM campaigns ORDER BY id');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM campaigns WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(name) {
    const result = await db.query(
      'INSERT INTO campaigns (name) VALUES ($1) RETURNING *',
      [name]
    );
    return result.rows[0];
  }
}

module.exports = Campaign;