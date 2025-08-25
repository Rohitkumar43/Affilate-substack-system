// const { Pool } = require('pg');
// require('dotenv').config();

// // Create a mock database for development if real database is not available
// const useMockDb = process.env.USE_MOCK_DB === 'true' || !process.env.DB_PASSWORD;

// let pool;
// let mockDb = {
//   affiliates: [
//     { id: 1, name: 'Affiliate 1' },
//     { id: 2, name: 'Affiliate 2' },
//     { id: 3, name: 'Affiliate 3' }
//   ],
//   campaigns: [
//     { id: 1, name: 'Campaign 1' },
//     { id: 2, name: 'Campaign 2' },
//     { id: 3, name: 'Campaign 3' }
//   ],
//   clicks: [],
//   conversions: []
// };

// if (useMockDb) {
//   console.log('Using mock database for development');
// } else {
//   pool = new Pool({
//     user: process.env.DB_USER || 'postgres',
//     host: process.env.DB_HOST || 'localhost',
//     database: process.env.DB_NAME || 'affiliate_system',
//     password: process.env.DB_PASSWORD || '',
//     port: process.env.DB_PORT || 5432,
//   });

//   pool.on('error', (err) => {
//     console.error('Unexpected error on idle client', err);
//     console.log('Switching to mock database');
//     useMockDb = true;
//   });
// }

// module.exports = {
//   query: async (text, params) => {
//     if (useMockDb) {
//       // Simple mock implementation for basic queries
//       if (text.includes('SELECT * FROM affiliates ORDER BY id')) {
//         return { rows: mockDb.affiliates };
//       } else if (text.includes('SELECT * FROM affiliates WHERE id =')) {
//         const id = parseInt(params[0]);
//         const affiliate = mockDb.affiliates.find(a => a.id === id);
//         return { rows: affiliate ? [affiliate] : [] };
//       } else if (text.includes('SELECT * FROM campaigns')) {
//         return { rows: mockDb.campaigns };
//       } else if (text.includes('INSERT INTO clicks')) {
//         const newClick = {
//           id: mockDb.clicks.length + 1,
//           affiliate_id: params[0],
//           campaign_id: params[1],
//           click_id: params[2],
//           timestamp: new Date().toISOString()
//         };
//         mockDb.clicks.push(newClick);
//         return { rows: [newClick] };
//       } else if (text.includes('INSERT INTO conversions')) {
//         const newConversion = {
//           id: mockDb.conversions.length + 1,
//           click_id: params[0],
//           amount: params[1],
//           currency: params[2],
//           timestamp: new Date().toISOString()
//         };
//         mockDb.conversions.push(newConversion);
//         return { rows: [newConversion] };
//       } else if (text.includes('SELECT * FROM clicks WHERE click_id')) {
//         const click = mockDb.clicks.find(c => c.click_id === params[0] && c.affiliate_id === parseInt(params[1]));
//         return { rows: click ? [click] : [] };
//       } else if (text.includes('SELECT * FROM clicks WHERE affiliate_id')) {
//         const clicks = mockDb.clicks.filter(c => c.affiliate_id === parseInt(params[0]));
//         return { rows: clicks };
//       } else if (text.includes('SELECT * FROM conversions WHERE click_id')) {
//         const conversions = mockDb.conversions.filter(c => c.click_id === params[0]);
//         return { rows: conversions };
//       } else if (text.includes('SELECT conv.*, c.affiliate_id')) {
//         const affiliateId = parseInt(params[0]);
//         const clicks = mockDb.clicks.filter(c => c.affiliate_id === affiliateId);
//         const conversions = [];
        
//         for (const click of clicks) {
//           const clickConversions = mockDb.conversions.filter(c => c.click_id === click.click_id);
//           for (const conv of clickConversions) {
//             conversions.push({
//               ...conv,
//               affiliate_id: click.affiliate_id,
//               campaign_id: click.campaign_id,
//               campaign_name: mockDb.campaigns.find(c => c.id === click.campaign_id)?.name
//             });
//           }
//         }
        
//         return { rows: conversions };
//       }
      
//       return { rows: [] };
//     } else {
//       return pool.query(text, params);
//     }
//   },
//   pool: useMockDb ? null : pool
// };


const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'affiliate_system',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 5432,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: async (text, params) => {
    return pool.query(text, params);
  },
  pool
};