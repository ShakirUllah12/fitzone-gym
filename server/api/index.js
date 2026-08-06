const serverless = require('serverless-http');
const connectDB = require('../config/db');
const app = require('../app');

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return serverless(app)(req, res);
};
