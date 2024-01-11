const mongoose = require("mongoose");
const inventorymodel = require("../models/inventorymodel");
const usermodel = require("../models/usermodel");

// create inventory
const createinventorycontroller = async (req, res) => {
  try {
    const { email } = req.body;
    //validation
    const user = await usermodel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found");
    }
    if (req.body.inventorytype == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userId);
      // calculate Blood Quantity
      const totalInOfRequestedBlood = await inventorymodel.aggregate([
        {
          $match: {
            organisation,
            inventorytype: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("total in",totalInOfRequestedBlood)
      const totalIn = totalInOfRequestedBlood[0]?.total || 0;
      //calculate out blood quantity
      const totalOutOfRequestedBloodGroup = await inventorymodel.aggregate([
        {
          $match: {
            organisation,
            inventorytype: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("total out",totalOuOftRequestedBloodGroup)
      const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;
      // in & out calc
      const availableQuantityOfBloodGroup = totalIn - totalOut;
      // quantity validation
      if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `Only ${availableQuantityOfBloodGroup}ML Of ${requestedBloodGroup.toUpperCase()} Is Available`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donar = user?._id;
    }

    //save record
    const inventory = new inventorymodel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Record Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Create Inventory API",
      error,
    });
  }
};

//get all blood records
const getinventorycontroller = async (req, res) => {
  try {
    const inventory = await inventorymodel
      .find({ organisation: req.body.userId })
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Get All Records Successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get All Inventory",
      error,
    });
  }
};

//get hospital blood records
const getinventoryhospitalcontroller = async (req, res) => {
  try {
    const inventory = await inventorymodel
      .find(req.body.filters)
      .populate("donar")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Get Hospital Consumers Records Successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get Consumer Inventory",
      error,
    });
  }
};
//get records of 3
const getrecentinventorycontroller = async(req,res)=>{
  try {
    const inventory = await inventorymodel.find({
      organisation : req.body.userId,
    })
    .limit(3)
    .sort({createdAt:-1})
    return res.status(200).send({
      success:true,
      message:"Recent Records Fetched Successfully",
      inventory,
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:'Error In Recent Inventory API',
      error,
    })
    
  }
}

// get donar records
const getDonarsController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    // find donars
    const donarId = await inventorymodel.distinct("donar", {
      organisation,
    });
    // console.log(donarId)
    const donars = await usermodel.find({ _id: { $in: donarId } });

    return res.status(200).send({
      success: true,
      message: "Donar Record Fetched Successfully",
      donars,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Donar Records",
      error,
    });
  }
};
const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userId;
    // get hospital id
    const hospitalId = await inventorymodel.distinct("hospital", {
      organisation,
    });
    // find hospital
    const hospitals = await usermodel.find({ _id: { $in: hospitalId } });

    return res.status(200).send({
      success: true,
      message: "Hospitals Data Fetched Successfully",
      hospitals,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get Hospital API",
      error,
    });
  }
};

// get org profile
const getOrganisationConrtroller = async (req, res) => {
  try {
    const donar = req.body.userId;
    const orgId = await inventorymodel.distinct("organisation", {donar });
    //find org
    const organisations = await usermodel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: "Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Org API",
      error,
    });
  }
};
// get org profile-for hospital
const getOrganisationforhospitalConrtroller = async (req, res) => {
  try {
    const hospital = req.body.userId;
    const orgId = await inventorymodel.distinct("organisation", {hospital });
    //find org
    const organisations = await usermodel.find({
      _id: { $in: orgId },
    });
    return res.status(200).send({
      success: true,
      message: " Hospital Org Data Fetched Successfully",
      organisations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital Org API",
      error,
    });
  }
};


module.exports = {
  createinventorycontroller,
  getinventorycontroller,
  getDonarsController,
  getHospitalController,
  getOrganisationConrtroller,
  getOrganisationforhospitalConrtroller,
  getinventoryhospitalcontroller,
  getrecentinventorycontroller
};
