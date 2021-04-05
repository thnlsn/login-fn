const express = require('express'); // Express
const cors = require('cors'); // Cors middleware
const connectDB = require('./config/db'); // Local DB connection function (./config/db.js)

require('dotenv').config(); // Environment variables to keep keys secure

const app = express(); // Init express in variable app
const PORT = process.env.PORT || 5000; // Use PORT else 5000

// Middleware
app.use(cors()); // Enable CORS w/ options
app.use(express.json()); // Parses JSON requests (body-parser replacement)

connectDB(); // Init MongoDB database connection

// Bringing in entire route files to seperate routing concerns
const authRouter = require('./routes/auth'); // import users routes
const usersRouter = require('./routes/users'); // import users routes
const cardsRouter = require('./routes/cards'); // import cards routes

// Basic route
app.get('/', (_, res) => {
  res.json({ msg: 'Welcome to Flipnote!' });
});

// Prefix a route which when hit will access the router file that contains those concerns
app.use('/auth', authRouter); // When /auth is hit, use routes from ./routes/auth.js
app.use('/users', usersRouter); // When /users is hit, use routes from ./routes/users.js
app.use('/cards', cardsRouter); // When /cards is hit, use routes from ./routes/cards.js

// Listening on PORT
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} on port: ${PORT}`);
});
