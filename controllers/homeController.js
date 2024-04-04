require("dotenv").config();
const sequelize2 = require("../config/db");
const nodemailer = require("nodemailer");

module.exports.home_get = async (req, res) => {
  console.log("here");

  const blogs = await sequelize2.query(
    "select id,title,meta_title,thumbnail_image,thumbnail_image_alt,tags  from blog_posts bp order by id desc limit 4",
    {
      type: sequelize2.QueryTypes.SELECT,
    },
  );

  console.log(blogs);

  res.render("home", { blogs: blogs });
};

module.exports.blogs_get = async (req, res) => {
  const id = req.params.id;
  const blog = await sequelize2.query(
    "select title,meta_title,meta_description,meta_keywords,header_image,header_image_alt,thumbnail_image,post,created_at,updated_at,created_by,updated_by,thumbnail_image_alt,tags  from blog_posts bp where id = " +
      id,
    {
      type: sequelize2.QueryTypes.SELECT,
    },
  );

  console.log(blog);

  res.render("blog", { blog: blog });
};
