require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const csrf = require("csurf");
const session = require('express-session');
const isAuthenticated = require('./auth');
const homeController = require("./controllers/homeController");
const addUserToLocals = require('./middleware/userMiddleware');


const csrfProtect = csrf({ cookie: true });
const formParser = bodyParser.urlencoded({ extended: false });

require("dotenv").config();
//const fetch = require('node-fetch')


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
app.use(session({
  secret: 'tailwind',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
// Add this line after your session middleware
app.use(addUserToLocals);

app.get("/", homeController.home_get);
app.get("/blog/:id", homeController.blogs_get);

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/categories", (req, res) => {
  res.render("categories");
});

app.get("/countries", (req, res) => {
  res.render("countries");
});

app.get("/faq", (req, res) => {
  res.render("faq");
});

app.get("/documents", (req, res) => {
  res.render("documents");
});

app.get("/visa/:slug", (req, res) => {
  res.render("visa");
});

app.get("/travel-confidently-from-bangladesh", (req, res) => {
  res.render("confident");
});

app.get("/expert", csrfProtect, (req, res) => {
  console.log("Token to Browser/form: " + req.csrfToken());
  res.render("expert", { csrfToken: req.csrfToken() });
});

app.get("/privacy-policy", (req, res) => {
  res.render("privacy");
});

app.get("/terms-and-conditions", (req, res) => {
  res.render("terms");
});

app.get("/rich-text-editor", (req, res) => {
  res.render("rich-text-editor");
});
//app.use("/api/", formParser, csrfProtect, apiRoutes);



app.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

app.get('/login', (req, res) => {
  console.log(req.session);
  if(req.session.user){
    res.redirect('/dashboard');
  }else{
    res.render('login');
  }
});

app.post('/login', homeController.login_post);

app.get('/signup', (req, res) => {
  res.render('signup', { error: null });
});

app.post('/signup', homeController.signup_post);

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});



app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("404");
});

module.exports = app;
