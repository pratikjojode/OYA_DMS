const doctorModel = require("../models/doctorModel");
const nurseModel = require("../models/nurseModel");
const userModel = require("../models/userModels");
// get all the users
const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "Fetched all the users succesfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching users",
      error,
    });
  }
};

// get all th doctors
const getAllDoctorsControler = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Fetched all the Doctors succesfully",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching doctors",
      error,
    });
  }
};

const getAllNursesCOntroler = async (req, res) => {
  try {
    const nurses = await nurseModel.find({});
    res.status(200).send({
      success: true,
      message: "All nurses fetched succefully",
      nurses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Somethijg went wrong wil fetching  the nurses",
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const id = req.params._id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getAdminCtrl = async (req, res) => {
  try {
    const adminId = req.params.id; // Use params.id to get the admin ID
    const admin = await userModel.findById(adminId); // Find the admin by ID

    if (!admin || !admin.isAdmin) {
      return res.status(404).send({
        success: false,
        message: "Admin not found or not an admin",
      });
    }

    res.status(200).send({
      success: true,
      message: "Admin found",
      admin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occurred while fetching admin data",
      error,
    });
  }
};

module.exports = {
  getAllUsersController,
  getAllDoctorsControler,
  getAllNursesCOntroler,
  getCurrentUser,
  getAdminCtrl,
};
