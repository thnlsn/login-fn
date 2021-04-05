const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  // Connecting the MongoDB Database
  const URI = process.env.ATLAS_URI; // Private URI to connect to MongoDB Atlas
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
  });
};

module.exports = connectDB;
