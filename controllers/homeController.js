require("dotenv").config();

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
