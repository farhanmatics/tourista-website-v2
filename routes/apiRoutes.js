const { Router } = require("express");
const router = Router();
const apiController = require("../controllers/apiController");

router.get("/countries", apiController.countries_get);

module.exports = router;
