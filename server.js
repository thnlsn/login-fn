const express = require('express'); //
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config(); // Environment variables to keep keys secure

const app = express(); // Init express in variable app
const PORT = process.env.PORT || 5000; // Use PORT else 5000

// Middleware
app.use(cors()); // Enable CORS w/ options
app.use(express.json()); // Parses JSON requests (body-parser replacement)

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

// Telling server to use the route files
const exercisesRouter = require('./routes/exercises'); // import exercises routes
const usersRouter = require('./routes/users'); // import users routes

app.use('/exercises', exercisesRouter); // When /exercises is hit, use routes from ./routes/exercises
app.use('/users', usersRouter); // When /users is hit, use routes from ./routes/exercises

// Listening on PORT
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} on port: ${PORT}`);
});

/* const express = require('express');
connectDB = require('./config/db');
const app = express();
const path = require('path');

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.use(express.static('public'));
// GET home route
app.get('/login-fn/users', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/hey', (_, res) => res.send('ho!'));

const PORT = process.env.PORT || 3000;

// Start server with PORT
app.listen(PORT, () =>
  console.log(`App is running in ${process.env.NODE_ENV} on port: ${PORT}`)
); */
