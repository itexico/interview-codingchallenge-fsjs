// Import npm modules
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const config = require("./config");

// Initialize the app
const app = express();

// Import routes
const noteRoutes = require("./api/routes/notes");

// set the right database host to use
const DBHost =
  process.env.NODE_ENV === "test" ? config.DBHostTest : config.DBHostDev;

// Connect to database
mongoose.connect(
  DBHost,
  {
    useNewUrlParser: true
  }
);
mongoose.Promise = global.Promise;

// Initialize middleware
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}
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

app.use(cookieParser());
// Add auth cookie for no test env
// This is a temporal solution, it will change once client side has been developed
if (process.env.NODE_ENV !== "test") {
  app.use((req, res, next) => {
    res.cookie("auth", "");
    next();
  });
}

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
    error: err
  });
});

module.exports = app;
