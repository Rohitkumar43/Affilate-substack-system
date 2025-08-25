const express = require('express');
const helmet = require('helmet');
const initializeDatabase = require('../backend/database/init');
require('dotenv').config();


// Import routes
const clickRoutes = require('./routes/clickRoutes');
const postbackRoutes = require('./routes/postbackRoutes');
const affiliateRoutes = require('./routes/affiliateRoutes');

// Initialize express app
const app = express();

// Database connection
initializeDatabase()

// Middleware
app.use(helmet()); // Security headers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
app.use('/api', clickRoutes);
app.use('/api', postbackRoutes);
app.use('/api', affiliateRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Affiliate Postback System API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});