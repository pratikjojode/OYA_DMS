const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  contact: { type: String, required: true },
});

const Equipment = mongoose.model("Equipment", equipmentSchema);

module.exports = Equipment;
