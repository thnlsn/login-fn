const express = require('express');
connectDB = require('./config/db');
const app = express();
const path = require('path');

// Connect Database
connectDB();
