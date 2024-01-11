const usermodel = require("../models/usermodel");

//get donar list
const getDonarlistcontroller = async (req, res) => {
  try {
    const donarData = await usermodel
      .find({ role: "donar" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Total: donarData.length,
      message: "Donar List Fetched Successfully",
      donarData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Donar-List API",
      error,
    });
  }
};

// get hospital list
const getHospitallistcontroller = async (req, res) => {
  try {
    const hospitalData = await usermodel
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Total: hospitalData.length,
      message: "Hospital List Fetched Successfully",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Hospital-List API",
      error,
    });
  }
};

// get organisation list
const getOrganisationlistcontroller = async (req, res) => {
  try {
    const OrgData = await usermodel
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      Total: OrgData.length,
      message: "Organisation List Fetched Successfully",
      OrgData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Organisation-List API",
      error,
    });
  }
};

// delete button function

const deleteDonarcontroller = async (req, res) => {
  try {
    await usermodel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Donar Record Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Deleting Donar",
      error,
    });
  }
};

// delete buttton for hospital
const deletehospitalcontroller = async (req, res) => {
  try {
    await usermodel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Hospital Record Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Deleting Hospital",
      error,
    });
  }
};


// delete button for organisation
const deleteorganisationcontroller = async (req, res) => {
  try {
    await usermodel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Organisation Record Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Deleting Organisation",
      error,
    });
  }
};

//Export
module.exports = {
  getDonarlistcontroller,
  getOrganisationlistcontroller,
  getHospitallistcontroller,
  deleteDonarcontroller,
  deletehospitalcontroller,
  deleteorganisationcontroller
};
