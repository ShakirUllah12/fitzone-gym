const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables.');
    }
    
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    });
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
    console.log(`Connected to database: ${conn.connection.name}`);
    process.env.USE_MOCK_DATA = 'false';
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.warn('\n========================================================================');
    console.warn('WARNING: Could not connect to MongoDB database.');
    console.warn('The server will start and operate in MOCK DATA mode using local datasets.');
    console.warn('========================================================================\n');
    process.env.USE_MOCK_DATA = 'true';
  }
};

module.exports = connectDB;
