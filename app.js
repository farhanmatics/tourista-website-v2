require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const csrf = require("csurf");

const homeController = require("./controllers/homeController");

const csrfProtect = csrf({ cookie: true });
const formParser = bodyParser.urlencoded({ extended: false });

require("dotenv").config();
//const fetch = require('node-fetch')

const apiRoutes = require("./routes/apiRoutes");
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

app.get("/", homeController.home_get);
app.get("/blog/:id", homeController.blogs_get);

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/expert", csrfProtect, (req, res) => {
  console.log("Token to Browser/form: " + req.csrfToken());
  res.render("expert", { csrfToken: req.csrfToken() });
});

app.use("/api/", formParser, csrfProtect, apiRoutes);

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
