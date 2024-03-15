require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();
//const fetch = require('node-fetch')

//const visaRoutes = require('./routes/visaRoutes')
//const { requireAuth, checkUser } = require("./middleware/authMiddleware");

app.use(morgan("dev"));
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));
app.use("/js", express.static("public/js"));
app.use("/public", express.static("public"));

// Set Templating Engine

app.set("view engine", "ejs");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  ); // If needed
  res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type"); // If needed
  res.header("Access-Control-Allow-Credentials", true); // If needed

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//routes

//app.get("*", checkUser);

app.get("/", (req, res) => {
  //let tracking = req.query.tracking;
  res.render("home");
});

app.get("/expert", (req, res) => {
  //let tracking = req.query.tracking;
  res.render("expert");
});

//app.use(visaRoutes)

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

module.exports = app;
