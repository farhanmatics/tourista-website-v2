const { Router } = require("express");
const router = Router();
const apiController = require("../controllers/apiController");

router.get("/countries", apiController.countries_get);
router.get("/professions", apiController.professions_get);
router.post("/submit-form", apiController.submit_form_post);

module.exports = router;
