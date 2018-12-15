// Import npm modules
const express = require('express')

// Initialize the app
const app = express();

// Import routes
const noteRoutes = require('./api/routes/notes');

// Use API routes in the app
app.use('/notes', noteRoutes);

module.exports = app;