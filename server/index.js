const path = require('path');
const dotenv = require('dotenv');

// Load environment variables at the very top (absolute path to prevent issues if run from project root)
dotenv.config({ path: path.join(__dirname, '.env') });

// Global process-level error handlers
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
  process.exit(1);
});

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5001;

// Enable Cross-Origin Resource Sharing (CORS)
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

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Serve index.html for any request that doesn't start with /api
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

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

// Connect to MongoDB Database, and then start the server
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`ERROR: Port ${PORT} is already in use by another process.`);
      console.error(`Please free port ${PORT} or configure a different PORT in your server/.env file.`);
      process.exit(1);
    } else {
      console.error('Server error occurred during startup:', err);
      process.exit(1);
    }
  });
}).catch((error) => {
  console.error('Database connection failed, server not started:', error);
  process.exit(1);
});
