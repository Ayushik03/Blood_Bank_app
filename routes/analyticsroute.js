const express = require("express");

const authmiddleware = require("../middlewares/authmiddleware");
const { bloodGroupDetailsController } = require("../controllers/analyticscontroller");

const router = express.Router();

//routes


//get blood data
router.get("/bloodGroups-data", authmiddleware, bloodGroupDetailsController);



module.exports = router;
