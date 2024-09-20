const Equipment = require("../models/equipmentModel");
const path = require("path");
const fs = require("fs");

const addEquipment = async (req, res) => {
  try {
    const { name, price, contact } = req.body;
    const image = req.file ? req.file.path : ""; // Get image path from multer

    const equipment = new Equipment({ name, price, image, contact });
    await equipment.save();

    res
      .status(201)
      .json({ message: "Equipment added successfully", equipment });
  } catch (error) {
    console.error("Error adding equipment:", error);
    res.status(500).json({ error: "Failed to add equipment" });
  }
};

const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.status(200).json(equipment);
  } catch (error) {
    console.error("Error fetching equipment:", error);
    res.status(500).json({ error: "Failed to fetch equipment" });
  }
};

const updateEquipment = async (req, res) => {
  try {
    const { name, price, contact } = req.body;
    const image = req.file ? req.file.path : null;

    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    equipment.name = name || equipment.name;
    equipment.price = price || equipment.price;
    equipment.contact = contact || equipment.contact;

    if (image) {
      if (equipment.image) {
        fs.unlinkSync(equipment.image); // Remove the old image
      }
      equipment.image = image;
    }

    await equipment.save();

    res
      .status(200)
      .json({ message: "Equipment updated successfully", equipment });
  } catch (error) {
    console.error("Error updating equipment:", error);
    res.status(500).json({ error: "Failed to update equipment" });
  }
};

const deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    if (equipment.image) {
      fs.unlinkSync(equipment.image);
    }

    await Equipment.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Equipment deleted successfully" });
  } catch (error) {
    console.error("Error deleting equipment:", error);
    res.status(500).json({ error: "Failed to delete equipment" });
  }
};

module.exports = {
  addEquipment,
  getAllEquipment,
  updateEquipment,
  deleteEquipment,
};
