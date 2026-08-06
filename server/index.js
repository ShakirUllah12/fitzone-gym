const path = require('path');
const dotenv = require('dotenv');

// Load environment variables (absolute path to prevent issues)
dotenv.config({ path: path.join(__dirname, '.env') });

// Global process-level error handlers
if (process.env.NODE_ENV !== 'production') {
  process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
    process.exit(1);
  });

  process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION:', err);
    process.exit(1);
  });
}

const connectDB = require('./config/db');
const app = require('./app');

// Establish DB connection asynchronously (Mongoose buffers operations)
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running locally on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`ERROR: Port ${PORT} is already in use by another process.`);
    console.error(`Please free port ${PORT} or configure a different PORT in your environment.`);
    process.exit(1);
  } else {
    console.error('Server error occurred during startup:', err);
    process.exit(1);
  }
});
