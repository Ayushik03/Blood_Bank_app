const express =require("express")

const { testcontroller } = require("../controllers/testcontroller")



//router object
const router=express.Router()

//routes
router.get("/",testcontroller)
module.exports=router