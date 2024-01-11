const express = require('express')
const { createinventorycontroller,getinventorycontroller, getDonarsController, getHospitalController, getOrganisationConrtroller, getOrganisationforhospitalConrtroller, getinventoryhospitalcontroller, getrecentinventorycontroller} = require('../controllers/inventorycontroller')
const authmiddleware = require('../middlewares/authmiddleware')

const router = express.Router()



//routes
//add inventory || POST
router.post('/create-inventory',authmiddleware,createinventorycontroller)

//get  records of 3
router.get('/get-recent-inventory',authmiddleware,getrecentinventorycontroller)

//get all blood records
router.get('/get-inventory',authmiddleware,getinventorycontroller)

//get  blood  records for hospital
router.post('/get-inventory-hospital',authmiddleware,getinventoryhospitalcontroller)

//get all donar  records
router.get('/get-donars',authmiddleware,getDonarsController)

//get all hospital  records
router.get('/get-hospitals',authmiddleware,getHospitalController)


//get all organisation  records
router.get('/get-organisation',authmiddleware,getOrganisationConrtroller)

//get all  organisation for hospital  records
router.get('/get-organisation-for-hospital',authmiddleware,getOrganisationforhospitalConrtroller)


module.exports = router