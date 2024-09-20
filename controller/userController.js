// logn controller
const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const nurseModel = require("../models/nurseModel");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).send({
        message: "Email does not exist",
        success: false,
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        message: "User or Patient not found",
        success: false,
      });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        message: "Password or Email is wrong",
        success: false,
      });
    }

    // Generate JWT token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send success response with token
    return res.status(200).send({
      message: "Login success",
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Something went wrong during login",
      success: false,
      error,
    });
  }
};

// regiwter controler
const regsiterController = async (req, res) => {
  try {
    const existinigUser = await userModel.findOne({ email: req.body.email });
    if (existinigUser) {
      return res.status(200).send({
        message: "User/patient already exists",
        success: false,
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({
      message: "User/patient regsitred Succesfully",
      success: true,
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const authCtrl = async (req, res) => {
  try {
    // Assuming userId is sent in the request body
    const userId = req.body.userId;

    // Check if userId is provided
    if (!userId) {
      return res.status(400).send({
        message: "User ID is required",
        success: false,
      });
    }

    // Fetch user by ID
    const user = await userModel.findById(userId).select("-password");

    // Check if user exists
    if (!user) {
      return res.status(404).send({
        message: "User/Patient not found",
        success: false,
      });
    }

    // Send user data
    res.status(200).send({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal server error",
      success: false,
    });
  }
};

// apply doc ctrl
const applyDocController = async (req, res) => {
  try {
    // Create a new doctor application
    const newDoc = new doctorModel({ ...req.body, status: "pending" });
    await newDoc.save();

    // Find the admin user
    const adminUser = await userModel.findOne({ isAdmin: true });

    // Check if an admin user was found
    if (!adminUser) {
      return res.status(404).send({
        success: false,
        message: "Admin user not found",
      });
    }

    // Add a notification to the admin user's notification array
    const notification = adminUser.notification || [];
    notification.push({
      type: "apply-doc-request",
      message: `${newDoc.firstName} ${newDoc.lastName} has applied for a Doctor account`,
      data: {
        doctorId: newDoc._id,
        name: `${newDoc.firstName} ${newDoc.lastName}`,
        onclickPath: "/admin/doctors",
      },
    });

    // Update the admin user's notification array
    await userModel.findByIdAndUpdate(
      adminUser._id,
      { notification },
      { new: true }
    );

    // Send a success response
    res.status(200).send({
      success: true,
      message: "Doctor application submitted and admin notified successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while applying for doctor",
      error,
    });
  }
};

// aplly nurse cotroller
const applyNurseController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      specialty,
      experience,
      address,
      availability,
    } = req.body;

    // Create a new nurse record
    const newNurse = new nurseModel({
      firstName,
      lastName,
      phone,
      email,
      specialty,
      experience,
      address,
      availability,
    });

    // Save the nurse to the database
    await newNurse.save();

    res.status(201).json({
      success: true,
      message: "Nurse application submitted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Nurse application failed",
      error: error.message,
    });
  }
};

// notification ctrl
const getallNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "All notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "error in notification",
      success: false,
      error,
    });
  }
};

// delete the notifaction //post
const deleteallNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "notification deleted succefully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to delete all notification ",
      error,
    });
  }
};

// nurse controller

// Get all notifications for a nurse
const getNurseNotifications = async (req, res) => {
  try {
    const nurse = await nurseModel.findById(req.body.nurseId);
    res.status(200).send({
      success: true,
      message: "Notifications fetched successfully",
      data: {
        notifications: nurse.notifications,
        seenNotifications: nurse.seenNotifications,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching notifications",
      error,
    });
  }
};

// Mark all notifications as read
const markAllNurseNotificationsRead = async (req, res) => {
  try {
    const nurse = await nurseModel.findById(req.body.nurseId);
    const seenNotifications = nurse.notifications;
    nurse.notifications = [];
    nurse.seenNotifications.push(...seenNotifications);
    await nurse.save();

    res.status(200).send({
      success: true,
      message: "All notifications marked as read",
      data: nurse,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in marking notifications as read",
      error,
    });
  }
};

// Delete all notifications
const deleteAllNurseNotifications = async (req, res) => {
  try {
    const nurse = await nurseModel.findById(req.body.nurseId);
    nurse.notifications = [];
    nurse.seenNotifications = [];
    await nurse.save();

    res.status(200).send({
      success: true,
      message: "All notifications deleted successfully",
      data: nurse,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in deleting notifications",
      error,
    });
  }
};

const getUserDoctorCOntroller = async (req, res) => {
  try {
    const doc = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "User doctor ftehced succefully",
      doc,
    });
    console.log("Doctors");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "USER PAGE DOCTOR NOT FETCHED",
      error,
    });
  }
};

const getSingleUserCtr = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Received user ID:", userId); // Debugging

    if (!userId || userId === "undefined") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or missing user ID" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User found", user });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching user data",
    });
  }
};

module.exports = {
  loginController,
  regsiterController,
  authCtrl,
  applyDocController,
  applyNurseController,
  getallNotificationController,
  deleteallNotificationController,
  getNurseNotifications,
  markAllNurseNotificationsRead,
  deleteAllNurseNotifications,
  getUserDoctorCOntroller,
  getSingleUserCtr,
};
