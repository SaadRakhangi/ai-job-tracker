const express = require('express');
const cors = require('cors');

const app = express();

try {
  const authRoutes = require('./routes/auth');
  const jobRoutes = require('./routes/jobRoutes');
  const aiRoutes = require('./routes/aiRoutes');
  
  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/jobs', jobRoutes);
  app.use('/api/ai', aiRoutes);
  app.use('/api/ai', require('./routes/aiRoutes'));


} catch (err) {
  console.error('❌ Error in app.js:', err.message);
}

module.exports = app;
