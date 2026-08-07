const mongoose = require('mongoose');
const connectDB = require('../config/db');
const app = require('../app');

module.exports = async (req, res) => {
  // Ensure database connection is active (1 = connected, 2 = connecting)
  if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
    await connectDB();
  }
  
  // Directly hand off execution to Express
  app(req, res);
};
