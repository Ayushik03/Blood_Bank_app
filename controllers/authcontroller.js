const usermodel = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registercontroller = async (req, res) => {
  try {
    const existinguser = await usermodel.findOne({ email: req.body.email });
    //validation
    if (existinguser) {
      return res.status(200).send({
        success: false,
        message: "User Already Exists",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedpassword;
    //rest data
    const user = new usermodel(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};
//login call back
const logincontroller = async (req, res) => {
  try {
    const user = await usermodel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // check role
    if (user.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "Role Does Not Match",
      });
    }
    //compare password
    const comparepassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparepassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "86400000 ",
    });
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};

// get current user
const currentusercontroller = async (req, res) => {
  try {
    const user = await usermodel.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "User Fetched Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Unable To Get Current User ",
      error,
    });
  }
};

module.exports = { registercontroller, logincontroller, currentusercontroller };
