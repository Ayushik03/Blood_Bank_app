const express = require("express");
const {
  registercontroller,
  logincontroller,
  currentusercontroller,
} = require("../controllers/authcontroller");
const authmiddleware = require("../middlewares/authmiddleware");

const router = express.Router();

//routes
//register user ||POST
router.post("/register", registercontroller);

//login || POST
router.post("/login", logincontroller);
// get current user ||GET
router.get("/current-user",authmiddleware,currentusercontroller)

module.exports = router;
