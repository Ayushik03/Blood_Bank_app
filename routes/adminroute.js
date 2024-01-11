const express = require("express");
const authmiddleware = require("../middlewares/authmiddleware");
const {
  getDonarlistcontroller,
  getHospitallistcontroller,
  getOrganisationlistcontroller,
  deleteDonarcontroller,
  deletehospitalcontroller,
  deleteorganisationcontroller,
} = require("../controllers/admincontroller");
const adminmiddleware = require("../middlewares/adminmiddleware");

//routes
const router = express.Router();

//get|| Donar list
router.get(
  "/donar-list",
  authmiddleware,
  adminmiddleware,
  getDonarlistcontroller
);

//get hospital list
router.get(
  "/hospital-list",
  authmiddleware,
  adminmiddleware,
  getHospitallistcontroller
);

// get organisation list
router.get(
  "/organisation-list",
  authmiddleware,
  adminmiddleware,
  getOrganisationlistcontroller
);

// delete donar || get
router.delete(
  "delete-donar/:id",
  authmiddleware,
  adminmiddleware,
  deleteDonarcontroller
);

//delete hospital || get
router.delete(
  "/delete-hospital/:id",
  authmiddleware,
  adminmiddleware,
  deletehospitalcontroller
);

// delete organisation || get
router.delete(
  "/delete-organisation/:id",
  authmiddleware,
  adminmiddleware,
  deleteorganisationcontroller
);

//Export

module.exports = router;
