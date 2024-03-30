require("dotenv").config();
const sequelize2 = require("../config/db");

module.exports.countries_get = async (req, res) => {
  console.log("here");
  const countries = await sequelize2.query(
    "select id, visa_country, iso3_code  from countries c where is_active = 1",
    {
      type: sequelize2.QueryTypes.SELECT,
    },
  );
  res.json(countries);
};

module.exports.professions_get = async (req, res) => {
  const professions = await sequelize2.query(
    "select id, profession from professions",
    {
      type: sequelize2.QueryTypes.SELECT,
    },
  );
  res.json(professions);
};

module.exports.submit_form_post = async (req, res) => {
  console.log(req.body);

  //check if email has any entry with submit status from db
  // if yes then return error
  // if no then insert data into db
  const { QueryTypes } = require("sequelize");
  const {
    fullname,
    mobile,
    email,
    country,
    profession,
    comment,
    visatype,
    helptype,
  } = req.body;

  let qry =
    "select id, email, mobile, status from expert_orders where (email = ? or mobile = ?) and status = 'Submitted'";

  const result = await sequelize2.query(qry, {
    replacements: [email, mobile],
    type: QueryTypes.SELECT,
  });

  let len = Object.keys(result).length;
  console.log("len", len);

  if (result.length > 0) {
    res.json({
      success: false,
      message: "Your request is already submitted. Please try again later.",
    });
  } else {
    console.log("inserting");
    let insertQry = `INSERT INTO touristadev_db.expert_orders
    (order_type, country_id, fullname, email, mobile, profession, help_type, comment, created_at, visa_category_id, status) 
    VALUES('visa', ?, ?, ?, ?, ?, ?, ?, current_timestamp(3), ?, 'Submitted')`;

    const [insertResult, metadata] = await sequelize2.query(insertQry, {
      replacements: [
        country,
        fullname,
        email,
        mobile,
        profession,
        helptype,
        comment,
        visatype,
      ],
      type: QueryTypes.INSERT,
    });

    console.log(metadata);

    res.json({
      success: true,
      message:
        "Your request is being processed. Thank You For Submitting your request. An expert will reach out to you shortly. Meanwhile you can visit our website to get more details.",
    });
  }
};
