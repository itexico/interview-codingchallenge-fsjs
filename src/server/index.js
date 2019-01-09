const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const apiRoute = "/listsApp";
const listEndpoints = require("./endpoints/list");
const itemEndpoints = require("./endpoints/item");

const uri = "mongodb://localhost:27017/listsApp";
const port = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); // `cors` gives default access from external domains

app.use(apiRoute, listEndpoints);
app.use(apiRoute, itemEndpoints);

mongoose
  .connect(
    uri,
    { useNewUrlParser: true }
  )
  .then(
    () => {
      app.listen(port, () => {
        console.log(`Server started on port: ${port}`);
      });
    },
    err => {
      console.log(`Connection error: ${err}; on port: ${port}`);
    }
  );

module.exports = { app, apiRoute };
