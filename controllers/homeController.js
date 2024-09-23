require("dotenv").config();
const axios = require("axios");
const { response } = require("express");
const session = require('express-session');
const apiUrl = process.env.API_URL;


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

  // TODO: Fetch blog data using the id
  // For now, we'll pass a dummy blog object
  const blog = {
    id: id
  };

  res.render("blog", { blog: blog });
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
