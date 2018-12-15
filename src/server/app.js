// import npm modules
const express = require('express')

// initialize the app
const app = express();


app.use((req, res, next) => {
  res.status(200).json({
    message: 'App has connected'
  });
});

module.exports = app;