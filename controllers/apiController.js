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
