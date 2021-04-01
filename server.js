const express = require('express');
connectDB = require('./config/db');
const app = express();
const path = require('path');

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.use(express.static('public'));
// GET home route
app.get('/login-fn', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/hey', (_, res) => res.send('ho!'));

const PORT = process.env.PORT || 3000;

// Start server with PORT
app.listen(PORT, () =>
  console.log(`App is running in ${process.env.NODE_ENV} on port: ${PORT}`)
);
