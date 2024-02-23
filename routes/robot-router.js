const express = require("express");
const router = express.Router();
const visionController = require("../controllers/vision-controller")

router.get("/", visionController.getRoot);
router.post("/hsv-config", visionController.postHSVConfig)

module.exports = router;