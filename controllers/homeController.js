require("dotenv").config();
const sequelize2 = require("../config/db");
const nodemailer = require("nodemailer");

module.exports.home_get = async (req, res) => {
  console.log("here");

  const blogs = await sequelize2.query(
    "select title,meta_title,thumbnail_image,thumbnail_image_alt,tags  from blog_posts bp order by id desc limit 4",
    {
      type: sequelize2.QueryTypes.SELECT,
    },
  );

  console.log(blogs);

  res.render("home", { blogs: blogs });
};
