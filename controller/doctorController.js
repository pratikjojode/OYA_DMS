const Doctor = require("../models/doctorModel"); // Assuming you have a Doctor model
const fs = require("fs");

// Create Doctor
exports.createDoctor = async (req, res) => {
  try {
    const doctorData = { ...req.body };
    if (req.file) {
      doctorData.image = req.file.path; // Save the file path in the database
    }
    const doctor = new Doctor(doctorData);
    await doctor.save();
    res.status(201).json({ success: true, doctor });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create doctor" });
  }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch doctors" });
  }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    res.status(200).json({ success: true, doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch doctor" });
  }
};

// Update doctor
exports.updateDoctor = async (req, res) => {
  try {
    const doctorData = { ...req.body };
    if (req.file) {
      doctorData.image = req.file.path;
    }
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, doctorData, {
      new: true,
    });
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    res.status(200).json({ success: true, doctor });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update doctor" });
  }
};

// Delete doctor
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    if (doctor.image) {
      fs.unlinkSync(doctor.image); // Delete the image file
    }
    res
      .status(200)
      .json({ success: true, message: "Doctor deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete doctor" });
  }
};
