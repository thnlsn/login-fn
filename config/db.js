const mongoose = require('mongoose');
require('dotenv').config();
const URI = process.env.ATLAS_URI; // Private URI to connect to MongoDB Atlas

const connectDB = async () => {
  try {
    // Connecting the MongoDB Database
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB database connection established successfully...');
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    process.exit(1); // 1 is uncaught exception status code
  }
};

module.exports = connectDB;
