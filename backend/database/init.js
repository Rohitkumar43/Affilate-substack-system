const fs = require('fs');
const path = require('path');
const { pool } = require('./db');

 async function initializeDatabase() {
  try {
    // Read the SQL file
    const sqlFilePath = path.join(__dirname, 'init.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    // Execute the SQL commands
    await pool.query(sql);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } 
}

module.exports = initializeDatabase;

//initializeDatabase();