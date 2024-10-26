require("dotenv").config();
const axios = require("axios");
const { response } = require("express");
const session = require('express-session');
const apiUrl = process.env.API_URL;

const http = require('http');
const https = require('https');


module.exports.home_get = async (req, res) => {
  console.log("here");

  // const blogs = await sequelize2.query(
  //   "select id,title,meta_title,thumbnail_image,thumbnail_image_alt,tags  from blog_posts bp order by id desc limit 4",
  //   {
  //     type: sequelize2.QueryTypes.SELECT,
  //   },
  // );

  // console.log(blogs);

  //res.render("home", { blogs: blogs });
  res.render("home");
};

module.exports.blogs_get = async (req, res) => {
  const id = req.params.id;
  console.log("Blog ID:", id);

  const apiUrl = `https://tourista-monitor.netlify.app/.netlify/functions/api/blog/${id}`;

  https.get(apiUrl, (apiRes) => {
    let data = '';

    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    apiRes.on('end', () => {
      if (apiRes.statusCode === 200) {
        try {
          const blogData = JSON.parse(data);
          res.render("blog", { blog: blogData });
        } catch (error) {
          console.error("Error parsing blog data:", error);
          renderErrorPage(res, id);
        }
      } else {
        console.error(`HTTP error! status: ${apiRes.statusCode}`);
        renderErrorPage(res, id);
      }
    });
  }).on('error', (error) => {
    console.error("Error fetching blog data:", error);
    renderErrorPage(res, id);
  });
};

function renderErrorPage(res, id) {
  res.render("blog", { 
    blog: { 
      id: id,
      title: "Error",
      content: "Unable to fetch blog data. Please try again later.",
      meta_title: "Error | TOURISTA",
      meta_description: "An error occurred while fetching the blog post.",
      meta_keywords: "",
      header_image: ""
    } 
  });
};


module.exports.login_post = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await axios.post(`${apiUrl}/login`, { email, password });

    console.log(response.data);
    if (response.status === 200) {
      // Store the token in the session
      const token = response.data.token;
      if (token) {
        req.session.token = token;
      }
      
      req.session.user = email;
      console.log(req.session);
      res.redirect("/dashboard");
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.signup_post = async (req, res) => {
  try {
    const { full_name, email, password, confirmPassword, mobile } = req.body;
    
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.render("signup", { error: "Passwords do not match" });
    }
    
    const response = await axios.post(`${apiUrl}/signup`, { full_name, email, password, mobile });

    console.log(response.data);
    if (response.status === 200) {
      if(response.data.message){

        const token = response.data.token;
        if (token) {
          req.session.token = token;
        }
        
        req.session.user = email;
        console.log(req.session);
        res.redirect("/dashboard");
      }
      else{
        res.render("signup",{error: response.data.error});
      }
    } else {
      res.render("signup");
    }
    
  } catch (error) {

    console.error("Error during signup:");
    res.render("signup");
  }
};
