const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
const exercisesRouter = require('./routes/exercises'); // import routes
const usersRouter = require('./routes/users'); // import routes

app.use('/exercises', exercisesRouter); // middleware to handle route /excercises
app.use('/users', usersRouter); // middleware to handle route /users

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
