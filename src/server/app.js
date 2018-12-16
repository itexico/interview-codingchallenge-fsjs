// Import npm modules
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Initialize the app
const app = express();

// Import routes
const noteRoutes = require("./api/routes/notes");

mongoose.connect(
  "mongodb://user-notes:" +
    process.env.MONGO_ATLAS_PW +
    "@node-rest-notes-shard-00-00-eyg6h.mongodb.net:27017,node-rest-notes-shard-00-01-eyg6h.mongodb.net:27017,node-rest-notes-shard-00-02-eyg6h.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-notes-shard-0&authSource=admin&retryWrites=true",
    {
      useNewUrlParser: true
    }
);

// Initialize middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Preventing CORS Errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Acess-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Use API routes in the app
app.use("/notes", noteRoutes);

// Generating 404 error for nonexistent endpoints
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Handling all errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
