const express = require('express');
const cors = require('cors');

const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for all origins
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Register API Routes
app.use('/api/services', require('./routes/services'));
app.use('/api/trainers', require('./routes/trainers'));
app.use('/api/contact', require('./routes/contact'));

// Root route for deployment confirmation
app.get('/', (req, res) => {
  res.send('FitZone Gym API is running');
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Catch-all 404 handler for API routes not found
app.use('/api', (req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl} - API Route not found` });
});

// Catch-all 404 handler for routes not found
app.use((req, res, next) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.originalUrl} - Route not found` });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Global Error Handler caught an error:', err.stack || err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
