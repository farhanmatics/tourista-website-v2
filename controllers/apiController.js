require("dotenv").config();
const sequelize2 = require("../config/db");
const nodemailer = require("nodemailer");

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
    (order_type, country_id, fullname, email, mobile, profession, help_type, comment, created_at, visa_category, status) 
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

    //console.log(metadata);

    //send an email to customer
    const transporter = nodemailer.createTransport({
      host: "mail.tourista.co",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "no-reply@tourista.co",
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"Tourista " <no-reply@tourista.co>', // sender address
      to: email, // list of receivers
      subject: "Tourista! Your request is being processed", // Subject line
      text: "Your request is being processed. Thank You For Submitting your request. An expert will reach out to you shortly. Meanwhile you can visit our website to get more details.", // plain text body
      html: `<html>
      <head>
        <title></title>
        <link href="https://svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/css/wsc.css" rel="stylesheet" type="text/css" />
      </head>
      <body><img alt="welcome to tourista" src="https://i.ibb.co/zZgndRh/Tl-011111.png" style="height:47px; width:200px" /><br />
      <br />
      <br />
      <br />
      Hi ${fullname},<br />
      &nbsp;
      <div>Your request is being processed. Thank You For Submitting your request. An expert will reach out to you shortly. Meanwhile you can visit our website to get more details.<br />
      <br />
      Feel Free to knock us for any query.<br />
      <br />
      Tasnuva Sharmin,<br />
      Business Executive,<br />
      Tourista Ltd.<br />
      67/C, Block E, Road 11, Level 04, Banani, Dhaka 1213, Bangladesh.<br />
      https://tourista.co<br />
      +880 1711-925054<br />
      <br />
      &nbsp;</div>
      </body>
      </html>
      `, // html body
    });

    console.log("Message sent: %s", info.messageId);

    const infoTourista = await transporter.sendMail({
      from: '"Tourista" <no-reply@tourista.co>', // sender address
      to: "farhan@tourista.co, junayed@tourista.co, visa@tourista.co", // list of receivers
      subject: `Need Expert Help!!! ${fullname}`, // Subject line
      text: `${fullname} needs expert help! check your admin panel quickly`, // plain text body
      html: `<html>
      <head>
        <title></title>
        <link href="https://svc.webspellchecker.net/spellcheck31/lf/scayt3/ckscayt/css/wsc.css" rel="stylesheet" type="text/css" />
      </head>
      <body><img alt="welcome to tourista" src="https://i.ibb.co/zZgndRh/Tl-011111.png" style="height:47px; width:200px" /><br />
      <br />
      <br />
      <br />
      Hi Tourista,<br />
      &nbsp;
      <div>${fullname} needs expert help, check your admin quickly for more details.<br />
      <br />
      Feel Free to knock us for any query.<br />
      <br />
      Tasnuva Sharmin,<br />
      Business Executive,<br />
      Tourista Ltd.<br />
      67/C, Block E, Road 11, Level 04, Banani, Dhaka 1213, Bangladesh.<br />
      https://tourista.co<br />
      +880 1711-925054<br />
      <br />
      &nbsp;</div>
      </body>
      </html>
      `, // html body
    });

    console.log("Message sent: %s", infoTourista.messageId);

    res.json({
      success: true,
      message:
        "Your request is being processed. Thank You For Submitting your request. An expert will reach out to you shortly. Meanwhile you can visit our website to get more details.",
    });
  }
};
