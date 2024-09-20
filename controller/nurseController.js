const Nurse = require("../models/nurseModel");
const fs = require("fs");

// Add a new nurse
const addNurse = async (req, res) => {
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
      status,
    } = req.body;
    const image = req.file ? req.file.path : null; // Get image path from multer

    const nurse = new Nurse({
      firstName,
      lastName,
      phone,
      email,
      specialty,
      experience,
      address,
      availability,
      status,
      image, // Save image path
    });

    await nurse.save();
    res.status(201).json({ message: "Nurse added successfully", nurse });
  } catch (error) {
    console.error("Error adding nurse:", error);
    res.status(500).json({ error: "Failed to add nurse" });
  }
};

// Get all nurses
const getAllNurses = async (req, res) => {
  try {
    const nurses = await Nurse.find();
    res.status(200).json({ success: true, nurses });
  } catch (error) {
    console.error("Error fetching nurses:", error);
    res.status(500).json({ error: "Failed to fetch nurses" });
  }
};

// Update a nurse
const updateNurse = async (req, res) => {
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
      status,
    } = req.body;
    const image = req.file ? req.file.path : null;

    const nurse = await Nurse.findById(req.params.id);

    if (!nurse) {
      return res.status(404).json({ error: "Nurse not found" });
    }

    nurse.firstName = firstName || nurse.firstName;
    nurse.lastName = lastName || nurse.lastName;
    nurse.phone = phone || nurse.phone;
    nurse.email = email || nurse.email;
    nurse.specialty = specialty || nurse.specialty;
    nurse.experience = experience || nurse.experience;
    nurse.address = address || nurse.address;
    nurse.availability = availability || nurse.availability;
    nurse.status = status || nurse.status;

    if (image) {
      if (nurse.image) {
        fs.unlinkSync(nurse.image); // Remove the old image if it exists
      }
      nurse.image = image;
    }

    await nurse.save();
    res.status(200).json({ message: "Nurse updated successfully", nurse });
  } catch (error) {
    console.error("Error updating nurse:", error);
    res.status(500).json({ error: "Failed to update nurse" });
  }
};

// Delete a nurse
const deleteNurse = async (req, res) => {
  try {
    const nurse = await Nurse.findById(req.params.id);

    if (!nurse) {
      return res.status(404).json({ error: "Nurse not found" });
    }

    if (nurse.image) {
      fs.unlinkSync(nurse.image);
    }

    await Nurse.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Nurse deleted successfully" });
  } catch (error) {
    console.error("Error deleting nurse:", error);
    res.status(500).json({ error: "Failed to delete nurse" });
  }
};

module.exports = {
  addNurse,
  getAllNurses,
  updateNurse,
  deleteNurse,
};
