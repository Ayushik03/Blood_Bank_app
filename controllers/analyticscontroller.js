const mongoose = require("mongoose");
const inventorymodel = require("../models/inventorymodel");

// Get Blood Data
const bloodGroupDetailsController = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const bloodGroupData = [];
    const organisation = new mongoose.Types.ObjectId(req.body.userId);
    // get single blood group
    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        //count total in
        const totalIn = await inventorymodel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventorytype: "in",
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        //count total out
        const totalout = await inventorymodel.aggregate([
          {
            $match: {
              bloodGroup: bloodGroup,
              inventorytype: "out",
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        //calculate total
        const availableBlood = (totalIn[0]?.total || 0) - (totalout[0]?.total || 0);

        // push data
        bloodGroupData.push({
          bloodGroup,
          totalIn: totalIn[0]?.total || 0,
          totalout: totalout[0]?.total || 0,
          availableBlood,
        });
      })
    );
    return res.status(200).send({
      success: true,
      message: "Blood Group Data Fetched Successfully",
      bloodGroupData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Bloodgroup Data Analytics API",
      error,
    });
  }
};

module.exports = { bloodGroupDetailsController };
