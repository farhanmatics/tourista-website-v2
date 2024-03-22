require("dotenv").config();

const Sequelize = require("sequelize");

const sequelize2 = new Sequelize(
  process.env.DB_DATABASE2,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  },
);

sequelize2
  .authenticate()
  .then(() => {
    console.log("DEV:Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize2;
